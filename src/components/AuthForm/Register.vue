<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    />

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
      :counter="10"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="isShowPassword = !isShowPassword"
    />

    <v-row>
      <v-col class="d-flex" cols="12" sm="4">
        <v-select :items="dates" label="Date" v-model="date"></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="4">
        <v-select :items="months" label="Month" v-model="month"></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="4">
        <v-select :items="years" label="Standard" v-model="year"></v-select>
      </v-col>
    </v-row>

    <v-autocomplete
      :items="countries"
      auto-select-first
      v-model="country"
    ></v-autocomplete>

    <v-btn class="mr-4 mt-5" @click="submit"> submit </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  name: "MainForm",
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, maxLength: maxLength(10), minLength: minLength(3) },
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    date: null,
    month: null,
    year: null,
    country: null,
    isShowPassword: false,
    dates: [],
    countries: ["Ukraine", "Russia", "USA"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    years: [],
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
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
      !this.$v.password.minLength &&
        errors.push("Name must be at most 3 characters long");
      !this.$v.password.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();

      if (this.email === "" || this.password === "" || this.name === "") return;

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        date: this.date,
        month: this.month,
        year: this.year,
        country: this.country
      };

      this.$emit("submit", formData);
    },
  },

  mounted() {
    for (let i = 0; i < 31; i++) {
      this.dates.push(i + 1);
    }

    for (let i = new Date().getFullYear(); i >= 1920; i--) {
      this.years.push(i);
    }
  },
};
</script>

<style>
</style>