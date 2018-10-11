<template>
  <div id='register'>
    <ul>
      <img src="../assets/bucketlist.jpg" alt="logo" Bucketlist Image>
      <li> Bucketlist App </li>
      <a href="/register" v-show="signUp" v-on:click.prevent="toggleSignUp">Login</a>
      <a href="/register" v-show="!signUp" v-on:click.prevent="toggleSignUp">Register</a>
    </ul>
    <div v-show="signUp">
      <h2> Do you have big Dreams?</h2>
      <h3>
        Imagine if you could be Able to immortalise your dreams, keep track of them
        and share with your friends. The bucketlist App does just that for you!
      </h3>
    </div>
    <form v-on:submit.prevent>
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
          id="password"
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
        <a v-on:click.prevent="toggleSignUp" href="/register">Sign in</a>
      </span>
      <button v-show="signUp" type="submit" v-on:click="registerUser">Register</button>
      <button v-show="!signUp" type="submit" v-on:click="loginUser">Login </button>
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
      errors: [],
    };
  },
  methods: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    async loginUser() {
      let response;
      try {
        const data = { username: this.email, password: this.password };
        response = await axios.post('http://127.0.0.1:8000/api-token-auth/', data);
        window.localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'Bucketlist' });
      } catch (error) {
        this.errors.push(error);
      }
      return response;
    },
    async registerUser() {
      if (this.password === this.confirmPassword) {
        const data = { email: this.email, password: this.password };
        await axios.post('http://127.0.0.1:8000/register/', data);
        this.loginUser();
      } else {
        this.formErrors = "passwords don't match";
      }
    },
  },
};
</script>

<style scoped lang='scss' src='../scss/Register.scss'></style>
