import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPhotos();
  }, [page]);

  function getPhotos() {
    debugger;
    const baseURL = `https://api.unsplash.com`;
    const endpoint = query
      ? `/search/photos?query=${query}&page=${page}`
      : `/photos?page=${page}`;
    fetch(`${baseURL}${endpoint}&client_id=${accessKey}`)
      .then((res) => res.json())
      .then((data) => {
        const dataFromApi = data.results ?? data;
        const resetImages = page === 1 ? true : false;
        setImages((images) => dataFromApi);
      })
      .catch(console.error);
  }

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  if (!accessKey) {
    return (
      <a href='https://unsplash.com/developers' className='error'>
        Required: Get your API key here.
      </a>
    );
  }

  return (
    <div className='app'>
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input
          type='text'
          placeholder='Search Unsplash...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          setPage((page) => page + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className='image-grid'>
          {images.map((image, index) => (
            <a
              className='image'
              key={index}
              href={image.links.html}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
