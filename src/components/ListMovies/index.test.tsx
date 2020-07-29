

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { IMovie } from "../../types/movies";
import { shallow } from 'enzyme';
import React from 'react';
// import sinon from 'sinon';
import ListMovies from '../ListMovies'
import Card from '../Card'
configure({ adapter: new Adapter() });

describe('<MyComponent />', () => {
  it('exists many cards', () => {
    const wrapper = shallow(<ListMovies />);
    expect(wrapper.find('.card')).toHaveLength
  });
  it('simulate checked the options', () => {
    const movie : IMovie = {
      id: 'tt01',
      titulo: 'Filme 01',
      ano: 2020,
      nota: 8.6,
      checked: false
    }
    const handleChangeMovieSelect = sinon.spy();
    const wrapper = shallow(<Card movieIndex={0} totalMovieSelected={8} movie={movie} handleChangeMovieSelect={handleChangeMovieSelect} />);
    wrapper.find('.card').simulate('click');
    expect(handleChangeMovieSelect).not.toBeFalsy
  });
});