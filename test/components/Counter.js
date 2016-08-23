import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import objectAssign from 'object-assign';

import Counter from '../../src/js/components/Counter';


function setup(state) {
  const spies = {
    increment: expect.createSpy(),
    decrement: expect.createSpy()
  };

  const props = objectAssign({}, state, spies);

  const enzymeWrapper = shallow(<Counter {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Counter', () => {
  it('should render correct success state', () => {
    const value = 10;
    const { enzymeWrapper } = setup({
      value: value,
      isLoading: false,
      isError: false,
    })

    expect(enzymeWrapper.find('h3').text()).toBe(`Counter: ${value}`);
  });

  it('should render correct loading state', () => {
    const { enzymeWrapper } = setup({
      value: 11,
      isLoading: true,
      isError: false,
    })

    expect(enzymeWrapper.find('h3').text()).toBe('Counter is loading');
    expect(enzymeWrapper.find('div > div').length).toBe(0);
  });

  it('should render correct error state', () => {
    const { enzymeWrapper } = setup({
      value: 12,
      isLoading: false,
      isError: true,
    })

    expect(enzymeWrapper.find('h3').text()).toBe('An error occured – reload the page and try again');
    expect(enzymeWrapper.find('div > div').length).toBe(0);
  });

  it('should call increment on button click', () => {
    const { enzymeWrapper, props } = setup({
      value: 13,
      isLoading: false,
      isError: false,
    })

    enzymeWrapper.find('button').first().simulate('click');

    expect(props.increment.calls.length).toBe(1);
  });

  it('should call decrement on button click', () => {
    const { enzymeWrapper, props } = setup({
      value: 14,
      isLoading: false,
      isError: false,
    })

    enzymeWrapper.find('button').last().simulate('click');

    expect(props.decrement.calls.length).toBe(1);
  });
});
