<script setup>
import { ref } from "vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update", "delete"]);

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
const editItem = async (itemId) => {
  const emitData = { itemId, name: newName.value };
  emit("update", emitData);
  toggleEdit();
};
const toggleItemDone = async (itemId, done) => {
  const emitData = { itemId, done: !done };
  emit("update", emitData);
};
</script>
<template>
  <li id="items">
    <input
      type="checkbox"
      :checked="item.done"
      v-on:click.prevent="toggleItemDone(item.id, item.done)"
    />
    <span v-if="!allowEdit">{{ item.name }}</span>
    <input
      v-if="allowEdit"
      v-model="newName"
      v-on:keyup.enter="editItem(item.id)"
      type="text"
    />
    <img src="../assets/edit.png" v-on:click="toggleEdit(item.name)" />
    <img src="../assets/delete.png" v-on:click="$emit('delete', item.id)" />
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
