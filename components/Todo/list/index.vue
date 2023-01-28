<template>
    <v-card class="mx-auto">
        <v-toolbar color="teal">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-btn  class="ma-1" color="white" plain @click="filter({isDone: false})" :class="{active: todoBtnActive}">
                    TODO
                </v-btn>
                <v-btn  class="ma-1" color="darkgrey" plain @click="filter({isDone: true})" :class="{active: doneBtnActive}">
                    DONE
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
                    @click="toggleItem({ isDone: todoItem.isDone, todoId: todoItem._id })">
                    <template>
                        <v-list-item-action class="mr-2">
                            <v-list-item-icon>
                                <v-icon v-if="!todoItem.isDone" aria-hidden="false">mdi-circle</v-icon>
                                <v-icon v-else aria-hidden="false">mdi-checkbox-marked-circle</v-icon>
                            </v-list-item-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{ todoItem.title }} || {{ todoItem.isDone }} || {{
                                getDateFormat(todoItem.startAt)
                            }} {{ todoItem._id }}</v-list-item-title>
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
            todoBtnActive: false,
            doneBtnActive: false
        }
    },
    methods: {
        next(page) {
            this.$store.dispatch('LOAD_TODO_ITEMS_PAGINATION', { page });
        },
        getDateFormat(date) {
            const todoDate = new Date(date);
            const getYYYYMMDD = todoDate.getFullYear() + "-" + todoDate.getMonth() + 1 + "-" + todoDate.getDate();
            return getYYYYMMDD;
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
        filter(flag) {
            if(flag.isDone) {
                this.doneBtnActive = !this.doneBtnActive
                this.todoBtnActive = this.todoBtnActive ? false: this.todoBtnActive
            } else {
                this.todoBtnActive = !this.todoBtnActive
                this.doneBtnActive = this.doneBtnActive ? false: this.doneBtnActive
            }

            if(!this.todoBtnActive && !this.doneBtnActive) {
                this.$store.dispatch('LOAD_TODO_ITEMS');
            }else {
                this.$store.dispatch('FILTER_TODO_ITEMS', { flag })
            }
        }
    },
    async fetch() {
        try {
            await this.$store.dispatch('LOAD_TODO_ITEMS');
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        ...mapGetters(['getTodoItemsByPagination', 'getCountTodoItems']),
        ...mapState(['totalPages'])
    }

};
</script>

<style>

</style>
