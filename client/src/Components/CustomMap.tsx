import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Buttons } from './ui/Buttons';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props{
    user1:[number, number]
    user2:[number, number]
}

const CustomMap:React.FC<Props> = ({ user1, user2 }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/obscuremd/clzih0by900iy01qwbfu595vc',
      center: [0, 0],
      zoom: 2,
    });

    map.on('load', () => {
      setMap(map);
      map.resize();

      new mapboxgl.Marker().setLngLat(user1).addTo(map);
      new mapboxgl.Marker().setLngLat(user2).addTo(map);

      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [user1, user2],
          },
          properties:{}
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#34a181',
          'line-width': 2,
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(user1);
      bounds.extend(user2);
      map.fitBounds(bounds, { padding: 50 });
    });
  };

  useEffect(() => {
    if (!map) initializeMap();
  }, [user1, user2]);

  return (
    <div className='w-[90%] flex flex-col items-center gap-5'>
      <Buttons bg text='Locate' func={initializeMap} />
      <div ref={mapContainer} className='w-full h-[70vh] rounded-lg opacity-75' />
    </div>
  );
};

export default CustomMap;


