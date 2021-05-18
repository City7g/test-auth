import client from "@/http/api";

export default {
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
  },
  mutations: {
    AUTH_SUCCESS(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    AUTH_ERROR(state) {
      state.token = "";
      state.user = {};
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return client
        .post("/api/user/login", {
          email,
          password,
        })
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          commit("AUTH_SUCCESS", { token, user });

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          return res.data;
        })
        .catch(err => {
          commit("AUTH_ERROR");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          throw err.response.data;
        });
    },
    resetPassword({ commit }, { email, password }) {
      console.log(email, password)
      return client
        .post("/api/user/reset", {
          email,
          password,
        })
        .then(res => {
          const token = res.data.token;
          const user = res.data.user;
          commit("AUTH_SUCCESS", { token, user });

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          return res.data;
        })
        .catch(err => {
          commit("AUTH_ERROR");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          throw err.response.data;
        });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("AUTH_ERROR");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        resolve();
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isLoggedIn: state => !!state.token,
  },
};
