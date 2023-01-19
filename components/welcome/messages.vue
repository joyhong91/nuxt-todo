<template>
    <div class="text-center message--wrap pa-4" v-show="this.isMessageShow">
        <v-list-item-icon @click="closeMessage" class="d-block text-right mt-0 mr-0">
            <v-icon aria-hidden="false">mdi-close</v-icon>
        </v-list-item-icon>
        <VueSlickCarousel v-bind="sliderSettings">
            <div v-for="message, index in welcome_messages" v-bind:key="index">
                <p>{{ message }}</p>
            </div>
        </VueSlickCarousel>
    </div>

</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
    components: {
        VueSlickCarousel
    },
    data() {
        return {
            welcome_messages: this.$WELCOME_MESSAGES(),
            sliderSettings: {
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                centerMode: true,
                centerPadding: '1px'
            },
            isMessageShow: true
        }
    },
    methods: {
        closeMessage() {
            this.isMessageShow = false
        }
    }
}
</script>
