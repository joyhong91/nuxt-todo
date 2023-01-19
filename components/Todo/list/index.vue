<template>
    <v-card class="mx-auto">
        <v-toolbar color="teal">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>JUST DO IT 66DAYS</v-toolbar-title>
        </v-toolbar>

        <v-list>
            <v-list-item-group multiple>
                <v-list-item v-for="todoItem in getTodoItemsByPagination" v-bind:key="todoItem.id">
                    <template v-slot:default="{ active, }">
                        <v-list-item-action>
                            <v-checkbox :input-value="active" color="primary"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>{{ todoItem.title }}</v-list-item-title>
                        </v-list-item-content>
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
