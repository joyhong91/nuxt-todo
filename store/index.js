import { fetchTodosByUserId } from "@/front_api";

export const state = () => ({
  currentUser: {},
  todoItems: []
})


export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    return state.auth.user;
  },
  
};

export const mutations = {
  addTodoItems(state,todoItem) {
    state.todoItems.push(todoItem);
  },
  setTodoItems(state, todoItems) {
    state.todoItems = todoItems;
  },
  setTodoItem(state, todoItem) {
    state.todoItems.push(todoItem);
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  }
}


export const actions = {
  // state.auth.user.id
  LOAD_TODO_ITEMS({ commit }, { todoItems }) {
    console.log("fetch todoITems");
    console.log(todoItems);
    commit('setTodoItems', todoItems);
  },
  ADD_NEW_ITEM({ commit }, { todoItem }) {
    console.log('add new items');
    commit('setTodoItem', todoItem);
  }
  
  
}

