import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { shallowMount } from "@vue/test-utils";
import BucketlistItemItem from "@/components/BucketlistItemItem.vue";
import { items } from "./fixtures.js";

vi.mock("axios", () => {
  return {
    default: {
      patch: vi.fn(),
    },
  };
});
const propItem = items[0];
const editedItem = items[1];
const patchResponse = {
  data: {
    results: { item: editedItem },
  },
};

describe("Bucketlist Item Item tests", () => {
  let wrapper;

  beforeEach(() => {
    axios.patch.mockResolvedValue(patchResponse);

    wrapper = shallowMount(BucketlistItemItem, {
      props: { item: propItem },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it("toggles edit mode", () => {
    wrapper.vm.toggleEdit();
    expect(wrapper.vm.allowEdit).toBeTruthy();
  });
  it("edit item name", async () => {
    expect(wrapper.vm.item.name).toEqual("Broccoli");
    const { data } = await wrapper.vm.editItem();
    expect(data.results.item.name).toEqual("Spinach");
  });
  it("toggle item done", async () => {
    expect(wrapper.vm.item.done).toEqual(true);
    const { data } = await wrapper.vm.toggleItemDone();
    expect(data.results.item.done).toEqual(false);
  });
});
