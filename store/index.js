export const state = () => ({
  currentUser: {},
  todoItems: [],
  isDone: true,
  itemsPerPage: 5,
  pageStartOffset: 0,
  pageEndOffset: 0,
  totalPages: 0,
})

export const setters = {

}
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
  getIsDone(state) {
    return state.isDone;
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
  }
}


//actions 비동기 로직 
export const actions = {
  // state.auth.user.id
  async LOAD_TODO_ITEMS({ commit }) {
    const user = Object.keys(this.state.currentUser).length === 0 ? this.$auth.user : this.state.currentUser;
    await this.$axios.$get("/getTodosByUserId",
      { params: { userId: user.id } }).then(result => {
        commit('setTodoItems', result.todoItems)
      });
    commit('setTodoItemsPagination');  
  },
  async ADD_NEW_ITEM({ commit }, { todoItem }) {
    await this.$axios.$post("/addTodo", todoItem);
    commit('setTodoItem', todoItem);
  },

  LOAD_TODO_ITEMS_PAGINATION({ commit }, { page }) {
    commit('setTodoItemsPagination', page);
  }


}

