import client from "@/http/api";
import store from ".";

export default {
  actions: {
    fetchUsers() {
      return client
        .get("/user", {
          headers: {
            "auth-token": store.getters.token,
          },
        })
        .then(res => res.data)
        .catch(err => {
          throw err.response.data;
        });
    },
    fetchUser({ commit }, id) {
      return client
        .get(`/user/${id}`, {
          headers: {
            "auth-token": store.getters.token,
          },
        })
        .then(res => res.data[0])
        .catch(err => {
          throw err.response.data;
        });
    },
    createUser({ commit }, { name, email, password }) {
      return client
        .post("/api/user/register", {
          name,
          email,
          password,
        })
        .then(res => {
          const token = res.data.token;
          const user = res.data.savedUser;
          commit("AUTH_SUCCESS", { token, user });

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          return res.data;
        })
        .catch(err => {
          commit("AUTH_ERROR");

          localStorage.removeItem("token");

          throw err.response.data;
        });
    },
    deleteUser({ commit }, id) {
      return client
        .delete(`/user/${id}`, {
          headers: {
            "auth-token": store.getters.token,
          },
        })
        .then(res => res.data)
        .catch(err => {
          throw err.response.data;
        });
    },
    updateUser({ commit }, { id, name, email }) {
      console.log(id, name, email);
      return client
        .put(
          `/user/${id}`,
          { name, email },
          {
            headers: {
              "auth-token": store.getters.token,
            },
          }
        )
        .then(res => res.data)
        .catch(err => {
          throw err.response.data;
        });
    },
  },
};
