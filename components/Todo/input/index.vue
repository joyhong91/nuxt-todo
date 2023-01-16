<template>
  <div>
    <form @submit.prevent="addTodo">
      <div class="mb-3">
        <input type="text" v-model="todoData.title" class="form-control" />
      </div>
      <client-only>
        <date-picker v-model="todoData.deadline" valueType="format" format="YYYY-MM-DD"
          input-class="form-control sm white datepicker" placeholder="종료일"></date-picker>
      </client-only>
      <button type="submit" class="btn btn-primary w-100">입력</button>
    </form>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css'

export default {
  components: { DatePicker: () => (typeof window !== 'undefined') ? import('vue2-datepicker') : 'undefined' },
  data() {
    return {
      todoData: {
        userId: "",
        title: "",
        deadline: new Date()
      }
    };
  },
  methods: {

    async addTodo() {
      try {
        const todo = await this.$axios.$post("/addTodo", {
          userId: this.getUserInfo.id,
          title: this.todoData.title,
          isDone: false,
          deadline: this.todoData.deadline
        }).then(result => {
          console.log(result);
          this.$store.dispatch('ADD_NEW_ITEM', {
            todoItem: result
          })
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>

</style>
