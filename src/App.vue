<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/" class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </router-link>

      <v-spacer></v-spacer>

      <v-btn to="/register" text>
        <span>Register</span>
      </v-btn>

      <v-btn to="/login" text class="ml-2">
        <span>Login</span>
      </v-btn>

      <v-btn @click="logout" text class="ml-2">
        <span>Exit</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  }
};
</script>
