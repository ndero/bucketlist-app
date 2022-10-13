<template>
  <div id="edit-bucketlist">
    <li>
      <div>
        <input
          type="checkbox"
          v-on:click.prevent="toggleBucketlistDone"
          :checked="bucketlist.done"
        />
        <input
          v-if="allowEdit"
          type="text"
          v-model="newName"
          v-on:keyup.enter="editBucketlist"
        />
        <span
          v-if="!allowEdit"
          v-on:click="toggleShowItems"
          v-on:click.once="getItems"
        >
          {{ bucketlist.name }}
        </span>
        <img src="../assets/edit.png" v-on:click="toggleEdit" />
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
          v-on:keyup.enter="addItem"
        />
        <ul v-if="items.length">
          <bucketlist-item-item
            v-for="item in items"
            :key="item.url"
            :item="item"
            v-on:delete="deleteItem"
          />
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
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
      newName: this.bucketlist.name,
      items: [],
      newItem: "",
    };
  },
  methods: {
    toggleEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleShowItems() {
      this.showItems = !this.showItems;
    },
    async editBucketlist() {
      const data = { name: this.newName };
      await patchItem(this.bucketlist.url, data);
      this.bucketlist.name = this.newName;
      this.toggleEdit();
    },
    async toggleBucketlistDone() {
      const data = { done: !this.bucketlist.done };
      await patchItem(this.bucketlist.url, data);
      this.bucketlist.done = !this.bucketlist.done;
    },
    async getItems() {
      const response = await getItem(this.bucketlist.items_url);
      this.items = response.data.results;
      return response;
    },
    async addItem() {
      const data = { name: this.newItem };
      const response = await postItem(this.bucketlist.items_url, data);
      this.items.unshift(response.data);
      this.newItem = "";
      return response;
    },
    async deleteItem(url) {
      await deleteItem(url);
      const index = this.items.map((item) => item.url).indexOf(url);
      this.items.splice(index, 1);
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
