import { toast } from 'react-toastify';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event =>
    setQuery(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please, enter correct search word!');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <>
      <SearchbarWrapper>
        <SearchForm onSubmit={handleSubmit}>
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
            value={query}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchbarWrapper>
    </>
  );
};

export default Searchbar;
