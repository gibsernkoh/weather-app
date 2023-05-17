import { useReducer, createContext } from 'react'

import { ReactChildNode, FinalWeather, WeatherContextProps } from '@/Shared/types'
import { getInitialFinalWeatherState } from '@/Shared/utility'

export const initialState: FinalWeather = getInitialFinalWeatherState()

const reducer = (state: FinalWeather, action: FinalWeather) => {
    const n_state = { ...state, ...action }

    return n_state
}

export const WeatherContext = createContext<WeatherContextProps|null>(null)


export const WeatherContextProvider = ({ children }: ReactChildNode) => {
    const [weather, dispatch] = useReducer(reducer, initialState)

    const weatherDispatch = (action: FinalWeather) => dispatch(action)

    return (
        <WeatherContext.Provider value={{ weather, weatherDispatch }}>
            {children}
        </WeatherContext.Provider>
    )
}

