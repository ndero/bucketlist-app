<template>
  <input :value="bucketlist.name" type="text">
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
