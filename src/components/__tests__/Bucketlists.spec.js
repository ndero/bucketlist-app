import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils';
import Bucketlists from '@/components/Bucketlists';
import router from '@/router';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      count: 11,
      results: [
        { name: 'bucketlist one', user: 'one' },
      ],
    },
  })),
  post: jest.fn(() => Promise.resolve({
    data: {
      url: 'http://127.0.0.1:8000/bucketlists/12/',
      pk: 12,
      name: 'new bucketlist',
      done: false,
      items_url: 'http://127.0.0.1:8000/bucketlists/12/items/',
      items: [],
      user: 'john@mail.com',
    },
  })),
  delete: jest.fn(),
}));

describe(' Bucketlist tests', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Bucketlists, { router });
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('gets bucketlists', async () => {
    const result = await cmp.vm.getBucketlists();
    expect(result).toEqual({
      data: {
        count: 11,
        results: [
          { name: 'bucketlist one', user: 'one' },
        ],
      },
    });
    expect(cmp.vm.count).toEqual(11);
  });
  it('adds a bucketlist', async () => {
    const result = await cmp.vm.addBucketlist();
    expect(result).toEqual({
      data: {
        url: 'http://127.0.0.1:8000/bucketlists/12/',
        pk: 12,
        name: 'new bucketlist',
        done: false,
        items_url: 'http://127.0.0.1:8000/bucketlists/12/items/',
        items: [],
        user: 'john@mail.com',
      },
    });
    expect(cmp.vm.count).toEqual(12);
  });
  it('deletes a bucketlist', async () => {
    await cmp.vm.deleteBucketlist('http://127.0.0.1:8000/bucketlists/12/');
    expect(cmp.vm.count).toEqual(11);
  });
  it('log the user out', () => {
    cmp.find('#logout').trigger('click');
    expect(cmp.vm.$router.history.current.name).toEqual('Register');
  });
});
