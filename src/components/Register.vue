<template>
  <div>
    <ul>
      <li> Bucketlist Image </li>
      <li> Bucketlist App </li>
      <a href="/" v-show="signUp" v-on:click.prevent="toggleSignUp">Login</a>
      <a href="/" v-show="!signUp" v-on:click.prevent="toggleSignUp">Register</a>
    </ul>
    <div v-show="signUp">
      <h2> Do you have big Dreams?</h2>
      <h3>
        Imagine if you could be Able to immortalise your dreams, keep track of them
        and share with your friends. The bucketlist App does just that for you!
      </h3>
    </div>
    <form v-on:submit.prevent="loginUser">
      <label>
        Email
        <input
          placeholder="Your email"
          type="email"
          v-model.trim.lazy="email"
        >
      </label>
      <label>
        Password
        <input
          placeholder="Your password"
          type="password"
          v-model.trim.lazy="password"
        >
      </label>
      <label v-show="signUp">
        confirm password
        <input
          placeholder="Confirm password"
          type="password"
          v-model.trim.lazy="confirmPassword"
        >
      </label>
      <span v-show="signUp">
        Already have an account?
        <a v-on:click.prevent="toggleSignUp" href="/">Sign up</a>
      </span>
      <button v-show="signUp" type="submit">Register</button>
      <button v-show="!signUp" type="submit">Login </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: '',
      signUp: true,
    };
  },
  methods: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    loginUser() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api-token-auth/',
        datatype: 'json',
        data: {
          username: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          window.localStorage.setItem('token', response.data.token);
          this.$router.replace({ name: 'Bucketlist' });
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    registerUser() {
      if (this.password === this.confirmPassword) {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/register/',
          datatype: 'json',
          data: {
            username: this.email,
            password: this.password,
          },
        })
          .then(() => {
            this.loginUser();
          });
      } else {
        this.formErrors = "passwords don't match";
      }
    },
  },
};
</script>
