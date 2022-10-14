<template>
  <li id="items">
    <input
      type="checkbox"
      :checked="item.done"
      v-on:click.prevent="toggleItemDone(item.url, item.done)"
    />
    <span v-if="!allowEdit">{{ item.name }}</span>
    <input
      v-if="allowEdit"
      v-model="newName"
      v-on:keyup.enter="editItem(item.url)"
      type="text"
    />
    <img src="../assets/edit.png" v-on:click="toggleEdit(item.name)" />
    <img src="../assets/delete.png" v-on:click="$emit('delete', item.url)" />
  </li>
</template>

<script>
import { patchItem } from "@/api";

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
      newName: "",
    };
  },
  methods: {
    toggleEdit(name) {
      this.allowEdit = !this.allowEdit;
      if (this.allowEdit) {
        this.newName = name;
      } else {
        this.newName = "";
      }
    },
    async editItem(url) {
      const apiData = { name: this.newName };
      const emitData = { url, name: this.newName };
      await patchItem(url, apiData);
      this.$emit("update", emitData);
      this.toggleEdit();
    },
    async toggleItemDone(url, done) {
      const apiData = { done: !done };
      const emitData = { url, done: !done };
      await patchItem(url, apiData);
      this.$emit("update", emitData);
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
