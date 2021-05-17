import firebase from "firebase/app";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        throw err.message;
      }
    },
    async resetPassword({ commit }, email) {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
      } catch (err) {
        throw err;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
    },
  }
};
