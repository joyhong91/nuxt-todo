<template>
    <div class="count--wrap">
        <span>{{getCountDoneItems}} </span>
        <span>/</span>
        <span>{{ getCountTodoItems }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['getCountDoneItems', 'getCountTodoItems'])
    }
};
</script>
