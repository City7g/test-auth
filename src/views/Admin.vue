<template>
  <v-container>
    <v-row>
      <v-col md="4" offset-md="4" class="mt-5">
        <v-app-bar-title class="mb-5 ml-2">Admin</v-app-bar-title>

        <v-tabs class="mb-4" v-model="tab">
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item class="grid-sys">
            <v-card v-for="user in users" :key="user.email" class="my-2">
              <v-card-text>
                <div>{{ user.email }}</div>
                <p class="display-1 text--primary">{{ user.name }}</p>
                <p>{{ user.country }}</p>
                <div class="text--primary">
                  {{ user.date }} {{ user.month }} {{ user.year }}
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <Register  @submit="submit" />
          </v-tab-item>

          <v-tab-item class="grid-sys">
            <v-card v-for="user in users" :key="user.email" class="my-2">
              <v-card-text>
                <div>{{ user.email }}</div>
                <p class="display-1 text--primary">{{ user.name }}</p>
                <p>{{ user.country }}</p>
                <div class="text--primary">
                  {{ user.date }} {{ user.month }} {{ user.year }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn @click="updateUser(user.id)" color="primary">Update</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item class="grid-sys">
            <v-card v-for="user in users" :key="user.email" class="my-2">
              <v-card-text>
                <div>{{ user.email }}</div>
                <p class="display-1 text--primary">{{ user.name }}</p>
                <p>{{ user.country }}</p>
                <div class="text--primary">
                  {{ user.date }} {{ user.month }} {{ user.year }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn @click="deleteUser(user.id)" color="error">Remove</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "@/components/AuthForm/Register.vue"
export default {
  components: {
    Register
  },
  data() {
    return {
      users: null,

      tab: null,
      items: ["Read", "Create", "Update", "Delete"],
      text: "asd",
    };
  },

  methods: {
    deleteUser(id) {
      this.users = this.users.filter(c => c.id !== id)
      this.$store.dispatch('deleteUser', id)
    },
    updateUser(id) {
      this.$router.push(`/update-user/${id}`)
    },
    async submit(formData) {
      console.log(formData)
      try {
        await this.$store.dispatch("createUser", formData);
      } catch (err) {
        console.log(err)
      }
    },
  },
  async mounted() {
    const users = await this.$store.dispatch("fetchUsers");
    this.users = users;
  },
};
</script>

<style>
.grid-sys {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>