import CustomMap from '../Components/CustomMap'
import { fetchCoordinates } from '../hooks/fetchCordinates'
import { SetStateAction, useState } from 'react'


const Map = () => {


      const [current, setCurrent] = useState('')
      const [to, setTo] = useState('')
      
      const [currentCord, setCurrentCord] = useState<[number, number]>([3.393999,6.454811])
      const [toCord, setToCord] = useState<[number, number]>([6.2747786,4.9334651])

      console.log(currentCord)
      console.log(toCord)

     
      
      const getCurrent = async (e: { target: { value: SetStateAction<string> } }) => {
        setCurrent(e.target.value)
        const coordinates = await fetchCoordinates(current);
        setCurrentCord(coordinates);
      };

      const getTo = async (e: { target: { value: SetStateAction<string> } }) => {
        setTo(e.target.value)
        const coordinates = await fetchCoordinates(to);
        setToCord(coordinates);
      };

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
        <div className='flex w-full justify-center gap-[20%]'>
            {/* Current Location */}
            <div>
              <p className='text-title2 font-semibold'>Current</p>
              <div className='flex items-center gap-2'>
                <input type="text" onChange={getCurrent} />
              </div>
            </div>
            {/* Set Location */}
            <div>
              <p className='text-title2 font-semibold'>To</p>
              <div className='flex items-center gap-2'>
                <input type="text" onChange={getTo} />
              </div>
            </div>
        </div>
        <CustomMap user1={currentCord} user2={toCord}/>
    </div>
  )
}

export default Map