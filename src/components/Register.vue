<template>
  <div id='register'>
    <div id='register-foreground'>
      <ul class='navbar'>
        <li><img src="../assets/bucketlist.jpg" alt="logo" Bucketlist Image></li>
        <li><h1> Bucketlist App </h1></li>
        <h3><a href="/register" v-show="!signUp" v-on:click.prevent="toggleSignUp">Register</a></h3>
        <h3><a href="/register" v-show="signUp" v-on:click.prevent="toggleSignUp">Login</a></h3>
      </ul>
      <div class='register-page'>
        <div v-show="signUp" class='signup-content'>
          <h2> Do you have big Dreams?</h2>
          <h3>
            Imagine if you could be Able to immortalise your dreams, keep track of them
            and share with your friends. The bucketlist App does just that for you!
          </h3>
        </div>
        <form v-on:submit.prevent>
          <span class="login-title" v-show="signUp">Register</span>
          <span class="login-title" v-show="!signUp"> Sign in</span>
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
              v-model.trim="password"
              id="password"
            >
            <span
              class="form-errors"
              v-show='password && invalidPassword()'>
              password must be at least 8 characters long
            </span>
          </label>
          <label v-show="signUp">
            confirm password
            <input
              placeholder="Confirm password"
              type="password"
              v-model.trim="confirmPassword"
            >
            <span
              class="form-errors"
              v-show='confirmPassword && invalidConfirmPassword()'
            >
              passwords don't match
            </span>
          </label>
          <span class="form-errors" v-show='errors && !signUp'>
            Invalid login credentials.
          </span>
          <span class="login-link" v-show="signUp">
            <p>Already have an account?</p>
            <a v-on:click.prevent="toggleSignUp" href="/register">Sign in</a>
          </span>
          <span class="login-link" v-show="!signUp">
            <p> Don't have an account?</p>
            <a v-on:click.prevent="toggleSignUp" href="/register">Register</a>
          </span>
          <button
            class="login-button"
            v-show="signUp"
            type="submit"
            v-on:click="registerUser"
          >Register</button>
          <button
            class="login-button"
            v-show="!signUp"
            type="submit"
            v-on:click="loginUser"
          >Login </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      signUp: true,
      errors: '',
    };
  },
  methods: {
    toggleSignUp() {
      this.signUp = !this.signUp;
    },
    invalidPassword() {
      return this.password.length < 7;
    },
    invalidConfirmPassword() {
      return this.password !== this.confirmPassword;
    },
    async loginUser() {
      let response;
      try {
        const data = { username: this.email, password: this.password };
        response = await axios.post(`${config.BASE_URL}/api-token-auth/`, data);
        window.localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'Bucketlist' });
      } catch (error) {
        this.errors = error;
      }
      return response;
    },
    async registerUser() {
      const data = { email: this.email, password: this.password };
      await axios.post(`${config.BASE_URL}/register/`, data);
      this.loginUser();
    },
  },
};
</script>

<style scoped lang='scss' src='../scss/Register.scss'></style>
