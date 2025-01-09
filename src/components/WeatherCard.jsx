import React, { useEffect, useState } from 'react'
import {useDate} from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import rain from '../assets/icons/rain.png'
import storm from '../assets/icons/storm.png'
import windy from '../assets/icons/windy.png'
import snow from '../assets/icons/snow.png'
import  './index.css'
const WeatherCard = ({

  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,

}) => {

  const [icon, setIcon] = useState(sun)

  const {time} = useDate()

  useEffect(()=>{

    if(iconString){
      if(iconString.toLowerCase().includes('cloud')){

        setIcon(cloud)
      }
      else if(iconString.toLowerCase().includes('rain')){

        setIcon(rain)
      }
      else if(iconString.toLowerCase().includes('clear')){

        setIcon(sun)
      }else if(iconString.toLowerCase().includes('thunder')) {

        setIcon(storm)}
        
        else if(iconString.toLowerCase().includes('fog')){

          setIcon(fog)}
          else if(iconString.toLowerCase().includes('snow')){

            setIcon(snow)}

            else if(iconString.toLowerCase().includes('wind')){

              setIcon(windy)} 
    }

  }, [iconString])

  return (
    <div className='w=[22rem] min-w-[22rem] h-[30rem] glasscard p-4'>
      
      <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
        
        <img src={icon} alt="weather_icon" />

        <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>

        {place}

      </div>

      <div className='w-full flex justify-between items-center mt-4'>

        {/* <p>{new Date().toDateString()}</p> */}

      </div>
    </div>
  )
}

export default WeatherCard