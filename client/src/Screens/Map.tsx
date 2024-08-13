import { SendDiagonal } from 'iconoir-react'
import CustomMap from '../Components/CustomMap'
import { CircleIconButtons } from '../Components/ui/Buttons'
import { fetchCoordinates } from '../hooks/fetchCordinates'
import { SetStateAction, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:8800');

console.log(socket)

interface MessageData {
  data: string;
  cord: [number, number];
}

const Map = () => {


      const [current, setCurrent] = useState('')
      const [to, setTo] = useState<MessageData | null>(null);
      const [room, setRoom] = useState('')
      
      const [currentCord, setCurrentCord] = useState<[number, number]>([3.393999,6.454811])

      console.log(currentCord)

      const getCurrent = async (e: { target: { value: SetStateAction<string> } }) => {
        setCurrent(e.target.value)
        const coordinates = await fetchCoordinates(current);
        setCurrentCord(coordinates);
      };

      const joinRoom = () =>{
        if(room !== ""){
          socket.emit("joinRoom",room)
        }
      }

      const sendMessage =async()=>{
        socket.emit('sendMessage',{
          data:current,
          cord:currentCord,
          room
        })
      }

      useEffect(()=>{
        socket.on('receiveMessage',(data)=>{
          setTo(data)
          console.log(data)
        })
      },[socket])

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
        <div className='flex flex-col w-full justify-center gap-[20%] px-10'>
            {/* Current Location */}
            <div>
              <p className='text-title2 font-semibold'>Key</p>
              <div className='flex items-center gap-2'>
                <input type="text" onChange={(e)=>setRoom(e.target.value)} />
                <CircleIconButtons icon={<SendDiagonal/>} func={joinRoom}/>
              </div>
            </div>
            <div>
              <p className='text-title2 font-semibold'>Current</p>
              <div className='flex items-center gap-2'>
                <input type="text" onChange={getCurrent} />
                <CircleIconButtons icon={<SendDiagonal/>} func={sendMessage}/>
              </div>
            </div>
            
            <p>{to?.data}</p>
        </div>
        <CustomMap user1={currentCord} user2={to?.cord || [0, 0]} />
    </div>
  )
}

export default Map