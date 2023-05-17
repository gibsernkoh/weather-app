import { ReactNode } from 'react'

export type ReactChildNode = {
    children: ReactNode
}

export type IDs = 'countryCode' | 'city' | 'loading'

export type SearchContextProps = {
    searchQuery: SearchQuery;
    searchDispatch: (action: SearchAction) => void
}

export type SearchHistory = {
    id: string
    city: string
    countryCode: string
    searchTime: string
}

export interface SearchQuery {
    city?: string
    countryCode?: string
    loading?: boolean
    history?: SearchHistory[]
}

export interface SearchAction extends SearchQuery {
    type: string
    id?: string
    finalWeather: FinalWeather
}

export type Weathers = {
    main: string
    description: string
    icon: string
}

export type OpenWeatherMapRes = {
    weather: Weathers[]
    main: {
        temp_min: number
        temp_max: number
        humidity: number
    }
    sys: {
        country: string
    }
    name: string
    timezone: number
    cod: number
    message?: string
}

export type FinalWeather = {
    mainWeather: string
    description: string
    tempMin: number
    tempMax: number
    humidity: number
    name: string
    country: string
    datetime: string
    cod: number
    message: string
    icon: string
}

export type WeatherContextProps = {
    weather: FinalWeather,
    weatherDispatch: (action: FinalWeather) => void
}