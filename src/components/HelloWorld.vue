<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Navigation</h2>

        <v-row justify="center">
          <router-link
            v-for="(item, i) in navigationList"
            :key="i"
            :to="item.path"
            class="subheading mx-3"
          >
            {{ item.name }}
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    navigationList: [],
  }),

  mounted() {
    this.navigationList = this.$router.options.routes
  }
};
</script>
