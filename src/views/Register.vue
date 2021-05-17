<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5">Register</v-app-bar-title>

        <RegisterForm @submit="submit" />

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
import RegisterForm from "@/components/AuthForm/Register.vue";

export default {
  name: "Register",
  components: {
    RegisterForm,
  },
  data() {
    return {
      isError: false,
      textError: null,
    };
  },
  methods: {
    async submit(formData) {
      console.log(formData)
      try {
        await this.$store.dispatch("createUser", formData);
        this.$router.push('/admin')
      } catch (err) {
        console.log(err)
      }
    },
  },
};
</script>