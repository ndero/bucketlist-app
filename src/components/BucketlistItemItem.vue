<script setup>
import { ref } from "vue";
import { patchItem } from "@/api";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update"]);

const allowEdit = ref(false);
const newName = ref("");

const toggleEdit = (name) => {
  allowEdit.value = !allowEdit.value;
  if (allowEdit.value) {
    newName.value = name;
  } else {
    newName.value = "";
  }
};
const editItem = async (url) => {
  const apiData = { name: newName.value };
  const emitData = { url, name: newName.value };
  const response = await patchItem(url, apiData);
  emit("update", emitData);
  toggleEdit();
  return response;
};
const toggleItemDone = async (url, done) => {
  const apiData = { done: !done };
  const emitData = { url, done: !done };
  const response = await patchItem(url, apiData);
  emit("update", emitData);
  return response;
};
</script>
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
