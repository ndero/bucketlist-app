<template>
  <div>
    <form v-on:submit.prevent="$emit('login', email, password)">
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
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      signUp: false,
    };
  },
};
</script>
