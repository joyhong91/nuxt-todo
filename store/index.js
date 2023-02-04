
export const state = () => ({
    isGuest: false,
    currentUser: null,
    authUser: null,
    todo: {
        items: [],
        todoCount: 0,
        doneCount: 0,
        total: 0,
    },
    page: {
        startOffset: 0,
        endOffset: 0,
        perPage: 5,
        total: 0
    },
    point: {}
})

export const getters = {
    isLoggined(state) {
        return state.currentUser; // auth object as default will be added in vuex state, when you initialize nuxt auth
    },
    getUserInfo(state) {
        return state.auth.user;
    },
    getCurrentUser(state) {
        return state.currentUser;
    },
    getTodoItems(state) {
        return state.todo.items;
    },
    getTotalCount(state) {
        return state.todo.total;
    },
    getTodoCount(state) {
        return state.todo.todoCount;
    },
    getDoneCount(state) {
        return state.todo.doneCount;
    },
    getPoint(state) {
        return state.point;
    },
    getTodoItemsByPagination(state) {
        return state.todo.items.slice(state.page.startOffset, state.page.endOffset)
    },
    getTotalPage(state) {
        return state.page.total;
    }

};

export const mutations = {
    setTodoItems(state, { todoItems, todoLength, isDone }) {
        const todoObj = state.todo;
        
        todoObj.items = todoItems;

        if (isDone !== undefined) {
            todoObj.total = todoLength;
            todoObj.todoCount = todoObj.items.filter(item => !item.isDone).length;
            todoObj.doneCount = todoObj.items.filter(item => item.isDone).length;
        }

        this.commit('setTodoItemsInTab', { todoItems, isDone });
    },
    setTodoItemsInTab(state, { todoItems, isDone }) {
        if (isDone === undefined) {
            return false;
        }

        state.todo.items = todoItems.filter(item => item.isDone === (isDone === 'true'));
    },
    setUser(state, user) {
        state.authUser = user;
    },
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
    setGuest(state) {
        state.currentUser = {
            email: 'guest@guest.com',
            password: 'password',
            id: 'guestguest12'
        }
        state.isGuest = true;
    },
    setEmptyCurrentUser(state) {
        state.currentUser = {};
    },
    setTodoItemsPagination(state, page) {
        const currentPage = page ? page : 1;
        const pageObj = state.page;

        pageObj.startOffset = (currentPage - 1) * pageObj.perPage;
        pageObj.endOffset = pageObj.startOffset + pageObj.perPage;
        pageObj.total = Math.ceil(state.todo.items.length / pageObj.perPage);
    },
    addTodoItem(state, todoItem) {
        const todoObj = state.todo;

        todoObj.items.unshift(todoItem);
        todoObj.todoCount = todoObj.todoCount + 1;
    },
    updateTodo(state, todo) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todo.todoId);

        todoItem.title = todo.title;
    },
    updateIsDone(state, todo) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todo._id);

        todoItem.isDone = !todoItem.isDone;

        if (todoItem.isDone) {
            todoObj.todoCount = todoObj.todoCount - 1;
            todoObj.doneCount = todoObj.doneCount + 1;
        } else {
            todoObj.todoCount = todoObj.todoCount + 1;
            todoObj.doneCount = todoObj.doneCount - 1;
        }
    },
    deleteTodo(state, { todoId, isUpdateCount = true }) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todoId);
        const targetIndex = todoObj.items.indexOf(todoItem);

        if (isUpdateCount) {
            todoObj.todoCount = todoItem.isDone ? todoObj.doneCount - 1 : todoObj.todoCount - 1;
        }

        todoObj.items.splice(targetIndex, 1);
    },
    deleteAll(state) {
        state.todo.items = [];
    },
    setPoint(state, point) {
        state.point = point;
    }
}


//actions 비동기 로직 
export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        if(req.session?.currentUser) {
            await commit('setCurrentUser', req.session.currentUser);
        }
    },
    async CREATE_POINT({ commit }, user) {
        const response = await this.$axios.$post("/createPoint", { userId: user.id });

        commit('setPoint', response.point);
    },
    async LOAD_POINT({ commit }) {
        const user = this.getters.getCurrentUser;
        const response = await this.$axios.$get('/getPointByUserId', {
            params: { userId: user.id }
        })

        commit('setPoint', response.point[0]);
    },
    async LOAD_TODO_ITEMS({ commit }, { isDone }) {
        const response = await this.$axios.$get("/getTodosByUserId", {
            params: { userId: this.getters.getCurrentUser.id, isDone }
        });

        commit('setTodoItems', response);
        commit('setTodoItemsPagination');
    },

    LOAD_TODO_ITEMS_PAGINATION({ commit }, { page }) {
        commit('setTodoItemsPagination', page);
    },

    async ADD_NEW_ITEM({ commit }, { todoItem }) {
        const response = await this.$axios.$post("/addTodo", todoItem);

        commit('addTodoItem', response.todoItem);
        commit('setTodoItemsPagination');
    },

    async UPDATE_ISDONE({ commit }, todoObj) {
        const resTodo = await this.$axios.patch('/updateIsDone', todoObj);
        const resPoint = await this.$axios.patch('/updatePoint', {
            ...todoObj,
            pointId: this.getters.getPoint._id
        });

        commit('updateIsDone', resTodo.data.todo);
        commit('deleteTodo', { todoId: resTodo.data.todo._id, isUpdateCount: false });
        commit('setPoint', resPoint.data.point);
        commit('setTodoItemsPagination');
    },
    async UPDATE_TODO({commit}, {todoItem}) {
        await this.$axios.patch('/updateTodo', todoItem);
        
        commit('updateTodo', todoItem);
    },
    async DELETE_TODO({ commit }, { todo }) {
        const diffDays = calDiffDays(todo.startAt);
        const alertDesc = confirmMessages(diffDays, this.$ALERT_MESSAGES());

        if (!confirm(alertDesc)) {
            return false;
        }

        const response = await this.$axios.$delete("/deleteTodoById", {
            params: { _id: todo._id }
        });
        commit('deleteTodo', { todoId: response.deletedTodo._id });
    },

    DELETE_TODO_ALL({ commit }) {
        if (!confirm(this.$ALERT_MESSAGES().DELETEALL)) {
            return false;
        }

        const todoArr = [];
        this.getters.getTodoItems.map(item => {
            todoArr.push(item._id);
        })

        this.$axios.$delete("/deleteMany", {
            params: { ids: todoArr }
        });

        commit('deleteAll');
        commit('setTodoItemsPagination');
    },


}

//store.js 내부 함수

const calDiffDays = (startAt) => {
    const currentDate = new Date();
    const todoStartAt = new Date(startAt);
    const diffDate = currentDate - todoStartAt;
    const diffDays = diffDate / (1000 * 3600 * 24);

    return Math.floor(diffDays);
}

const confirmMessages = (diffDays, messages) => {
    if (diffDays < 21) {
        return messages.UNDER21;
    } else if (diffDays >= 21 && diffDays < 66) {
        return messages.OVER21;
    } else {
        return messages.DELETE;
    }
}