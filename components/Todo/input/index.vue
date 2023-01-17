<template>
  <div>
    <form @submit.prevent="addTodo">
      <div class="mb-3">
        <input type="text" v-model="todoData.title" class="form-control"/>
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
        userId: this.$auth.user.id,
        title: "",
        isDone: false,
        deadline: new Date()
      }
    };
  },
  updated() {
    // alert('updated');
  },
  methods: {

    async addTodo() {
      try {
        const todo = await this.$axios.$post("/addTodo", this.todoData);
        this.$store.dispatch('ADD_NEW_ITEM', {
          todoItem: this.todoData
        })
        //빈 입력값일때 예외처리
        //입력 후에 input form clear
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>

</style>
