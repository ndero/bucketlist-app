<script setup>
/* TODO: why using a store with this component causes all children
 * items to be displayed at the same time. Then again no need to
 * create a store for this component as the data here is only being
 * used here.
 */
import { ref } from "vue";
import { patchItem, getItem, postItem, deleteItem } from "@/api";
import BucketlistItemItem from "@/components/BucketlistItemItem.vue";

defineProps({
  bucketlist: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update"]);

const showItems = ref(false);
const allowEdit = ref(false);
const newName = ref("");
const items = ref([]);
const newItem = ref("");

const toggleEdit = (name) => {
  allowEdit.value = !allowEdit.value;
  if (allowEdit.value) {
    newName.value = name;
  } else {
    newName.value = "";
  }
};
const toggleShowItems = () => {
  showItems.value = !showItems.value;
};
const editBucketlist = async (url) => {
  const apiData = { name: newName.value };
  const emitData = { url, name: newName.value };
  const response = await patchItem(url, apiData);
  emit("update", emitData);
  toggleEdit();
  return response;
};
const toggleBucketlistDone = async (url, done) => {
  const apiData = { done: !done };
  const emitData = { url, done: !done };
  const response = await patchItem(url, apiData);
  emit("update", emitData);
  return response;
};
const getItems = async (url) => {
  const response = await getItem(url);
  items.value = response.data.results;
  return response;
};
const addItem = async (url) => {
  const data = { name: newItem.value };
  const response = await postItem(url, data);
  items.value.unshift(response.data);
  newItem.value = "";
  return response;
};
const removeItem = async (url) => {
  const response = await deleteItem(url);
  const index = items.value.map((item) => item.url).indexOf(url);
  items.value.splice(index, 1);
  return response;
};
const updateItem = async (data) => {
  const { url, name, done } = data;
  const item = items.value.find((itm) => itm.url === url);
  if (name) {
    item.name = name;
  } else {
    item.done = done;
  }
};
</script>

<template>
  <div id="edit-bucketlist">
    <li>
      <div>
        <input
          type="checkbox"
          v-on:click.prevent="
            toggleBucketlistDone(bucketlist.url, bucketlist.done)
          "
          :checked="bucketlist.done"
        />
        <input
          v-if="allowEdit"
          type="text"
          v-model="newName"
          v-on:keyup.enter="editBucketlist(bucketlist.url)"
        />
        <span
          v-if="!allowEdit"
          v-on:click="toggleShowItems"
          v-on:click.once="getItems(bucketlist.items_url)"
        >
          {{ bucketlist.name }}
        </span>
        <img
          src="../assets/edit.png"
          v-on:click="toggleEdit(bucketlist.name)"
        />
        <img
          src="../assets/delete.png"
          v-on:click="$emit('delete', bucketlist.url)"
        />
      </div>
      <div class="items-view" v-if="showItems">
        <input
          id="add-item"
          placeholder="Add an item"
          type="text"
          v-model.trim="newItem"
          v-on:keyup.enter="addItem(bucketlist.items_url)"
        />
        <ul v-if="items.length">
          <bucketlist-item-item
            v-for="item in items"
            :key="item.url"
            :item="item"
            @delete="removeItem"
            @update="updateItem"
          />
        </ul>
      </div>
    </li>
  </div>
</template>

<style scoped lang="scss">
#edit-bucketlist {
  $screen-width: 850px;
  li {
    list-style: none;
    padding: 0.2em 0;
    input {
      background: transparent;
      color: #fff;
      border: none;
      border-bottom: 1px solid #fff;
      padding: 0.5em 0;
      font-size: 1em;
      &:checked + * {
        color: green;
      }
    }
    .items-view {
      display: flex;
      input {
        max-height: 1em;
        margin-left: 2em;
      }
      @media screen and (max-width: $screen-width) {
        flex-flow: column;
      }
    }
    #add-item {
      margin-bottom: 1em;
    }
    img {
      height: 1em;
      padding: 0 1em;
      visibility: hidden;
    }
    div:hover > img {
      visibility: visible;
    }
  }
}
</style>
