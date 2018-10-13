<template>
  <div id="edit-bucketlist">
    <li>
      <div>
      <input
        type="checkbox"
        v-on:click.prevent="toggleBucketlistDone"
        :checked="bucketlist.done"
      >
      <input
        v-if="allowEdit"
        type="text"
        v-model="newName"
        v-on:keyup.enter="editBucketlist"
      >
      <span
        v-if="!allowEdit"
        v-on:click="toggleShowItems"
        v-on:click.once="getItems"
      >
        {{ bucketlist.name }}
      </span>
      <img src="../assets/edit.png" v-on:click="toggleEdit"/>
      <img src="../assets/delete.png" v-on:click="$emit('delete', bucketlist.url)"/>
      </div>
      <div class="items-view" v-if="showItems">
        <input
          id="add-item"
          placeholder="Add an item"
          type="text"
          v-model.trim="newItem"
          v-on:keyup.enter="addItem"
        >
        <ul v-if="items.length">
          <Item
            v-for="item in items"
            :key="item.url"
            :item="item"
            v-on:delete="deleteItem"
          />
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config';
import Item from './Item';

export default {
  components: {
    Item,
  },
  props: {
    bucketlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allowEdit: false,
      showItems: false,
      newName: this.bucketlist.name,
      items: [],
      newItem: '',
    };
  },
  methods: {
    toggleEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleShowItems() {
      this.showItems = !this.showItems;
    },
    async editBucketlist() {
      const data = { name: this.newName };
      await axios.patch(this.bucketlist.url, data, { headers: config.headers });
      this.bucketlist.name = this.newName;
      this.toggleEdit();
    },
    async toggleBucketlistDone() {
      const data = { done: !this.bucketlist.done };
      await axios.patch(this.bucketlist.url, data, { headers: config.headers });
      this.bucketlist.done = !this.bucketlist.done;
    },
    async getItems() {
      const response = await axios.get(this.bucketlist.items_url, { headers: config.headers });
      this.items = response.data.results;
      return response;
    },
    async addItem() {
      const data = { name: this.newItem };
      const response = await axios.post(this.bucketlist.items_url,
        data, { headers: config.headers });
      this.items.unshift(response.data);
      this.newItem = '';
      return response;
    },
    async deleteItem(url) {
      await axios.delete(url, { headers: config.headers });
      const index = this.items.map(item => item.url).indexOf(url);
      this.items.splice(index, 1);
    },
  },
};
</script>

<style scoped lang='scss' src='../scss/EditBucketlist.scss'></style>
