<script setup>
/* TODO: why using a store with this component causes all children
 * items to be displayed at the same time. Then again no need to
 * create a store for this component as the data here is only being
 * used here.
 */
import { ref } from "vue";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { bucketlistStore } from "@/store/bucketlistStore";
import { db, patchItem, postItem, deleteItem } from "@/firebase";
import BucketlistItemItem from "@/components/BucketlistItemItem.vue";

const props = defineProps({
  bucketlist: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const showItems = ref(false);
const allowEdit = ref(false);
const newName = ref("");
const items = ref([]);
const newItem = ref("");

const store = bucketlistStore();
const itemsRef = collection(
  db,
  "Users",
  props.userId,
  "Bucketlists",
  props.bucketlist.id,
  "Items"
);
let itemsUnsubscribe = null;

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
const editBucketlist = async (id) => {
  const data = { name: newName.value };
  const response = await store.updateBucketlist(id, data);
  toggleEdit();
  return response;
};
const toggleBucketlistDone = async (id, done) => {
  const data = { done: !done };
  const response = await store.updateBucketlist(id, data);
  return response;
};
const getItems = async () => {
  if (itemsUnsubscribe) itemsUnsubscribe();
  itemsUnsubscribe = onSnapshot(itemsRef, (querySnapshot) => {
    let response = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { id } = doc;
      response.push({ id, ...data });
    });
    items.value = response;
  });
};
const addItem = async () => {
  const data = { name: newItem.value };
  const response = await postItem(itemsRef, data);
  newItem.value = "";
  return response;
};
const removeItem = async (itemId) => {
  const itemRef = doc(itemsRef, itemId);
  const response = await deleteItem(itemRef);
  return response;
};
const updateItem = async (emitData) => {
  const { itemId, name, done } = emitData;
  const data = name ? { name } : { done };
  const itemRef = doc(itemsRef, itemId);
  const response = await patchItem(itemRef, data);
  return response;
};
</script>

<template>
  <div id="edit-bucketlist">
    <li>
      <div>
        <input
          type="checkbox"
          v-on:click.prevent="
            toggleBucketlistDone(bucketlist.id, bucketlist.done)
          "
          :checked="bucketlist.done"
        />
        <input
          v-if="allowEdit"
          type="text"
          v-model="newName"
          v-on:keyup.enter="editBucketlist(bucketlist.id)"
        />
        <span
          v-if="!allowEdit"
          v-on:click="toggleShowItems"
          v-on:click.once="getItems"
        >
          {{ bucketlist.name }}
        </span>
        <img
          src="../assets/edit.png"
          v-on:click="toggleEdit(bucketlist.name)"
        />
        <img
          src="../assets/delete.png"
          v-on:click="store.removeBucketlist(bucketlist.id)"
        />
      </div>
      <div class="items-view" v-if="showItems">
        <input
          id="add-item"
          placeholder="Add an item"
          type="text"
          v-model.trim="newItem"
          v-on:keyup.enter="addItem"
        />
        <ul v-if="items.length">
          <bucketlist-item-item
            v-for="item in items"
            :key="item.id"
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
