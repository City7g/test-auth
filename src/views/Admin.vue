<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5 ml-2">Admin</v-app-bar-title>

        <p v-if="error">{{ error }}</p>

        <v-list>
          <v-list-item v-for="user in users" :key="user._id">
            <v-list-item-content>
              <v-list-item-title v-text="user.name"></v-list-item-title>

              <v-list-item-subtitle v-text="user.email"> </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn color="success" class="ml-2"> Edit </v-btn>

            <v-btn color="primary" class="ml-2" @click="updateUser(user._id)">
              Update
            </v-btn>

            <v-btn color="error" class="ml-2" @click="deleteUser(user._id)">
              Delete
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "@/components/AuthForm/Register.vue";
export default {
  components: {
    Register,
  },
  data() {
    return {
      users: null,
      error: false,
    };
  },
  methods: {
    deleteUser(id) {
      this.$store.dispatch("deleteUser", id).then(() => {
        this.users = this.users.filter((c) => c._id !== id);
      });
    },
    updateUser(id) {
      this.$router.push(`/update-user/${id}`);
    },
  },
  mounted() {
    this.$store
      .dispatch("fetchUsers")
      .then((res) => (this.users = res))
      .catch((err) => {
        this.error = err;
      });
  },
};
</script>