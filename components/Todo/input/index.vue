<template>
  <div>
    <p class="error-msg"> {{ this.errorMsg }}</p>
    <form @submit.prevent="addTodo">
      <div class="mb-3">
        <input type="text" v-model="todoTitle" class="form-control" />
      </div>
      <client-only>
        <date-picker v-model="finishedAt" valueType="format" format="YYYY-MM-DD"
          input-class="form-control sm white datepicker" placeholder="종료일"></date-picker>
      </client-only>
      <button type="submit" class="btn btn-primary w-100">입력</button>
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
      finishedAt: new Date(),
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
            deadline: this.finishedAt
          }

          const todo = await this.$axios.$post("/addTodo", newTodoItem);
          this.$store.dispatch('ADD_NEW_ITEM', {
            todoItem: newTodoItem
          })
          this.clearInputBox();
        }else {
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
