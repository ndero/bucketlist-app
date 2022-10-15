import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import BucketlistItems from "@/components/BucketlistItems.vue";
import { bucketlists } from "@/components/__tests__/fixtures.js";

const pinia = createTestingPinia({ createSpy: vi.fn });
const wrapper = shallowMount(BucketlistItems, {
  global: {
    plugins: [pinia],
  },
});

describe(" Bucketlist tests", () => {
  it("matches snapshot", () => {
    wrapper.vm.bucketlists = bucketlists;
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
