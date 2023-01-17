<template>
    <div>
        <p>{{ getTodoItems.length }}</p>
        <ul>
            <li class="list-item" v-for="todoItem in getTodoItems" v-bind:key="todoItem.id">
                <div class="description">
                    <p> {{ todoItem.title }}</p>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        try {
            const userId = this.$auth.user.id;
            const response = await this.$axios.$get("/getTodosByUserId",
                { params: { userId } }).then(result => {
                    this.$store.dispatch('LOAD_TODO_ITEMS', {
                        todoItems: result.todoItems
                    })
                });
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        ...mapGetters(['getTodoItems'])
    }

};
</script>

<style>

</style>
