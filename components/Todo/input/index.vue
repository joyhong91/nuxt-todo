<template>
  <div class="pa-5">
    <p class="error-msg"> {{ this.errorMsg }}</p>
    <form @submit.prevent="addTodo">
      <v-row>
        <v-col cols="12" sm="8" md="8" class="pt-0 pb-0 mb-3">
          <v-text-field label="습관으로 만들 행동 무엇인가요?" outlined v-model="todoTitle" hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="d-flex justify-center align-center pt-0 pb-0 mb-3">
          <client-only>
          <date-picker v-model="startAt" valueType="format" format="YYYY-MM-DD" input-class="datepicker text-center"
            placeholder="시작일"></date-picker>
          </client-only>
          <v-btn class="mr-4" @click="addTodo">
            입력
          </v-btn>
        </v-col>
      </v-row>
    </form>

  </div>
</template>

<script>
import 'vue2-datepicker/index.css'

export default {
  components: {
    DatePicker: () => (typeof window !== 'undefined') ? import('vue2-datepicker') : 'undefined'
  },
  data() {
    return {
      todoTitle: '',
      startAt: new Date(),
      errorMsg: ''
    };
  },
  methods: {
    async addTodo() {
      try {
        if (this.todoTitle !== '' && this.todoTitle.trim().length > 0) {
          const newTodoItem = {
            userId: this.$auth.user.id,
            isDone: false,
            title: this.todoTitle.trim(),
            startAt: this.startAt
          }

          await this.$store.dispatch('ADD_NEW_ITEM', { todoItem: newTodoItem });
          this.clearInputBox();
        } else {
          this.errorMsg = this.$ERROR().EMPTY;
        }
      } catch (err) {
        this.errorMsg = err;
      }
    },
    clearInputBox() {
      this.todoTitle = "";
    }
  }
};
</script>

<style>

</style>
