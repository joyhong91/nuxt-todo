export const state = () => ({
  fullName: 'fullname test',
  email: 'email test',
  password: '1234',
})

export const mutations = {
  setCurrentUser(state, user) {
    console.log(user);
    state.email = user.email;
    state.password = user.password;
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    return state.auth.user;
  }
};

