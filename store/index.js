
export const state = () => ({
  isGuest: false,
  currentUser: {},
  todoItems: [],
  itemsPerPage: 5,
  pageStartOffset: 0,
  pageEndOffset: 0,
  totalPages: 0,
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    return state.auth.user;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
  getTodoItems(state) {
    return state.todoItems;
  },
  getTodoItemsByPagination(state) {
    return state.todoItems.slice(state.pageStartOffset, state.pageEndOffset)
  },
  getCountTodoItems(state) {
    return state.todoItems.length;
  },
  getCountDoneItems(state) {
    return state.todoItems.filter(todo => todo.isDone).length;
  }

};

export const mutations = {
  addTodoItems(state, todoItem) {
    state.todoItems.push(todoItem);
  },
  setTodoItems(state, todoItems) {
    state.todoItems = todoItems;
  },
  setTodoItem(state, todoItem) {
    state.todoItems.unshift(todoItem);
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
  setEmptyCurrentUser(state ) {
    state.currentUser = {};
  },
  setTodoItemsPagination(state, page) {
    const currentPage = page ? page : 1;
    state.pageStartOffset = (currentPage - 1) * state.itemsPerPage;
    state.pageEndOffset = state.pageStartOffset + state.itemsPerPage;

    state.totalPages = Math.ceil(state.todoItems.length / state.itemsPerPage);
  },
  updateIsDone(state, todo) {
    const todoItem = state.todoItems.find(item => item._id === todo.todoId);
    todoItem.isDone = !todoItem.isDone;
  },
  deleteTodo(state, todo) {
    const todoItem = state.todoItems.find(item => item._id === todo._id);
    const targetIndex = state.todoItems.indexOf(todoItem);

    state.todoItems.splice(targetIndex, 1);
  },
  deleteAll(state) {
    state.todoItems = [];
  }
}


//actions 비동기 로직 
export const actions = {
  async LOAD_TODO_ITEMS({ commit }, {isDone}) {
    const response = await this.$axios.$get("/getTodosByUserId", {
      params: { userId: this.getters.getCurrentUser.id, isDone }
    });

    commit('setTodoItems', response.todoItems);
    commit('setTodoItemsPagination');
  },
  async LOAD_TODO_VALID_ITEMS({ commit }) {
    const response = await this.$axios.$get("/getTodosByUserId", {
      params: { userId: this.getters.getCurrentUser.id }
    });

    commit('setTodoItems', response.todoItems);
    commit('setTodoItemsPagination');
  },

  async ADD_NEW_ITEM({ commit }, { todoItem }) {
    const response = await this.$axios.$post("/addTodo", todoItem);
    commit('setTodoItem', response.todoItem);
    commit('setTodoItemsPagination');
  },

  LOAD_TODO_ITEMS_PAGINATION({ commit }, { page }) {
    commit('setTodoItemsPagination', page);
  },

  async UPDATE_ISDONE({ commit }, todoObj) {
    const response = await this.$axios.patch('/updateIsDone', todoObj);
    commit('updateIsDone', response.data.result);
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
    commit('deleteTodo', response.deletedTodo);
  },

  DELETE_TODO_ALL({ commit }) {
    if(!confirm(this.$ALERT_MESSAGES().DELETEALL)) {
      return false;
    }

    const todoArr = [];
    this.state.todoItems.map(item => {
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