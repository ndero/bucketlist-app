import { mount } from '@vue/test-utils';
import Item from '@/components/Item';

const createCmp = propsData => mount(Item, { propsData });
