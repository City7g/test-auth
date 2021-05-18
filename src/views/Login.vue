<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5">Login</v-app-bar-title>

        <LoginForm @submit="submit" />

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
import LoginForm from "@/components/AuthForm/Login.vue";

export default {
  name: "Register",
  components: {
    LoginForm,
  },
  data() {
    return {
      isError: false,
      textError: null,
    };
  },
  methods: {
    submit(formData) {
      this.$store
        .dispatch("login", formData)
        .then(() => {
          this.$router.push({name: "Admin"});
        })
        .catch((err) => {
          this.isError = true;
          this.textError = err;
        });
    },
  },
};
</script>