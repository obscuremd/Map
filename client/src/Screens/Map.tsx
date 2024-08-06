import React from 'react'
import CustomMap from '../Components/CustomMap'
import { fetchCoordinates } from '../hooks/fetchCordinates'


const Map = () => {

      fetchCoordinates('delta state, Nigeria')

  return (
    <div className='flex justify-center items-center'>
        <CustomMap/>
    </div>
  )
}

export default Map