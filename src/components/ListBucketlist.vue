<template>
  <div>
    <li>
      <span v-if="!allowEdit">{{ bucketlist.name }}</span>
      <input v-if="allowEdit" type="text" v-model="newName" v-on:keyup.enter="editBucketlist">
      <button v-on:click="toggleEdit">Edit</button>
      <button v-on:click="$emit('delete', bucketlist.url)">Delete</button>
    </li>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      allowEdit: false,
      newName: this.bucketlist.name,
    };
  },
  props: {
    bucketlist: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleEdit() {
      this.allowEdit = !this.allowEdit;
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
  },
};
</script>
