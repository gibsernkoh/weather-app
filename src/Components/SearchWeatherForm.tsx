import { ChangeEvent, KeyboardEvent, useContext } from 'react'

import { getData } from 'country-list'

import { getWeatherData, getFinalWeather } from '@/Shared/utility'
import { IDs, SearchAction, SearchContextProps, WeatherContextProps } from '@/Shared/types'

import { SearchContext } from '@/Context/search'
import { initialState as weatherInitialState, WeatherContext } from '@/Context/weather'

const countries = getData()

export default () => {
    const searchContext = useContext(SearchContext) as SearchContextProps
    const weatherContext = useContext(WeatherContext) as WeatherContextProps

    const { weatherDispatch } = weatherContext
    const { searchQuery, searchDispatch } = searchContext
    const { city, countryCode, loading } = searchQuery

    const onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {

        const id = e.currentTarget.id as IDs
        const value = e.currentTarget.value

        if (id && value !== undefined) {
            if (id === 'city')
                searchDispatch({ type: 'change', city: value } as SearchAction)
            else if (id === 'countryCode')
                searchDispatch({ type: 'change', countryCode: value } as SearchAction)
        }
    }


    const onKeyDown = (e: KeyboardEvent<HTMLInputElement|HTMLSelectElement>) => {

        if (e.key === 'Enter' && !loading)
            fetchWeatherData()
    }


    const fetchWeatherData = () => {

        searchDispatch({ type: 'loading', loading: true } as SearchAction)

        getWeatherData(city, countryCode)
            .then(weatherData => {
                const finalWeather = getFinalWeather(weatherData)

                searchDispatch({ type: 'updateHistory', finalWeather })
                weatherDispatch(finalWeather)
            })
    }


    const clearSearchQuery = () => {
        searchDispatch({ type: 'clear', city: '', countryCode: '' } as SearchAction)
        weatherDispatch(weatherInitialState)
    }
    

    return (
        
        <div className="flex flex-col gap-2 py-3">
            <label htmlFor='city'>City</label>
            <input id='city' value={city} onChange={onChange} onKeyDown={onKeyDown} disabled={loading} className='form-input'/>

            <label htmlFor=''>Country</label>
            <select id="countryCode" value={countryCode} onChange={onChange} disabled={loading} className='form-input'>
                <option value='' disabled>Please select</option>
                {countries.map(c => {
                    return <option key={c.code} value={c.code}>{c.name}</option>
                })}
            </select>
            

            <div className="flex justify-end gap-2 mt-4 py-4 border-y-[1px]">
                <button className='form-btn primary-btn btn' 
                        type='button' 
                        disabled={loading} 
                        onClick={fetchWeatherData}>Submit</button>
                        
                <button className='form-btn secondary-btn btn' 
                        type='button' 
                        disabled={loading} 
                        onClick={clearSearchQuery} >Clear</button>
            </div>
        </div>
       
    )
}

