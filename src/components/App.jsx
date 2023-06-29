import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix';

import { fetchSearch } from './api.js';
import { SearchBar } from './searchBar/searchBar.jsx';
import { ImageGallery } from './imageGallery/imageGallery.jsx';
import { HTTP_ERR_MSG } from './constants.jsx';
import { LoadMore } from './imageGallery/loadMore.jsx';
import { ErrorMessage } from './searchBar/errorMessage.jsx';

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const abortCtrl = useRef(null);

  const onSearch = onInput => {
    setInput(onInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (input === '' || pages === 1) {
        setImages([]);
        setPages(1);
      }

      try {
        abortCtrl.current = new AbortController();
        setError(null);

        const fetchedImages = await fetchSearch(
          abortCtrl.current,
          input,
          pages
        );

        if (fetchedImages.totalHits) {
          Notify.info(`Hooray! We found ${fetchedImages.totalHits} images.`);
        }

        setImages(prevImages => [
          ...prevImages,
          ...fetchedImages.hits.map(
            ({ tags, id, largeImageURL, webformatURL }) => ({
              tags,
              id,
              largeImageURL,
              webformatURL,
            })
          ),
        ]);

        if (pages !== 1) {
          window.scrollBy({
            top: 330 * 3,
            behavior: 'smooth',
          });
        }
        setIsLoading(true);
        if (fetchedImages.hits.length < 12) {
          setIsLoading(false);
          Notify.failure('Sorry, that is all results.');
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(HTTP_ERR_MSG);
        }
      } finally {
        // setLoading(false);
      }
    };
    if (input) {
      fetchData();
    }

    return () => {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
    };
  }, [input, pages]);

  const addPages = () => {
    setPages(prevPages => prevPages + 1);
  };

  console.log('input', input);
  return (
    <div
      style={{
        width: 'auto',
        display: 'block',
        fontSize: '40px',
        margin: 'auto',
      }}
    >
      <SearchBar onInput={onSearch} />
      {/* {loading && (
        <Audio
          width="auto"
          height="80"
          radius="9"
          color="yellow"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )} */}
      {images.length > 0 && <ImageGallery images={images} />}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadMore onClick={addPages} />}
    </div>
  );
}
export default App;
