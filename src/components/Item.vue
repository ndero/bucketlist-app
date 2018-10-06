<template>
    <li>
      <input
        type="checkbox"
        :checked="item.done"
        v-on:click.prevent="toggleItemDone"
      >
      <span v-if="!allowEdit">{{ item.name }}</span>
      <input
        v-if="allowEdit"
        v-model="newName"
        v-on:keyup.enter="editItem"
        type="text"
      >
      <button v-on:click="toggleEdit">Edit</button>
      <button v-on:click="$emit('delete', item.url)">Delete</button>
    </li>
</template>

<script>
import axios from 'axios';
import config from '../config';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allowEdit: false,
      newName: this.item.name,
    };
  },
  methods: {
    toggleEdit() {
      this.allowEdit = !this.allowEdit;
    },
    async editItem() {
      const data = { name: this.newName };
      await axios.patch(this.item.url, data, { headers: config.headers });
      this.item.name = this.newName;
      this.toggleEdit();
    },
    async toggleItemDone() {
      const data = { done: !this.item.done };
      await axios.patch(this.item.url, data, { headers: config.headers });
      this.item.done = !this.item.done;
    },
  },
};
</script>
