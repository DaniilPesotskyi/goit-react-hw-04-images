import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

const Searchbar = ({onSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('')

  const onInputChange = e => {
    setSearchQuery(e.target.value)
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('The search field is empty!');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('')
  };
  return (
    <header className={css.pageHeader}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={onInputChange}
          value={searchQuery}
          placeholder="Search images and photos"
        />

        <button type="submit" className={css.SearchFormButton}>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
