export default function ({ store, redirect, error }) {
    // auth 확인
    if (!store.getters.getCurrentUser) {
      return redirect('/auth/login');
    }
  }