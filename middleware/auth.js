export default function ({ store, redirect, error }) {
    // auth 확인
    if (!store.state.auth.loggedIn) {
      return redirect('/auth/login');
    }
  }