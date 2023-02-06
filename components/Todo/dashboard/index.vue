<template>
    <v-card elevation="2" outlined tile>
        <div class="count--wrap text-center pa-3">
            <p class="text--secondary mb-10">습관이 몸에 베이기 까지 66일!</p>
            <v-row class="text--secondary">
                <v-col>TODO</v-col>
                <v-col>DONE</v-col>
                <v-col>%</v-col>
            </v-row>
            <v-row class="text-center">
                <v-col>{{ getTodoCount }}</v-col>
                <v-col>{{ getDoneCount }}</v-col>
                <v-col>{{ getPercent }} <span class="text--secondary">%</span></v-col>
            </v-row>
        </div>
    </v-card>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['getTodoCount', 'getDoneCount', 'getTotalCount']),
        getPercent() {
            const percent = Math.floor(this.getDoneCount / this.getTotalCount * 100);
            return isNaN(percent) ? 0 : percent;
        },
    }
};
</script>
