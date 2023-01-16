<template>
    <div>
        <ul>
            <li class="list-item" v-for="todoItem in $store.state.todoItems" v-bind:key="todoItem.id">
                <div class="description">
                    <p> {{ todoItem.title }}</p>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    async fetch() {
        try {
            const userId = this.$auth.user.id;
            console.log(userId);
            const response = await this.$axios.$get("/getTodosByUserId",
                { params: { userId } }).then(result => {
                    this.$store.dispatch('LOAD_TODO_ITEMS', {
                        todoItems: result.todoItems
                    })
                });

            this.$router.push("/");
        } catch (err) {
            console.log(err);
        }

        // await this.$store.dispatch('FETCH_TODO_ITEMS');
        //   try {
        //     const response = await this.$axios.$get("/getTodosByUserId", {
        //       fullname: this.registerData.fullname,
        //       email: this.registerData.email,
        //       password: this.registerData.password
        //     });
        //     // this.$router.push("/");
        //   } catch (err) {
        //     console.log(err);
        //     this.errorMsg = "로딩 에러 ."
        //   }
    },
    methods: {

    }
};
</script>

<style>

</style>
