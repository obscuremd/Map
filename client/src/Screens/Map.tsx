
import { useJsApiLoader ,GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api'
import { Buttons } from "../Components/ui/Buttons"
import Loader from '../Screens/Loader'
import { MapPin } from "iconoir-react"
import { useEffect, useRef, useState } from "react"

const Map =()=>{

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [link, setLink] = useState('')
  const [sharedLocation, setSharedLocation] = useState<{ lat: number; lng: number } | null>(null)

  const [map, setMap] = useState<google.maps.Map>()
  const [directionResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const origin = useRef<HTMLInputElement | null>(null)
  const destination = useRef<HTMLInputElement | null>(null)
  console.log(sharedLocation)

  const getSharedLocation =()=>{
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get('lat') || '');
    const lng = parseFloat(params.get('lng') || '');
    
    if (!isNaN(lat) && !isNaN(lng)) {
      setSharedLocation({ lat, lng });
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLink(`${window.location.origin}/map?lat=${latitude}&lng=${longitude}`)
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const calculateRoute =async()=>{
    if (!origin.current?.value || !destination.current?.value) {
      alert('Please enter both origin and destination');
      return;
    }

    const directionService = new google.maps.DirectionsService()
    
    const results = await directionService.route({
      origin: origin.current?.value,
      destination: destination.current?.value,
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance?.text || '')
    setDuration(results.routes[0].legs[0].duration?.text || '')
  }
  
  const {isLoaded} =  useJsApiLoader({ 
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries:['places', 'marker']
  })
  

  useEffect(()=>{
      getSharedLocation()
      getUserLocation()
  },[])


  if(!isLoaded){
    return <Loader/>
  }
  
  if(!location){
    return <Loader/>
  }
  return(
    <div>
        <div className="flex flex-col gap-5 pl-[3%] pr-[50%]">
          <div className="flex gap-5 ">
            <Autocomplete><input ref={origin}/></Autocomplete>
            <Autocomplete><input ref={destination}/></Autocomplete>
            <Buttons bg text="locate" func={calculateRoute}/>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Shareable Link: {link}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <p>ETA: {duration}</p>
            <p>Distance: {distance}</p>
            <Buttons border icon={<MapPin/>} func={()=>map?.panTo(location)}/>
          </div>
        </div>
        <GoogleMap center={location} zoom={15} mapContainerStyle={{width:"100%", height:"100vh"}} onLoad={map => setMap(map)}>
          <Marker position={location} />
          {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
        </GoogleMap>
    </div>
  )
}

export default Map