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
    editItem() {
      axios({
        method: 'patch',
        url: this.item.url,
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
        data: {
          name: this.newName,
        },
      })
        .then(() => {
          this.item.name = this.newName;
          this.toggleEdit();
        });
    },
    toggleItemDone() {
      axios({
        method: 'patch',
        url: this.item.url,
        datatype: 'json',
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`,
          'content-Type': 'application/json',
        },
        data: {
          done: !this.item.done,
        },
      })
        .then(() => {
          this.item.done = !this.item.done;
        });
    },
  },
};
</script>
