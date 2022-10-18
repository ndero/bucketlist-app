<script setup>
import { storeToRefs } from "pinia";
import { bucketlistStore } from "@/store";
import BucketlistItem from "@/components/BucketlistItem.vue";

const store = bucketlistStore();
const { bucketlists, newBucketlist, user, count } = storeToRefs(store);

store.getBucketlists();
</script>

<template>
  <div id="bucketlists">
    <ul class="navbar">
      <img src="../assets/bucketlist.jpg" />
      <span>{{ count }}</span>
      <input placeholder="Search..." type="text" />
      <li id="email">{{ user }}</li>
      <li id="logout" v-on:click="store.logout">Logout</li>
    </ul>
    <input
      class="add-bucketlist"
      placeholder="Add a new bucketlist"
      type="text"
      v-model.trim="newBucketlist"
      v-on:keyup.enter="store.addBucketlist"
    />
    <div class="bucketlist-view">
      <ul v-if="bucketlists.length">
        <bucketlist-item
          v-for="bucketlist in bucketlists"
          :key="bucketlist.id"
          :bucketlist="bucketlist"
        />
      </ul>
      <p v-else>You don't have any bucketlist yet.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
#bucketlists {
  $screen-width: 850px;
  color: #fff;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  min-height: 100vh;
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
