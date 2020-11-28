import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Smoke', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(App);
    expect(wrapper).toBeTruthy();
  });
});
