import firebase from "firebase/app";

export default {
  actions: {
    async createUser(
      { dispatch },
      { name, email, password, date, month, year, country }
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}`)
          .set({ name, email, date, month, year, country });
        return;
      } catch (err) {
        throw err.message;
      }
    },
    async updateUser(
      { commit },
      { id, name, email, date, month, year, country }
    ) {
      console.log(id, name, email, date, month, year, country);
      await firebase
        .database()
        .ref("/users")
        .child(id)
        .update({ name, email, date, month, year, country });
      return;
    },
  },
};
