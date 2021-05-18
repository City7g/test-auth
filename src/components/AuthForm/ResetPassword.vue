<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    />

    <v-text-field
      v-model="password"
      :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="isShowPassword ? 'text' : 'password'"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="isShowPassword = !isShowPassword"
    />

    <v-btn class="mr-4 mt-5" @click="reset"> Send </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, maxLength } from "vuelidate/lib/validators";

export default {
  name: "ResetPassword",
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(10) },
  },

  data: () => ({
    email: "",
    password: "",
    isShowPassword: false,
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 10 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },

  methods: {
    reset() {
      this.$v.$touch();

      if (this.email === "" || this.password === "") return;

      const formData = {
        email: this.email,
        password: this.password,
      };

      this.$emit("reset", formData);
    },
  },
};
</script>

<style>
</style>