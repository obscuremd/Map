
    import React, { useState, useEffect, RefObject } from 'react';
    import mapboxgl, {Map} from 'mapbox-gl';

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

    const CustomMap = () => {
    const [map, setMap] = useState<Map | null>(null);
    const mapContainer = React.useRef<HTMLDivElement>(null);

    // User coordinates [longitude, latitude]
    const user1: [number, number] = [6.7297071, 6.1858825];
    const user2: [number, number] = [3.325952, 6.476531];

    useEffect(() => {
        const initializeMap = ({
            setMap,
            mapContainer,
          }: {
            setMap: React.Dispatch<React.SetStateAction<Map | null>>;
            mapContainer: RefObject<HTMLDivElement>;
          }) => {

        if (!mapContainer.current) return; // Ensure the map container exists
            
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/obscuremd/clzih0by900iy01qwbfu595vc',
            center: [0, 0],
            zoom: 2,
        });

        map.on('load', () => {
            setMap(map);
            map.resize();

            // Add markers
            new mapboxgl.Marker().setLngLat(user1).addTo(map);
            new mapboxgl.Marker().setLngLat(user2).addTo(map);

            // Add a line between users
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

            // Fit the map to the bounds of the two coordinates
            const bounds = new mapboxgl.LngLatBounds();
            bounds.extend(user1);
            bounds.extend(user2);
            map.fitBounds(bounds, { padding: 50 });
        });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map, user1, user2]);

    return(
            <div ref={mapContainer} className='w-[90%] h-[70vh]  rounded-lg opacity-75'/>
    );
    };

    export default CustomMap;

