export const state = () => ({
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
    console.log(state.todoItems.filter(todo => todo.isDone));
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
  setTodoItemsPagination(state, page) {
    const currentPage = page ? page : 1;
    state.pageStartOffset = (currentPage - 1) * state.itemsPerPage;
    state.pageEndOffset = state.pageStartOffset + state.itemsPerPage;

    state.totalPages = Math.ceil(state.todoItems.length / state.itemsPerPage);
  },
  updateIsDone(state, result) {
    const todoItem = state.todoItems.find(todo => todo._id === result.todoId);
    todoItem.isDone = !todoItem.isDone; 
  }
}


//actions 비동기 로직 
export const actions = {
  // state.auth.user.id
  async LOAD_TODO_ITEMS({ commit }) {
    const user = Object.keys(this.state.currentUser).length === 0 ? this.$auth.user : this.state.currentUser;
    await this.$axios.$get("/getTodosByUserId", {
      params: { userId: user.id } }).then(result => {
        commit('setTodoItems', result.todoItems);
      });
    commit('setTodoItemsPagination');
  },
  async ADD_NEW_ITEM({ commit }, { todoItem }) {
    await this.$axios.$post("/addTodo", todoItem);
    commit('setTodoItem', todoItem);
  },

  LOAD_TODO_ITEMS_PAGINATION({ commit }, { page }) {
    commit('setTodoItemsPagination', page);
  },

  async UPDATE_ISDONE({ commit }, todoObj) {
    const response = await this.$axios.patch('/updateIsDone', todoObj);
    commit('updateIsDone', response.data.result);
  }


}

