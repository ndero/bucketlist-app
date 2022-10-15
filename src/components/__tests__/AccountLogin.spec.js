import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { createPinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import AccountLogin from "@/components/AccountLogin.vue";

vi.mock("axios", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});
const pinia = createPinia();
const postResponse = { data: { token: "t0k3n#" } };
describe("Register tests", () => {
  let wrapper;

  beforeEach(() => {
    axios.post.mockResolvedValue(postResponse);
    wrapper = shallowMount(AccountLogin, {
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it("toggle sign up", () => {
    expect(wrapper.vm.signUp).toEqual(true);
    wrapper.vm.toggleSignUp();
    expect(wrapper.vm.signUp).toEqual(false);
  });
  it("login user", async () => {
    await wrapper.vm.loginUser();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
  it("register user", async () => {
    await wrapper.vm.registerUser();
    expect(axios.post).toHaveBeenCalledTimes(2);
  });
  it("cannot register with unmatching passwords", async () => {
    wrapper.vm.password = "testpass123";
    wrapper.vm.confirmPassword = "123testpass";
    await wrapper.vm.registerUser();
    expect(wrapper.vm.invalidConfirmPassword).toEqual(true);
  });
});
