import Vue from "vue";
import Vuex from "vuex";
import auth from "./login";
import user from "./user";
import firebase from "firebase/app";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    auth(state, token) {
      state.user = token;
    },
  },
  actions: {
    async fetchUsers({dispatch}) {
      const users = (await firebase.database().ref(`/users`).get('value')).val()
      return Object.keys(users).map(key => ({...users[key], id: key}))
    },
    async fetchUser({dispatch}, id) {
      const user = (await firebase.database().ref(`/users/${id}`).get('value')).val()
      return user
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    userName() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  },
  modules: {
    auth,
    user
  },
});
