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
            @delete="deleteItem"
            @update="updateItem"
          />
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
/* TODO: why using a store with this component causes all children
 * items to be displayed at the same time. Then again no need to
 * create a store for this component as the data here is only being
 * used here.
 */
import { patchItem, getItem, postItem, deleteItem } from "@/api";
import BucketlistItemItem from "@/components/BucketlistItemItem.vue";

export default {
  components: {
    BucketlistItemItem,
  },
  props: {
    bucketlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allowEdit: false,
      showItems: false,
      newName: "",
      items: [],
      newItem: "",
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
    toggleShowItems() {
      this.showItems = !this.showItems;
    },
    async editBucketlist(url) {
      const apiData = { name: this.newName };
      const emitData = { url, name: this.newName };
      const response = await patchItem(url, apiData);
      this.$emit("update", emitData);
      this.toggleEdit();
      return response;
    },
    async toggleBucketlistDone(url, done) {
      const apiData = { done: !done };
      const emitData = { url, done: !done };
      const response = await patchItem(url, apiData);
      this.$emit("update", emitData);
      return response;
    },
    async getItems(url) {
      const response = await getItem(url);
      this.items = response.data.results;
      return response;
    },
    async addItem(url) {
      const data = { name: this.newItem };
      const response = await postItem(url, data);
      this.items.unshift(response.data);
      this.newItem = "";
      return response;
    },
    async deleteItem(url) {
      const response = await deleteItem(url);
      const index = this.items.map((item) => item.url).indexOf(url);
      this.items.splice(index, 1);
      return response;
    },
    async updateItem(data) {
      const { url, name, done } = data;
      const item = this.items.find((itm) => itm.url === url);
      if (name) {
        item.name = name;
      } else {
        item.done = done;
      }
    },
  },
};
</script>

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
