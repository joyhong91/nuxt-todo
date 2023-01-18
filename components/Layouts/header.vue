<template>
    <div>
        <v-toolbar prominent src="https://images.unsplash.com/photo-1589830258006-f91b5cb1eab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2828&q=80">
            <v-list-item-icon @click.stop="drawer = !drawer">
                <v-icon aria-hidden="false" dark>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-icon class="app-name--wrap">
                <nuxt-link to="/">66</nuxt-link>
                <p class="font-weight-medium">21일이면 습관을 바꿀 수 있고, 66일이면 몸에 베인다!</p>
            </v-list-item-icon>
        </v-toolbar>
    
    
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon aria-hidden="false">mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-if="isAuthenticated">
                        {{ this.$auth.user.id }}
                    </v-list-item-title>
                    <v-list-item-title v-else>
                        대기업 사장님
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list flat v-if="isAuthenticated">
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
export default {
    data() {
        return {
            drawer: null,
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.push("/");

        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
};
</script>