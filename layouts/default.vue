<template>
  <v-app>
    <layouts-header/>

    <v-main>
      <v-container class="pa-5">
        <nuxt />
      </v-container>
    </v-main>

    <layouts-footer/>
  </v-app>
</template>

<script>
export default {
  created() {
    if(this.$auth.user) {
      this.$store.commit('setCurrentUser', this.$auth.user);
    }else { 
      this.$store.commit('setGuest');
    }
  }
}
</script>


