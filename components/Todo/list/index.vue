<template>
    <div>
        <font-awesome-layers class="fa"> <!-- suffix: true 덕분에 -icon 생략가능(기존: font-awesome-icon-layers) -->
            <font-awesome-icon icon="check" /> <!-- font-awesome => 위에서 설정한 component 이름 -->
        </font-awesome-layers>
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
