import axios from 'axios'

const token = import.meta.env.VITE_MAPBOX_TOKEN

export const fetchCoordinates = async (place:string) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${token}`);
      const data = response.data;
      console.log(data.features[0].geometry.coordinates)
      if (data.features && data.features.length > 0) {
        return data.features[0].geometry.coordinates;
        
      } else {
        throw new Error('No coordinates found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return [0, 0];
    }
  };