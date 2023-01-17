<template>
    <div>
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
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

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
                autoplaySpeed: 3000,
                centerMode: true,
                centerPadding: '1px'
            }
        }
    }
}
</script>
