import { useState, useEffect } from 'react';
import api from '../services/api';

export const usePortfolioData = (dataType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        
        switch (dataType) {
          case 'personal':
            result = await api.getPersonalData();
            break;
          case 'skills':
            result = await api.getSkills();
            break;
          case 'experience':
            result = await api.getExperience();
            break;
          case 'projects':
            result = await api.getProjects();
            break;
          case 'education':
            result = await api.getEducation();
            break;
          default:
            throw new Error(`Unknown data type: ${dataType}`);
        }
        
        setData(result);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${dataType}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  return { data, loading, error };
};
