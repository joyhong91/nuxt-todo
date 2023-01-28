<template>
    <v-footer padless>
        <v-card class="d-block w-100" flat tile>
            <v-card-title class="justify-center">
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-title>

        </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-mail',
            'mdi-github',
            'mdi-instagram',
        ],
    }),
}
</script>