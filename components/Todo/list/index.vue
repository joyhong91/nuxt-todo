<template>
    <v-card class="mx-auto">
        <v-toolbar color="teal">
            <v-toolbar-title>
                <v-btn class="ma-1" color="white" plain @click="filterItems({ status: 'todo' })"
                    :class="{active: todoBtnActive}">
                    TODO
                </v-btn>
                <v-btn class="ma-1" color="darkgrey" plain @click="filterItems({ status: 'done' })"
                    :class="{ active: doneBtnActive }">
                    DONE
                </v-btn>
                <v-btn class="ma-1" color="white" plain @click="filterItems({ status: 'all' })"
                    :class="{ active: allBtnActive }">
                    ALL
                </v-btn>
            </v-toolbar-title>
            <v-btn v-if="getCountTodoItems > 0" class="btn-deleteAll mr-4" @click="deleteTodoAll" outlined absolute>
                DELETE ALL
            </v-btn>

        </v-toolbar>

        <v-list>
            <v-list-item-group>
                <v-list-item v-for="todoItem in getTodoItemsByPagination" v-bind:key="todoItem.id"
                    v-bind:class="{ isDone: todoItem.isDone }"
                    @click="toggleItem({ isDone: todoItem.isDone, todoId: todoItem._id })" :disabled="checkedDisabled(todoItem.startAt, todoItem.isDone)">
                    <template>
                        <v-list-item-action class="mr-2">
                            <v-list-item-icon>
                                <v-icon v-if="!todoItem.isDone" aria-hidden="false">mdi-circle</v-icon>
                                <v-icon v-else aria-hidden="false">mdi-checkbox-marked-circle</v-icon>
                            </v-list-item-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{ todoItem.title}} || {{ todoItem.isDone }} || {{
                                getDateFormat(todoItem.startAt)
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon v-on:click.stop="deleteTodo(todoItem)">
                            <v-btn class="ma-2" dark>
                                <v-icon dark left>
                                    mdi-minus-circle
                                </v-icon>DELETE
                            </v-btn>
                        </v-list-item-icon>
                    </template>
                </v-list-item>
            </v-list-item-group>
            <div class="text-center">
                <client-only>
                    <v-pagination v-model="page" :length="totalPages" @input="next"></v-pagination>
                </client-only>
            </div>
        </v-list>


    </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            page: 1,
            todoBtnActive: true,
            doneBtnActive: false,
            allBtnActive: false
        }
    },
    created() {
        this.$root.$refs.list = this;
    },
    methods: {
        next(page) {
            this.$store.dispatch('LOAD_TODO_ITEMS_PAGINATION', { page });
        },
        toggleItem(todoObj) {
            this.$store.dispatch('UPDATE_ISDONE', todoObj)
        },
        deleteTodo(todo) {
            // TODO: delete 하기 전에 currentDate - startAt dㅣ 66일 이상인지 체크 
            this.$store.dispatch('DELETE_TODO', { todo });
        },
        deleteTodoAll() {
            this.$store.dispatch('DELETE_TODO_ALL');
        },
        filterItems({ status }) {
            let currentFilter = {};
            this.todoBtnActive = false;
            this.doneBtnActive = false;
            this.allBtnActive = false;

            if (status === 'todo') {
                this.todoBtnActive = !this.todoBtnActive
                currentFilter = { isDone: false }
            } else if (status === 'done') {
                this.doneBtnActive = !this.doneBtnActive
                currentFilter = { isDone: true }
            } else {
                this.allBtnActive = !this.allBtnActive;
            }

            this.$store.dispatch('LOAD_TODO_ITEMS', currentFilter);

        },
        checkedDisabled(startAt, isDone) {
            const prevDate = new Date(this.getDateFormat(this.getPrevDate()));
            const today = new Date(this.getDateFormat());
            const startDate = new Date(startAt);

            return prevDate > startDate || ( prevDate <= startDate && startDate < today && !isDone)
        },
        getPrevDate() {
            const today = new Date();
            const twoMonthAgo = new Date(today.setMonth(today.getMonth() - 2));

            return twoMonthAgo.setDate(twoMonthAgo.getDate() - 6);
        },
        getDateFormat(date) {
            const todoDate = date ? new Date(date) : new Date();
            return `${todoDate.getFullYear()}-${todoDate.getMonth()+1}-${todoDate.getDate()}`;
        },
    },
    async fetch() {
        try {
            await this.$store.dispatch('LOAD_TODO_ITEMS', { isDone: false });
            await this.$store.dispatch('LOAD_POINT');
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        ...mapGetters(['getTodoItemsByPagination', 'getCountTodoItems']),
        ...mapState(['totalPages']),
    }

};
</script>

<style>

</style>
