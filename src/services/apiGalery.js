import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';

export async function fetchGalleryImages(query, page) {
  const PARAMS = new URLSearchParams({
    q: `${query}`,
    page: `${page}`,
    key: '33013625-015f9d261f712aba654b673d5',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const API = baseURL + '?' + PARAMS;
  const response = await axios.get(API);
  return response.data;
}
