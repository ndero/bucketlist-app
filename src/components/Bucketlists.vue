<template>
  <div id="bucketlists">
    <ul class="navbar">
        <img src="../assets/bucketlist.jpg">
        <span>{{ count }}</span>
        <input placeholder="Search..." type="text">
        <li id="email">{{ user }}</li>
        <li id="logout" v-on:click="logout">Logout</li>
    </ul>
    <input
      class="add-bucketlist"
      placeholder="Add a new bucketlist"
      type='text'
      v-model.trim="newBucketlist"
      v-on:keyup.enter="addBucketlist"
    >
    <div class="bucketlist-view">
      <ul v-if="bucketlists.length">
        <EditBucketlist
          v-for="bucketlist in bucketlists"
          :key="bucketlist.url"
          :bucketlist="bucketlist"
          v-on:delete="deleteBucketlist"
        />
      </ul>
      <p v-else>You don't have any bucketlist yet.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';
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
      count: 0,
      page: 1,
    };
  },
  created() {
    this.getBucketlists();
  },
  beforeUpdate() {
    if (this.bucketlists.length < 1 && this.count > 0) {
      this.getBucketlists();
    }
  },
  methods: {
    async getBucketlists() {
      const response = await axios.get(`${config.BASE_URL}/bucketlists/?page=${this.page}`,
        { headers: config.headers });
      this.bucketlists = response.data.results;
      this.count = response.data.count;
      this.user = response.data.results[0].user;
      return response;
    },
    async addBucketlist() {
      const data = { name: this.newBucketlist, items: [] };
      const response = await axios.post(`${config.BASE_URL}/bucketlists/`,
        data, { headers: config.headers });
      this.bucketlists.unshift(response.data);
      this.bucketlists = this.bucketlists.slice(0, 10);
      this.newBucketlist = '';
      this.count += 1;
      return response;
    },
    async deleteBucketlist(url) {
      await axios.delete(url, { headers: config.headers });
      const index = this.bucketlists.map(bucketlist => bucketlist.url).indexOf(url);
      this.bucketlists.splice(index, 1);
      this.count -= 1;
    },
    logout() {
      window.localStorage.removeItem('token');
      this.$router.replace({ name: 'Register' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' src='../scss/Bucketlists.scss'></style>
