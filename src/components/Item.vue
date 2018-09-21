<template>
    <li>
      <span>{{ item.name }}</span>
      <button v-on:click="$emit('delete', item.url)">Delete</button>
    </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
