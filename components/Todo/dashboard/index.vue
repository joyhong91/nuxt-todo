<template>
    
    <div class="count--wrap text-center">
        <p>습관이 몸에 베이기 까지 66일!</p>
        <span>{{getDoneCount}} </span>
        <span>/</span>
        <span>{{ getTodoCount }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['getTodoCount', 'getDoneCount'])
    }
};
</script>
