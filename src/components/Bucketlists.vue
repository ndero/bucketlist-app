<template>
  <div>
    <ul>
        <li> Bucketlist Icon </li>
        <li> bucketlist App </li>
        <input placeholder="Search..." type="text">
        <li>{{ user }}</li>
        <li v-on:click="logout"> Logout </li>
    </ul>
    <input
      type='text'
      v-model.trim="newBucketlist"
      v-on:keyup.enter="addBucketlist"
    >
    <ul v-if="bucketlists.length">
      <EditBucketlist
        v-for="bucketlist in bucketlists"
        :key="bucketlist.url"
        :bucketlist="bucketlist"
        v-on:delete="deleteBucketlist"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import EditBucketlist from './EditBucketlist';
import Register from './Register';

export default {
  name: 'Bucketlists',
  components: {
    EditBucketlist,
    Register,
  },
  data() {
    return {
      bucketlists: [],
      newBucketlist: '',
      user: '',
      errors: '',
    };
  },
  created() {
    this.getBucketlists();
  },
  methods: {
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
          const index = this.bucketlists.map(bucketlist => bucketlist.url).indexOf(url);
          this.bucketlists.splice(index, 1);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    logout() {
      window.localStorage.removeItem('token');
      this.$router.replace({ name: 'Register' });
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
