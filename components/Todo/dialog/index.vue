<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          어제 했던 습관들, 오늘도 차근차근 다시 시작!
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even
          when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    }
  },
  mounted() {
    const user = this.$store.getters.getCurrentUser;
    const visitLog = JSON.parse(localStorage.getItem('visitLog'));
    const initVisitLog = { userId: user.id, visitCount: 1, today: new Date() };

    if(visitLog && this.isSameDate(visitLog.today)) {
      this.dialog = false;
      initVisitLog.visitCount = visitLog.visitCount + 1;
      localStorage.setItem('visitLog', JSON.stringify(initVisitLog))
    } else {
      console.log('here');
     localStorage.setItem('visitLog', JSON.stringify({visitCount: 0, ...initVisitLog}))
    }
  },
  methods: {
    isSameDate: (a) => {
      const dateA = new Date(a);
      const today = new Date();

      return dateA.getYear() === today.getYear() && dateA.getMonth() === today.getMonth() && dateA.getDate() === today.getDate();
    }
  }
}
</script>