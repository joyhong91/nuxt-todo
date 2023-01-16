<template>
  <div>
    <p> {{ this.loginData.errorAlert }}</p>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="loginData.email" aria-describedby="emailHelp" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="loginData.password" class="form-control" id="password" />
      </div>
      <button type="submit" class="btn btn-primary w-100">login</button>
    </form>
    <nuxt-link to="/auth/register">회원가입</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: "test123@test.com",
        password: "test123",
        errorAlert: null
      }
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData
        }).then(data => {
          //callback func
          this.$store.commit('setCurrentUser', this.$auth.user);
        });
        this.$router.push("/");

      } catch (err) {
        this.loginData.errorAlert = "아이디 혹은 비밀번호가 잘못 되었습니다.";
        console.log(err);
      }
    }
  }
};
</script>

<style>

</style>
