<template>
  <li id="items">
    <input
      type="checkbox"
      :checked="item.done"
      v-on:click.prevent="toggleItemDone"
    />
    <span v-if="!allowEdit">{{ item.name }}</span>
    <input
      v-if="allowEdit"
      v-model="newName"
      v-on:keyup.enter="editItem"
      type="text"
    />
    <img src="../assets/edit.png" v-on:click="toggleEdit" />
    <img src="../assets/delete.png" v-on:click="$emit('delete', item.url)" />
  </li>
</template>

<script>
import axios from "axios";
import config from "../config";

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

<style scoped lang="scss">
#items {
  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    color: #fff;
    font-size: 1em;
    padding: 0.3em 0;
    &:checked + * {
      color: green;
    }
  }
  img {
    height: 1em;
    padding: 0 1em;
    visibility: hidden;
  }
  &:hover > img {
    visibility: visible;
  }
}
</style>
