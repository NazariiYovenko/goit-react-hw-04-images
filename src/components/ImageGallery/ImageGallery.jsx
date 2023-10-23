import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryWrapper, Message } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import { fetchGalleryImages } from 'services/apiGalery';
import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    error: false,
    totalHits: 0,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const prevQuery = prevProps.query;
    const { page } = this.state;
    const prevPage = prevState.page;

    if (prevQuery !== query) {
      this.setState({ loading: true, page: 1, gallery: [] });
      if (page === 1) {
        this.fetchImages(query, page);
      }
    } else if (prevPage !== page) {
      this.setState({ loading: true });
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      const gallery = await fetchGalleryImages(query, page);
      const { hits, totalHits } = gallery;
      if (!hits.length) {
        return toast.warn('Please, enter correct search word!');
      }
      const newItems = hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...newItems],
        totalHits,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: true, totalHits: 0 });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, loading, gallery, totalHits } = this.state;
    const { query } = this.props;
    return (
      <>
        {query === '' && (
          <Message>Please enter a word to start the search</Message>
        )}

        {!error && (
          <>
            <ImageGalleryWrapper>
              {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  largeImageURL={largeImageURL}
                  webformatURL={webformatURL}
                  tags={tags}
                />
              ))}
            </ImageGalleryWrapper>
            {gallery.length < totalHits && gallery.length !== 0 && (
              <Button onClick={this.loadMore} />
            )}
          </>
        )}

        {loading && <Loader />}

        {error && <Message>Oops ... Something goes wrong </Message>}
      </>
    );
  }
}
