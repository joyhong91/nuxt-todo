<template>
    <v-footer padless class="mt-10">
        <v-card class="d-block w-100" flat tile>
            <v-card-title class="justify-center">

                <v-btn v-for="data in footerData" :key="data.icon" class="mx-4" dark icon>
                    <a target='_blank' :href="data.link">
                        <v-icon size="24px">
                            {{ data.icon }}
                        </v-icon>
                    </a>
                </v-btn>
                </a>
            </v-card-title>

        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        footerData: [
            { icon: 'mdi-mail', link: 'mailto:remonkp@gmail.com' },
            { icon: 'mdi-github', link: 'https://github.com/joyhong91/nuxt-todo' },
            { icon: 'mdi-instagram', link: 'https://www.instagram.com/joy._.hong' }
        ],
    }),
}
</script>