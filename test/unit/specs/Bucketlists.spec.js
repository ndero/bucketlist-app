import { shallowMount } from '@vue/test-utils';
import Bucketlists from '@/components/Bucketlists';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      count: 3,
      results: [
        { name: 'bucketlist one', user: 'one' },
        { name: 'bucketlist two', user: 'one' },
      ],
    },
  })),
  post: jest.fn(() => Promise.resolve({
    data: {
      url: 'http://127.0.0.1:8000/bucketlists/1/',
      pk: 1,
      name: 'new bucketlist',
      done: false,
      items_url: 'http://127.0.0.1:8000/bucketlists/320/items/',
      items: [],
      user: 'john@mail.com',
    },
  })),
  delete: jest.fn(),
}));

describe(' Bucketlist tests', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Bucketlists);
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(cmp.vm.$el).toMatchSnapshot();
  });

  it('gets bucketlists', async () => {
    const result = await cmp.vm.getBucketlists();
    expect(result).toEqual({
      data: {
        count: 3,
        results: [
          { name: 'bucketlist one', user: 'one' },
          { name: 'bucketlist two', user: 'one' },
        ],
      },
    });
    expect(cmp.vm.count).toEqual(3);
  });

  it('adds a bucketlist', async () => {
    const result = await cmp.vm.addBucketlist();
    expect(result).toEqual({
      data: {
        url: 'http://127.0.0.1:8000/bucketlists/1/',
        pk: 1,
        name: 'new bucketlist',
        done: false,
        items_url: 'http://127.0.0.1:8000/bucketlists/320/items/',
        items: [],
        user: 'john@mail.com',
      },
    });
  });

  it('deletes a bucketlist', async () => {
    await cmp.vm.deleteBucketlist('http://127.0.0.1:8000/bucketlists/1/');
    expect(cmp.vm.count).toEqual(2);
  });
});
