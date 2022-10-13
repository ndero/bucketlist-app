<template>
  <div id="bucketlists">
    <ul class="navbar">
      <img src="../assets/bucketlist.jpg" />
      <span>{{ count }}</span>
      <input placeholder="Search..." type="text" />
      <li id="email">{{ user }}</li>
      <li id="logout" v-on:click="logout">Logout</li>
    </ul>
    <input
      class="add-bucketlist"
      placeholder="Add a new bucketlist"
      type="text"
      v-model.trim="newBucketlist"
      v-on:keyup.enter="addBucketlist"
    />
    <div class="bucketlist-view">
      <ul v-if="bucketlists.length">
        <bucketlist-item
          v-for="bucketlist in bucketlists"
          :key="bucketlist.url"
          :bucketlist="bucketlist"
          v-on:delete="removeBucketlist"
        />
      </ul>
      <p v-else>You don't have any bucketlist yet.</p>
    </div>
  </div>
</template>

<script>
import { fetchBucketlists, createBucketlist, deleteItem } from "@/api";
import BucketlistItem from "@/components/BucketlistItem.vue";

export default {
  components: {
    BucketlistItem,
  },
  data() {
    return {
      bucketlists: [],
      newBucketlist: "",
      user: "",
      count: 0,
      page: 1,
    };
  },
  created() {
    this.getBucketlists();
  },
  methods: {
    async getBucketlists() {
      const response = await fetchBucketlists(this.page);
      this.bucketlists = response.data.results;
      this.count = response.data.count;
      this.user = response.data.results[0].user;
      return response;
    },
    async addBucketlist() {
      const data = { name: this.newBucketlist, items: [] };
      const response = await createBucketlist(data);
      this.bucketlists.unshift(response.data);
      this.bucketlists = this.bucketlists.slice(0, 10);
      this.newBucketlist = "";
      this.count += 1;
      return response;
    },
    async removeBucketlist(url) {
      await deleteItem(url);
      const index = this.bucketlists
        .map((bucketlist) => bucketlist.url)
        .indexOf(url);
      this.bucketlists.splice(index, 1);
      this.count -= 1;
    },
    logout() {
      window.localStorage.removeItem("token");
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style scoped lang="scss">
#bucketlists {
  $screen-width: 850px;
  color: #fff;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  min-height: 100vh;
  background-color: black;
  .navbar {
    flex: 0 1 98%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    list-style: none;
    justify-content: space-between;
    img {
      height: 3em;
      padding-bottom: 0.5em;
    }
    #logout {
      padding: 0 2em;
      cursor: pointer;
    }
    @media screen and (max-width: $screen-width) {
      flex-flow: column;
    }
    #email,
    input {
      @media screen and (max-width: $screen-width) {
        display: none;
      }
    }
    span {
      @media screen and (max-width: $screen-width) {
        order: 1;
        padding: 1em 0;
      }
    }
  }
  .add-bucketlist {
    display: flex;
    flex: 0 1 10%;
    margin-left: 8em;
    margin-right: 1em;
  }
  .bucketlist-view {
    display: flex;
    text-align: left;
    flex: 0 1 70%;
    justify-content: flex-start;
    p {
      padding: 4em;
    }
  }
  input {
    max-height: 2em;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    padding: 0.5em;
  }
}
</style>
