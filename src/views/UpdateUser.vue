<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5">Update User</v-app-bar-title>

        <UpdateUserForm v-if="user" @submit="submit" :user="user" />

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
import UpdateUserForm from "@/components/AuthForm/UpdateUser.vue";

export default {
  name: "UpdateUser",
  components: {
    UpdateUserForm,
  },
  data() {
    return {
      user: null,

      isError: false,
      textError: null,
    };
  },
  methods: {
    async submit(formData) {

      console.log(formData)

      const data = {
        ...formData,
        id: this.$route.params.id
      }

      this.$store.dispatch("updateUser", data).then(() => {
        this.$router.push("/admin");
      });
    },
  },
  async mounted() {
    this.user = await this.$store.dispatch("fetchUser", this.$route.params.id);
  },
};
</script>