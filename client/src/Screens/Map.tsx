import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { Buttons } from "../Components/ui/Buttons"
import Loader from '../Screens/Loader'
import { Forward, MapPin } from "iconoir-react"
import { useEffect, useRef, useState } from "react"
import { copyToClipboard, key } from '../hooks/CopyToClipBoard'
import io from 'socket.io-client'

const Map = () => {
  const socket = io('http://localhost:8800'); // Ensure that the socket server is running
 
  // chat functions -----------------------------------------------------------------------------------------------------------------------------------------
  const origin = useRef<HTMLInputElement | null>(null)
  
  const [receiveMessage, setReceiveMessage] = useState('')

  const [chatKey, setChatKey] = useState(key)

  const sendMessage =async()=>{
    const message = origin.current?.value
      if (chatKey !== "") {
          alert(message)
          console.log(message)
          socket.emit("sendMessage", { message, chatKey }); // Send to the room with chatKey
      }
  }

  useEffect(() => {
      // Only join the room when chatKey exists
      if (chatKey !== "") {
          socket.emit("joinRoom", chatKey);
      }
  }, [chatKey]);


    // Extract chatKey from URL when component mounts
  useEffect(() => {
      const getKey = () => {
      const params = new URLSearchParams(window.location.search);
      const newKey = params.get('chatKey');
      if (newKey) {
          setChatKey(newKey); // Set the chatKey from the URL
          console.log("new key:"+newKey)
      }
      };
      getKey();
  }, []);

  useEffect(()=>{
      socket.on("receiveMessage",(data)=>{
          console.log("receiveMessage:",data)
          setReceiveMessage(data)
      })
  },[socket])


  // location functions---------------------------------------------------------------------------------------------------------------------------------------
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [directionResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const destination = receiveMessage
  
  const calculateRoute = async () => {
    if (!origin.current?.value || !destination) {
      alert('Please enter both origin and destination');
      return;
    }

    const directionService = new google.maps.DirectionsService()
    
    const results = await directionService.route({
      origin: origin.current?.value,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance?.text || '')
    setDuration(results.routes[0].legs[0].duration?.text || '')
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'marker']
  })

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({lat:latitude,lng:longitude});
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };
    getUserLocation()
  }, [])

  // ------------------------------------------------------------------------------------------------------------------------------------------------



  if (!isLoaded) {
    return <Loader />
  }

  if (!location) {
    return <Loader />
  }

  return (
    <div>
      <div className="flex flex-col gap-5 pl-[3%] pr-[30%]">
        <div className="flex gap-5 ">
          <Autocomplete><input ref={origin} /></Autocomplete>
          <Buttons border icon={<Forward />} func={sendMessage} />
          <Buttons bg text="locate" func={calculateRoute} />
          <Buttons bg text="Copy Link" func={() => copyToClipboard()} />

          {/* Display sent and received messages */}
          <div className="flex gap-2 items-center">
            {receiveMessage ? <p>Received: {receiveMessage}</p> : <p>waiting for Destination ...</p>}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>ETA: {duration}</p>
          <p>Distance: {distance}</p>
          <Buttons border icon={<MapPin />} func={() => map?.panTo(location)} />
        </div>
      </div>
      <GoogleMap center={location} zoom={15} mapContainerStyle={{ width: "100%", height: "100vh" }} onLoad={map => setMap(map)}>
        <Marker position={location} />
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
      </GoogleMap>
    </div>
  )
}

export default Map
