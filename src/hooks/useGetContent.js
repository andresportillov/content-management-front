import { useEffect, useState } from 'react'
import contentService from '../services/contentService';

export const useGetContent = () => {
    const [content, setContent] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (query) => {
      try {
        const response = await contentService.searchByTopicOrName(query);
        setContent(response); // Actualiza el estado del contenido con la respuesta del servicio
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await contentService.list();
          console.log('Fetched content:', response);
          setContent(response || []);
        } catch (err) {
          console.error('Error fetching content:', err);
          setError('Error fetching content. Please try again later.');
        }
      };
  
      fetchData();
    }, []);

  return {
    content,
    handleSearch,
    error
  }
}
