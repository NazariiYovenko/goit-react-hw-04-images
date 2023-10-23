import { AppContainer } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
export class App extends Component {
  state = { searchQuery: '' };

  onSearchFormSubmit = newSearchQuery => {
    this.setState({ searchQuery: newSearchQuery });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <ImageGallery query={this.state.searchQuery} />
        <ToastContainer autoClose={3000} theme="colored" />
      </AppContainer>
    );
  }
}
