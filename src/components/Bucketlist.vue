<template>
  <div class="landing-page">
    <ul>
      <li> Bucketlist Image </li>
      <li> Bucketlist App </li>
      <input v-if="signedIn" placeholder="Search" />
      <li>{{ user }} </li>
    </ul>
    <div v-if="signedIn">
      <input type='text' v-model.trim="newBucketlist" v-on:keyup.enter="addBucketlist">
      <ul v-if="bucketlists.length">
        <ListBucketlist
          v-for="bucketlist in bucketlists"
          :key="bucketlist.url"
          :bucketlist="bucketlist"
          :allowEdit="allowEdit"
          v-model="bucketlistName"
          v-on:delete="deleteBucketlist"
          v-on:edit="editBucketlist"
          v-on:add="addBucketlist"
        />
      </ul>
    </div>
    <div v-else>
      <form v-on:submit.prevent="loginUser">
        <label>
          Email
          <input placeholder="Your email" type="email" v-model.trim.lazy="email">
        </label>
        <label>
          Password
          <input placeholder="Your pasword" type="password" v-model.trim.lazy="password">
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ListBucketlist from './ListBucketlist';

export default {
  name: 'Bucketlist',
  components: {
    ListBucketlist,
  },
  data() {
    return {
      signedIn: false,
      bucketlists: [],
      newBucketlist: '',
      bucketlistDone: false,
      user: 'Login',
      errors: '',
      email: '',
      password: '',
      allowEdit: false,
      bucketlistName: '',
    };
  },
  methods: {
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
          this.signedIn = true;
          this.getBucketlists();
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    getBucketlists() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/bucketlists/',
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.bucketlists = response.data.results;
          this.user = response.data.results[0].user;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    deleteBucketlist(url) {
      axios({
        method: 'delete',
        url,
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
      })
        .then(() => {
          const index = this.bucketlists.map(bucketlist =>
            bucketlist.url).indexOf(url);
          this.bucketlists.splice(index, 1);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    editBucketlist() {
      this.allowEdit = !this.allowEdit;
      // axios({
      //   method: 'put',
      //   url,
      //   headers: {
      //     Authorization: `Token ${window.localStorage.getItem('token')}`,
      //     'content-Type': 'application/json',
      //   },
      //   data: {
      //     name: this.newBucketlist,
      //   },
      // });
    },
    addBucketlist() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/bucketlists/',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        data: {
          name: this.newBucketlist,
          items: [],
        },
      })
        .then((response) => {
          this.bucketlists.unshift(response.data);
          this.newBucketlist = '';
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
