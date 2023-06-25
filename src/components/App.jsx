// import { useEffect, useState, useRef } from 'react';
// import { fetchSearch } from './api.js';
// import { SearchBar } from './searchBar/searchBar.jsx';
// import { ImageGallery } from './imageGallery/imageGallery.jsx';
// import { HTTP_ERR_MSG } from './constants';
// import { LoadMore } from './imageGallery/loadMore';
// import { Audio } from 'react-loader-spinner';
// import { ErrorMessage } from './searchBar/errorMessage';
// import { Notify } from 'notiflix';

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setloading] = useState(false);
//   const [error, setError] = useState(null);
//   const [input, setInput] = useState('');
//   const [pages, setPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const abortCtrl = useRef(null);

//   const onSearch = onInput => {
//     setInput(onInput);
//   };
//   useEffect(() => {
//     async function getImages() {
//       if (input === '' || pages === 1) {
//         setImages([]);
//         setPages(1);
//       }

//       try {
//         setloading(true);
//         setError(null);
//         abortCtrl.current = new AbortController();

//         const fetchedImages = await fetchSearch(
//           abortCtrl.current,
//           input,
//           pages
//         );
//         if (fetchedImages.totalhits) {
//           Notify.info(`Hooray! We found ${fetchedImages.totalHits} images.`);
//         }
//         setImages((prevImages) => [
//           ...prevImages,
//           ...fetchedImages.hits.map(
//             ({ tags, id, largeImageURL, webformatURL }) => ({
//               tags,
//               id,
//               largeImageURL,
//               webformatURL,
//             })
//           ),
//         ]);
//         // setImages(
//         //   [
//         //     ...images,
//         //     ...fetchedImages.hits.map(
//         //       ({ tags, id, largeImageURL, webformatURL }) => ({
//         //         tags,
//         //         id,
//         //         largeImageURL,
//         //         webformatURL,
//         //       })
//         //     ),
//         //   ],
//         if (pages !== 1) {
//           window.scrollBy({
//             top: 330 * 3,
//             behavior: "smooth",
//           });
//         }

//         setIsLoading(true);
//         if (fetchedImages.hits.length < 12) {
//           setIsLoading(false);
//           Notify.failure('Sorry, that is all results.');
//         }
//       } catch (error) {
//         if (error.code !== 'ERR_CANCELED') {
//           setError(HTTP_ERR_MSG);
//         }
//       } finally {
//         setloading(false);
//       }
//     }
//     getImages();

//     return () => {
//       if (abortCtrl.current) {
//         abortCtrl.current.abort();
//       }
//     };
//   }, [ input, pages]);

//   const addPages = () => {
//     setPages(prevPages => prevPages + 1);
//   };

//   return (
//     <div
//       style={{
//         width: 'auto',
//         display: 'block',
//         fontSize: '40px',
//         margin: 'auto',
//       }}
//     >
//       <SearchBar onInput={onSearch} />
//       {loading && (
//         <Audio
//           width="auto"
//           height="80"
//           radius="9"
//           color="yellow"
//           ariaLabel="loading"
//           wrapperStyle
//           wrapperClass
//         />
//       )}
//       <ImageGallery images={images} />

//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       {isLoading && <LoadMore onClick={addPages} />}
//     </div>
//   );
// };

//________________________________________________________________________________________________________________________
// class App1 extends Component {
//   abortCtrl;
//   state = {
//     images: [],
//     loading: false,
//     error: null,
//     input: "",
//     pages: 1,
//     isLoading: false
//   };

//   onSearch = (onInput) => {
//     this.setState({ input: onInput });
//   };

//   async componentDidUpdate(_, nextState) {
//     if (
//       this.state.input === nextState.input &&
//       this.state.pages === nextState.pages
//     ) {
//       return;
//     }
//     if (this.state.input !== nextState.input) {
//       this.setState({
//         images: [],
//         pages: 1,
//       });
//     }

//     try {
//       const { input, pages } = this.state;
//       this.abortCtrl = new AbortController();
//       this.setState({ loading: true, error: null });

//       const fetchedImages = await fetchSearch(this.abortCtrl, input, pages);
//       if (fetchedImages.totalhits) {
//         Notify.info(`Hooray! We found ${fetchedImages.totalHits} images.`);
//       }
//       this.setState(
//         (prevImages) => ({
//           images: [
//             ...prevImages.images,
//             ...fetchedImages.hits.map(
//               ({ tags, id, largeImageURL, webformatURL }) => ({
//                 tags,
//                 id,
//                 largeImageURL,
//                 webformatURL,
//               })
//             ),
//           ],
//           isLoading: true,
//         }),
//         () => {
//           if (pages !== 1)
//             window.scrollBy({
//               top: 330 * 3,
//               behavior: "smooth",
//             });
//         }
//       );
//       if (fetchedImages.hits.length < 12) {
//         this.setState({
//           isLoading: false,
//         });
//         Notify.failure('Sorry, that is all results.');
//       }
//     } catch (error) {
//       if (error.code !== "ERR_CANCELED") {
//         this.setState({ error: HTTP_ERR_MSG });
//       }
//     } finally {
//       this.setState({ loading: false })

//     }
//   }

//   componentWillUnmount() {
//     this.abortCtrl.abort();
//   }

//   addPages = () => {
//     this.setState((prevState) => ({
//       pages: prevState.pages + 1,
//     }));
//   };

//   render() {
//     const { error, images, loading, isLoading } = this.state;
//     return (
//       <div
//         style={{
//           width: "auto",
//           display: "block",
//           fontSize: "40px",
//           margin: "auto",
//         }}>
//         <SearchBar onInput={this.onSearch} />
//         {loading && (
//           <Audio
//             width="auto"
//             height="80"
//             radius="9"
//             color="yellow"
//             ariaLabel="loading"
//             wrapperStyle
//             wrapperClass
//           />
//         )}
//         <ImageGallery images={images} />

//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         {isLoading && <LoadMore onClick={this.addPages} />}
//       </div>
//     );
//   }
// }
import React, { useState, useEffect, useRef } from 'react';
import { fetchSearch } from './api.js';
import { SearchBar } from './searchBar/searchBar.jsx';
import { ImageGallery } from './imageGallery/imageGallery.jsx';
import { HTTP_ERR_MSG } from './constants.jsx';
import { LoadMore } from './imageGallery/loadMore.jsx';
import { Audio } from 'react-loader-spinner';
import { ErrorMessage } from './searchBar/errorMessage.jsx';
import { Notify } from 'notiflix';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
        setIsLoading(true)
        if (fetchedImages.hits.length < 12) {
          setIsLoading(false);
          Notify.failure('Sorry, that is all results.');
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(HTTP_ERR_MSG);
        }
      } finally {
        setLoading(false);
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
      {loading && (
        <Audio
          width="auto"
          height="80"
          radius="9"
          color="yellow"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {images.length > 0 && <ImageGallery images={images} />}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <LoadMore onClick={addPages} />}
    </div>
  );
}
export default App;
