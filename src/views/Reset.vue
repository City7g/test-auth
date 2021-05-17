<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5">Forgot password</v-app-bar-title>

        <ResetPassword @reset="reset" />

        <v-snackbar v-model="isError" right top timeout="3000">
          {{ textError }}
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ResetPassword from "@/components/AuthForm/ResetPassword.vue";

export default {
  name: "Register",
  components: {
    ResetPassword,
  },
  data() {
    return {
      isError: false,
      textError: null,
    };
  },
  methods: {
    reset(email) {
      this.$store
        .dispatch("resetPassword", email)
        .then(() => {
          // this.$router.push("/");
          console.log('OK')
        })
        .catch((err) => {
          // this.isError = true;
          // this.textError = err;
          console.log(err)
        });
    },
  },
};
</script>