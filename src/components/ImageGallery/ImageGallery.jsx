import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryWrapper, Message } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import { fetchGalleryImages } from 'services/apiGalery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { useEffect, useState } from 'react';

const ImageGallery = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  function reset() {
    setGallery([]);
    setTotalHits(0);
    setPage(1);
    setError(false);
    setLoading(false);
  }

  useEffect(() => {
    reset();
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);

    const fetchImages = async (query, page) => {
      try {
        const gallery = await fetchGalleryImages(query, page);
        const { hits, totalHits } = gallery;
        if (!hits.length) {
          return toast.warn('Please, enter correct search word!');
        }
        if (hits.length === totalHits) {
          return toast.warn('You have viewed the entire list of images!');
        }
        const newItems = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setGallery(prev => [...prev, ...newItems]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error(error.message);
        setError(true);
        reset();
      } finally {
        setLoading(false);
      }
    };

    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {searchQuery === '' && (
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
          {0 < gallery.length && gallery.length < totalHits && !loading && (
            <Button onClick={loadMore} />
          )}
        </>
      )}

      {loading && <Loader />}

      {error && <Message>Oops ... Something goes wrong </Message>}
    </>
  );
};

export default ImageGallery;
