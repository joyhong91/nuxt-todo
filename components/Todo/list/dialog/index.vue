<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">EDIT</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="updateTodo" @keyup.enter="updateTodo">
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field outlined v-model="todoTitle" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <client-only>
                                        <date-picker v-model="startAt" valueType="format" format="YYYY-MM-DD"
                                            input-class="datepicker text-center"
                                            :placeholder="this.$INPUT().DATE_PLACEHOLDER"></date-picker>
                                    </client-only>
                                </v-col>
                            </v-row>
                            <v-row class="justify-end mt-7">
                                <v-btn color="blue darken-1" text @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="blue darken-1" text type="submit">
                                    Save
                                </v-btn>
                            </v-row>
                        </form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import 'vue2-datepicker/index.css'

export default {
    data() {
        return {
            dialog: false,
            todoTitle: '',
            startAt: '',
            _id: '',
        }
    },
    created() {
        this.$root.$refs.dialog = this;
    },
    methods: {
        updateForm(todo) {
            this.dialog = true;
            this.todoTitle = todo.title;
            this.startAt = todo.startAt;
            this._id = todo._id;
        },
        async updateTodo() {
            this.dialog = false;
            try {
                if (this.todoTitle !== '' && this.todoTitle.trim().length > 0) {
                    const updateItem = {
                        title: this.todoTitle.trim(),
                        startAt: this.startAt,
                        _id: this._id
                    }

                    await this.$store.dispatch('UPDATE_TODO', updateItem);
                } else {
                    this.errorMsg = this.$ERROR().EMPTY;
                }
            } catch (err) {
                this.errorMsg = err;
            }
        },
    },
    components: {
        DatePicker: () => (typeof window !== 'undefined') ? import('vue2-datepicker') : 'undefined'
    },
}
</script>
