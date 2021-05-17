import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyAsVueYRg5Yk-URPgzMe40IP7G-ovejoXw",
  authDomain: "auth-vue-8f904.firebaseapp.com",
  databaseURL:
    "https://auth-vue-8f904-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-vue-8f904",
  storageBucket: "auth-vue-8f904.appspot.com",
  messagingSenderId: "241979749247",
  appId: "1:241979749247:web:b416ec3c790e16f947e04a",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount("#app");
  }
});
