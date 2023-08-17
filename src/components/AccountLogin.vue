<script setup>
import { storeToRefs } from "pinia";
import { authStore } from "@/store/authStore";

const store = authStore();
const {
  email,
  password,
  confirmPassword,
  signUp,
  errors,
  invalidPassword,
  invalidConfirmPassword,
} = storeToRefs(store);
</script>

<template>
  <div id="register">
    <div id="register-foreground">
      <ul class="navbar">
        <li>
          <img src="../assets/bucketlist.jpg" alt="logo" Bucketlist Image />
        </li>
        <li><h1>Bucketlist App</h1></li>
        <h3 class="login-link">
          <span v-show="!signUp" v-on:click="store.toggleSignUp">Register</span>
        </h3>
        <h3 class="login-link">
          <span v-show="signUp" v-on:click="store.toggleSignUp">Login</span>
        </h3>
      </ul>
      <div class="register-page">
        <div v-show="signUp" class="signup-content">
          <h2>Do you have big Dreams?</h2>
          <h3>
            Imagine if you could be Able to immortalise your dreams, keep track
            of them and share with your friends. The bucketlist App does just
            that for you!
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
            />
          </label>
          <label>
            Password
            <input
              placeholder="Your password"
              type="password"
              v-model.trim="password"
              id="password"
            />
            <span class="form-errors" v-show="password && invalidPassword">
              password must be at least 8 characters long
            </span>
          </label>
          <label v-show="signUp">
            confirm password
            <input
              placeholder="Confirm password"
              type="password"
              v-model.trim="confirmPassword"
            />
            <span
              class="form-errors"
              v-show="confirmPassword && invalidConfirmPassword"
            >
              passwords don't match
            </span>
          </label>
          <span class="form-errors" v-show="errors && !signUp">
            Invalid login credentials.
          </span>
          <span class="login-link" v-show="signUp">
            <p>Already have an account?</p>
            <span v-on:click="store.toggleSignUp">Sign in</span>
          </span>
          <span class="login-link" v-show="!signUp">
            <p>Don't have an account?</p>
            <span v-on:click="store.toggleSignUp">Register</span>
          </span>
          <button
            class="login-button"
            v-show="signUp"
            type="submit"
            v-on:click="store.registerUser"
          >
            Register
          </button>
          <button
            class="login-button"
            v-show="!signUp"
            type="submit"
            v-on:click="store.loginUser"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#register {
  $screen-width: 900px;
  background: url(../assets/image.jpg);
  background-size: cover;
  min-height: 100vh;
  #register-foreground {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.8);

    .login-link {
      text-align: left;
      padding-left: 2.2em;

      span {
        cursor: pointer;
        font-weight: 700;
        &:hover {
          color: green;
        }
      }
    }
  }
  .navbar {
    display: flex;
    list-style: none;
    justify-content: space-around;
    color: #fff;
    @media screen and (max-width: $screen-width) {
      flex-flow: column;
    }
    img {
      height: 5em;
      width: auto;
      @media screen and (max-width: $screen-width) {
        height: 4em;
        padding-top: 2em;
      }
    }
    h3 {
      @media screen and (max-width: $screen-width) {
        display: none;
      }
    }
  }
  .register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: $screen-width) {
      flex-flow: column;
    }
    .signup-content {
      color: rgba(245, 242, 247, 0.705);
      padding-left: 4em;
      @media screen and (max-width: $screen-width) {
        padding: 0.5em;
      }
      h2 {
        color: #fff;
      }
    }
    form {
      margin: 2em 10em;
      display: flex;
      padding: 2em;
      background: rgba(0, 0, 0, 0.5);
      flex-direction: column;
      border-radius: 0.8em;
      max-width: 17em;
      color: #fff;
      .login-title {
        font-size: 1.8em;
        font-weight: 800;
        margin: 0 1.2em 0em 0em;
      }
      label {
        text-align: left;
        padding: 0.5em 2em;
        font-weight: 500;
      }
      input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        padding: 1em;
        display: block;
        border-radius: 0.3em;
        color: #fff;
        font-size: 0.8em;
      }
      .login-button {
        background: rgb(51, 122, 183);
        height: 3em;
        margin: 3em 0;
        border-radius: 3em;
        border: none;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
      .form-errors {
        color: red;
        font-size: 0.9em;
      }
    }
  }
}
</style>
