export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn && !store.state.isGuest) {
    return redirect("/auth/login");
  }
}
