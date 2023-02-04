export default function ({ store, redirect, error }) {
    // auth 확인
    console.log("Here");
    if (!store.getters.getCurrentUser) {
      return redirect('/auth/login');
    }
  }