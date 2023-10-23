import { toast } from 'react-toastify';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

import { FaSearch } from 'react-icons/fa';

import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { query } = this.state;
    event.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please, enter correct search word!');
      return;
    }
    this.props.onSubmit(query.trim());
    this.setState({ query: '' });
  };

  render() {
    return (
      <>
        <SearchbarWrapper>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <FaSearch
                style={{ fill: 'darkblue', height: '25px', width: '25px' }}
              />
            </SearchFormButton>

            <SearchFormInput
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </SearchForm>
        </SearchbarWrapper>
      </>
    );
  }
}
