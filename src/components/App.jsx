import { useState } from 'react';
import { AppContainer } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchFormSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={onSearchFormSubmit} />
      <ImageGallery query={searchQuery} />
      <ToastContainer autoClose={3000} theme="colored" />
    </AppContainer>
  );
};

export default App;
