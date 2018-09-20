<template>
  <div>
    <li>
      <span v-show="!allowEdit">{{ bucketlist.name }}</span>
      <input v-show="allowEdit" :value="bucketlist.name" type="text">
      <button v-on:click="$emit('edit', bucketlist.url)">Edit</button>
      <button v-on:click="$emit('delete', bucketlist.url)">Delete</button>
    </li>
  </div>
</template>

<script>
import UpdateBucketlist from './UpdateBucketlist';

export default {
  data() {
    return {
      allowEdi: '',
    };
  },
  props: {
    bucketlist: {
      type: Object,
      required: true,
    },
    allowEdit: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
