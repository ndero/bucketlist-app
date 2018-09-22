<template>
  <div>
    <li>
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
      <button v-on:click="toggleEdit">Edit</button>
      <button v-on:click="$emit('delete', bucketlist.url)">Delete</button>
      <div v-if="showItems">
        <input
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
      items: '',
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
    editBucketlist() {
      axios({
        method: 'patch',
        url: this.bucketlist.url,
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
        data: {
          name: this.newName,
        },
      })
        .then(() => {
          this.bucketlist.name = this.newName;
          this.toggleEdit();
        });
    },
    toggleBucketlistDone() {
      axios({
        method: 'patch',
        url: this.bucketlist.url,
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
        data: {
          done: !this.bucketlist.done,
        },
      })
        .then(() => {
          this.bucketlist.done = !this.bucketlist.done;
        });
    },
    getItems() {
      axios({
        method: 'get',
        url: this.bucketlist.items_url,
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.items = response.data.results;
        });
    },
    addItem() {
      axios({
        method: 'post',
        url: this.bucketlist.items_url,
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
        data: {
          name: this.newItem,
        },
      })
        .then((response) => {
          this.items.unshift(response.data);
          this.newItem = '';
        });
    },
    deleteItem(url) {
      axios({
        method: 'delete',
        url,
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
      })
        .then(() => {
          const index = this.items.map(item => item.url).indexOf(url);
          this.items.splice(index, 1);
        });
    },
  },
};
</script>
