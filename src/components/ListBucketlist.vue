<template>
  <li>
    {{ bucketlist.name }}
    <button v-on:click="$emit('edit', bucketlist.url)">Edit</button>
    <button v-on:click="$emit('delete', bucketlist.url)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    bucketlist: {
      type: Object,
      required: true,
    },
  },
};
</script>
