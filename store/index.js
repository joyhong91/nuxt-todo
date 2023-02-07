
export const state = () => ({
    currentUser: null,
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
        return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
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
    setTodoItems(state, { todoItems, isDone }) {
        const todoObj = state.todo;

        todoObj.items = todoItems;

        if (isDone !== undefined) {
            todoObj.total = todoItems.length;
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
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
    setEmptyCurrentUser(state) {
        state.currentUser = null;
    },
    setTodoItemsPagination(state, page) {
        const currentPage = page ? page : 1;
        const pageObj = state.page;

        pageObj.startOffset = (currentPage - 1) * pageObj.perPage;
        pageObj.endOffset = pageObj.startOffset + pageObj.perPage;
        pageObj.total = Math.ceil(state.todo.items.length / pageObj.perPage);
    },
    addTodoItem(state, todoData) {
        const todoObj = state.todo;

        todoObj.items.unshift(todoData);
        todoObj.todoCount = todoObj.todoCount + 1;
        todoObj.total = todoObj.total + 1;
    },
    updateTodo(state, todoData) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todoData._id);

        todoItem.title = todoData.title;
        todoItem.startAt = todoData.startAt;
    },
    updateIsDone(state, todoData) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todoData._id);

        todoItem.isDone = !todoItem.isDone;

        if (todoItem.isDone) {
            todoObj.todoCount = todoObj.todoCount - 1;
            todoObj.doneCount = todoObj.doneCount + 1;
        } else {
            todoObj.todoCount = todoObj.todoCount + 1;
            todoObj.doneCount = todoObj.doneCount - 1;
        }
    },
    deleteTodo(state, todoData) {
        const todoObj = state.todo;
        const todoItem = todoObj.items.find(item => item._id === todoData._id);
        const targetIndex = todoObj.items.indexOf(todoItem);

        if(todoItem.isDone) {
            todoObj.doneCount = todoObj.doneCount - 1;
        } else {
            todoObj.todoCount = todoObj.todoCount - 1;
        }
        
        todoObj.items.splice(targetIndex, 1);
        todoObj.total = todoObj.total - 1;
    },
    deleteAll(state) {
        state.todo = {items: [], todoCount: 0, doneCount: 0, total: 0};
    },
    setPoint(state, point) {
        state.point = point;
    }
}


//actions 비동기 로직 
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (this.state.auth.loggedIn) {
            commit('setCurrentUser', req?.session?.currentUser);
        }
    },
    async LOAD_POINT({ commit }) {
        const user = this.getters.getCurrentUser;
        let response = await this.$axios.$get('/getPointByUserId', {
            params: { userId: user._id }
        })

        if (!response.point) {
            response = await this.$axios.$post('/createPoint', { userId: user._id })
        }

        commit('setPoint', response.point);
    },
    async LOAD_TODO_ITEMS({ commit }, { isDone }) {
        const today = new Date(getDateFormat());
        const response = await this.$axios.$get("/getTodosByUserId", {
            params: { userId: this.getters.getCurrentUser._id, isDone, today }
        });

        commit('setTodoItems', response);
        commit('setTodoItemsPagination');
    },

    LOAD_TODO_ITEMS_PAGINATION({ commit }, { page }) {
        commit('setTodoItemsPagination', page);
    },

    async ADD_NEW_ITEM({ commit }, todoItem) {
        const response = await this.$axios.$post("/addTodo", todoItem);

        commit('addTodoItem', response.todoItem);
        commit('setTodoItemsPagination');
    },

    async UPDATE_ISDONE({ commit }, todoItem) {
        const resTodo = await this.$axios.patch('/updateIsDone', todoItem);
        const resPoint = await this.$axios.patch('/updatePoint', {
            ...todoItem,
            pointId: this.getters.getPoint._id
        });

        commit('updateIsDone', resTodo.data.todoItem);
        commit('setPoint', resPoint.data.point);
        commit('setTodoItemsPagination');
    },
    async UPDATE_TODO({ commit }, todoItem) {
        await this.$axios.patch('/updateTodo', todoItem);

        commit('updateTodo', todoItem);
    },
    async DELETE_TODO({ commit }, todoItem) {
        const diffDays = calDiffDays(todoItem.startAt);
        const alertDesc = confirmMessages(diffDays, this.$ALERT_MESSAGES());
        if (!confirm(alertDesc)) {
            return false;
        }
        const resTodo = await this.$axios.$delete("/deleteTodoById", {
            params: { todoId: todoItem._id }
        });

        if (todoItem.isDone) {
            const resPoint = await this.$axios.patch('/updatePoint', {
                ...todoItem,
                pointId: this.getters.getPoint._id
            });

            commit('setPoint', resPoint.data.point);
        }

        commit('deleteTodo', resTodo.todoItem);
        
    },

    async DELETE_TODO_ALL({ commit }) {
        if (!confirm(this.$ALERT_MESSAGES().DELETEALL)) {
            return false;
        }

        const ids = [];
        this.getters.getTodoItems.map(item => {
            ids.push(item._id);
        })

        await this.$axios.$delete("/deleteMany", {params: {ids}});
        await this.$axios.patch('/resetPoint', {pointId: this.getters.getPoint._id});

        commit('deleteAll');
        commit('setTodoItemsPagination');
    },


}

//store.js 내부 함수
const getDateFormat = (date) => {
    const todoDate = date ? new Date(date) : new Date();
    return `${todoDate.getFullYear()}-${todoDate.getMonth() + 1}-${todoDate.getDate()}`;
}

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