<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" to="/">습관공작소</nuxt-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  aria-current="page"
                  to="/auth/login"
                  >로그인</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  aria-current="page"
                  to="/auth/register"
                  >회원가입</nuxt-link
                >
              </li>
            </template>
            <template v-else>
              <li class="nav-item" @click="logout">
                <nuxt-link class="nav-link" aria-current="page" to="#"
                  >로그아웃</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  aria-current="page"
                  to="/profile"
                >
                  회원정보
                </nuxt-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");

    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style></style>
