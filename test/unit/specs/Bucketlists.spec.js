import { mount, shallowMount } from '@vue/test-utils';
import axios from 'axios';
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

  it('deletes a bucketlist', () => {

  });

  it('adds a bucketlist', () => {

  });
});
