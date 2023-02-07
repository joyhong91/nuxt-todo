<template>
    <div>
        <v-toolbar prominent>
            <v-list-item-icon @click.stop="drawer = !drawer">
                <!-- <v-icon aria-hidden="false" dark>mdi-account</v-icon> -->
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-list-item-icon>
            <v-list-item-icon class="app-name--wrap">
                <nuxt-link to="/">66</nuxt-link>
                <div class="text-center message--wrap" v-show="this.isMessageShow">
                    <VueSlickCarousel v-bind="sliderSettings">
                        <div v-for="message, index in welcome_messages" v-bind:key="index">
                            <p>{{ message }}</p>
                        </div>
                    </VueSlickCarousel>
                </div>
            </v-list-item-icon>
        </v-toolbar>


        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon aria-hidden="false">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-if="isLoggined">
                        {{ getCurrentUser?.email }}
                    </v-list-item-title>
                    <v-list-item-title v-else>
                        Guest
                    </v-list-item-title>
                    <v-list-item-title class="text-right">
                    [ {{getPoint?.amount}}p ]
                    </v-list-item-title>
                </v-list-item-content>
                
            </v-list-item>
            <v-divider></v-divider>

            <v-list flat v-if="isLoggined">
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon aria-hidden="false">mdi-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title @click="logout">
                            <nuxt-link class="nav-link" aria-current="page" to="#">로그아웃</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list flat v-else>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon aria-hidden="false">mdi-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="nav-link" aria-current="page" to="/auth/login">로그인</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon aria-hidden="false">mdi-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            <nuxt-link class="nav-link" aria-current="page" to="/auth/register">회원가입</nuxt-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import { mapGetters } from 'vuex';

export default {
    components: {
        VueSlickCarousel
    },
    data() {
        return {
            drawer: null,
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
        async logout() {
            await this.$auth.logout();
            this.$store.commit('setEmptyCurrentUser');

        }
    },
    computed: {
        ...mapGetters(['isLoggined', 'getPoint', 'getCurrentUser'])
    }
};
</script>
