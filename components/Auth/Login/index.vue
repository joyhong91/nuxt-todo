<template>
  <div>
    <v-alert v-if="this.errorMsg != ''" dense outlined type="error">
      {{ this.errorMsg }}
    </v-alert>
    <form @submit.prevent="login" @keyup.enter="login">
      <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
        @blur="$v.email.$touch()"></v-text-field>
      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :error-messages="passwordErrors"
        :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="password" counter
        required @click:append="show1 = !show1" @input="$v.password.$touch()"
        @blur="$v.password.$touch()"></v-text-field>

      <div class="text-center">
        <v-btn class="mr-4" @click="login" color="primary">
          로그인
        </v-btn>
        <v-btn @click="clearInputBox">
          모두지우기
        </v-btn>
        <v-btn>
          <nuxt-link to="/auth/register">회원가입</nuxt-link>
        </v-btn>
        <v-btn @click="setGuest()">
          비회원모드
        </v-btn>
      </div>
    </form>
  </div>

</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required }
  },
  data() {
    return {
      email: 'test@test.com',
      password: 'test123',
      errorMsg: '',
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },

  computed: {
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
    async login() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: { email: this.email, password: this.password }
        });
        this.$router.push("/");

        const user = response.data.user;
        
        this.$store.commit('setCurrentUser', user);
        this.$store.commit('setVisitLog', user);

      } catch (err) {
        this.errorMsg = this.$ERROR().LOGIN;
        console.log(err);
      }

    },
    checkFormValidate() {
      return this.$v.email.email && this.email !== '' && this.password !== ''
    },
    clearInputBox() {
      this.$v.$reset()
      this.email = '';
      this.password = '';
      this.errorMsg = '';
    },
    setGuest() {
      this.$store.commit('setGuest');
      this.$router.push('/');
    }
  },

};
</script>


