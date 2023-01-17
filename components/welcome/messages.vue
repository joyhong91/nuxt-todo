<template>
    <div>
        <div v-show="this.isShow">
            <font-awesome-layers class="fa" v-on:click="closeMessage()">
                <!-- suffix: true 덕분에 -icon 생략가능(기존: font-awesome-icon-layers) -->
                <font-awesome-icon icon="circle-xmark" /> <!-- font-awesome => 위에서 설정한 component 이름 -->
            </font-awesome-layers>
            <VueSlickCarousel v-bind="sliderSettings">
                <div v-for="message, index in welcome_messages" v-bind:key="index">
                    <p>{{ message }}</p>
                </div>
            </VueSlickCarousel>
        </div>

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
            },
            isShow: true
        }
    },
    methods: {
        closeMessage() {
            this.isShow = false
        }
    }
}
</script>
