<template>
  <div>
    <p>{{ registerData.errorAlert }}</p>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="fullname" class="form-label">Full Name</label>
        <input
          type="text"
          v-model="registerData.fullname"
          class="form-control"
          id="fullname"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="registerData.email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          v-model="registerData.password"
          class="form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
    <nuxt-link to="/auth/login">이미 계정이 있으신가요?</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        fullname: "",
        email: "",
        password: "",
        errorAlert: null
      }
    };
  },
  methods: {
    async register() {
      try {
        const user = await this.$axios.$post("/api/auth/signin", {
          fullname: this.registerData.fullname,
          email: this.registerData.email,
          password: this.registerData.password
        });
        this.$router.push("/todo");
      } catch (err) {
        console.log(err);
        this.registerData.errorAlert = "사용할 수 없는 이메일 입니다. 다시 입력해 주세요."
      }
    }
  }
};
</script>

<style></style>
