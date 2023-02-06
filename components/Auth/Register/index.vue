<template>
  <form @submit.prevent="register">
    <v-text-field v-model="name" :error-messages="nameErrors" label="Name" required @input="$v.name.$touch()"
      @blur="$v.name.$touch()"></v-text-field>
    <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
      @blur="$v.email.$touch()"></v-text-field>
    <!-- <v-text-field v-model="password" :error-messages="passwordErrors" label="password" required
      @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field> -->
    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :error-messages="passwordErrors"
      :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="password" counter required
      @click:append="show1 = !show1" @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

    <div class="text-center">
      <v-btn class="mr-4" @click="register" color="primary">
        회원가입
      </v-btn>
      <v-btn @click="clearInputBox">
        모두지우기
      </v-btn>
      <v-btn>
        <nuxt-link to="/auth/login">로그인</nuxt-link>
      </v-btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    password: { required }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      show1: false,
      rules: {
          required: value => !!value || 'Required.',
        },
    };
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push(this.$ERROR().REQUIRED)
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(this.$ERROR().EMAIL)
      !this.$v.email.required && errors.push(this.$ERROR().REQUIRED)
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$ERROR().REQUIRED)
      return errors
    }
  },

  methods: {
    async register() {
      try {
        if (this.checkFormValidate()) {
          const user = await this.$axios.$post("/api/auth/signin", {
            name: this.name,
            email: this.email,
            password: this.password
          });
          this.$router.push("/");
        } else {
          return false
        }

      } catch (err) {
        console.log(err);
        this.errorMsg = this.$ERROR().REGISTER
      }
    },
    checkFormValidate() {
      return this.name !== '' && this.$v.email.email && this.email !== '' && this.password !== ''
    },
    clearInputBox() {
      this.$v.$reset()
      this.name = '';
      this.email = '';
      this.password = '';
    }
  },

};
</script>


<style>

</style>