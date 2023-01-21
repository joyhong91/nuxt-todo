<template>
    <v-card class="mx-auto">
        <v-toolbar color="teal">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>JUST DO IT 66DAYS</v-toolbar-title>
        </v-toolbar>

        <v-list>
            <v-list-item-group>
                <v-list-item v-for="todoItem in getTodoItemsByPagination" v-bind:key="todoItem.id"
                    v-bind:class="{ isDone: todoItem.isDone }"
                    @click="toggleItem({ isDone: todoItem.isDone, todoId: todoItem._id })">
                    <template>
                        <v-list-item-action>
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

                        <v-list-item-icon v-on:click.stop="deleteTodo(todoItem._id)">
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
            page: 1
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
            console.log(todoObj);
            this.$store.dispatch('UPDATE_ISDONE', todoObj)
        },
        deleteTodo(todoId) {
            console.log("delete Todo  vue ");
            console.log(todoId);
            this.$store.dispatch('DELETE_TODO', { todoId });
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
        ...mapGetters(['getTodoItemsByPagination']),
        ...mapState(['totalPages'])
    }

};
</script>

<style>

</style>
