import axios from "axios"
import { useContext, createContext, useEffect,useState } from "react"

const StateContext = createContext()

export const StateContextProvider = ({children}) =>{
    const [weather, setWeather] = useState({})

    const [values, setValues] = useState([])

    const [place, setPlace] = useState('Indore')

    const [location, setLocation] = useState([])


    //feetch api
    const fetchWeather = async() =>{
        
        const options ={
            method: 'GET',
            
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast', // Correct URL

            
            params:{
                aggregateHours: '24',

                location: place,

                contentType: 'json',

                unitGroup: 'metric',

                shortColumnNames: 0,
            },
            
            headers: {
                
                'X-RapidAPI-Key' : import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host' : 'visual-crossing-weather.p.rapidapi.com'

            }
        } 

        try {
            
            const response  = await axios.request(options)

            console.log(response.data)

            const thisData = Object.values(response.data.locations)[0]

            setLocation(thisData.address)

            setValues(thisData.values)

            setWeather(thisData.value[0])

        } catch (e) {

            console.error(e)

            alert('This Place Does Not Exist')
            
        }
    }

    useEffect(()=> {

        // fetchWeather()

    }, [place])

useEffect(()=>{

    console.log(values)

},[values])

    return (
        <StateContext.Provider value={{

            weather,
            
            setPlace,
            
            values,
            
            location

        }}>
            
            {children}

        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)