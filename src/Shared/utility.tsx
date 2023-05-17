import { OpenWeatherMapRes, FinalWeather } from '@/Shared/types'

const appId = import.meta.env.VITE_OPEN_WEATHER_MAP_APPID,
      units = import.meta.env.VITE_OPEN_WEATHER_MAP_UNIT,
      defaultIcon = import.meta.env.VITE_DEFAULT_ICON

export const cloneObject = (obj: {} = {}) => Object.assign({}, obj)

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
  
export const getTimezoneDateTime = (utcTimezoneOffset: number): string => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const timezoneTime = utcTime + (utcTimezoneOffset * 1000);
    const timezoneDateTime = new Date(timezoneTime);

    const date = getDate(timezoneDateTime);
    const time = getTime(timezoneDateTime);

    return `${date} ${time}`;
}

export const getDate = (datetime: Date) => {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0');
    const day = String(datetime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const getTime = (datetime: Date, timeFormat: 'short'|'long' = 'short') => {

    let hours = datetime.getHours();
    const minutes = String(datetime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // handle midnight

    let time = `${hours}:${minutes}`

    if(timeFormat === 'long')
        time += `:${datetime.getSeconds()}`

    return `${time} ${ampm}`;
}

export const getWeatherIcon = (icon: string):string => `https://openweathermap.org/img/wn/${icon}@2x.png`

export const getWeatherData = async (city: string = '', countryCode: string = ''): Promise<OpenWeatherMapRes> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}${countryCode ? `,${countryCode}`: ''}&units=${units}&APPID=${appId}`)
    const weatherData = await response.json() as OpenWeatherMapRes;

    return weatherData
}

export const getInitialFinalWeatherState = (overwrite:FinalWeather|{} = {}): FinalWeather => {
    const initialState: FinalWeather = {
        mainWeather: '',
        description: '',
        tempMin: 0,
        tempMax: 0,
        humidity: 0,
        name: '',
        country: '',
        datetime: '',
        cod: 0,
        message: '',
        icon: '',
    }

    return { ...initialState, ...overwrite }
}

export const getFinalWeather = (weatherData: OpenWeatherMapRes): FinalWeather => {

    const {
        cod, 
        message = ''
    } = weatherData

    if (cod === 200) {
        
        const {
            weather,
            main: { temp_min, temp_max, humidity },
            sys: { country },
            name,
            timezone,
        } = weatherData,
        {
            main, description, icon
        } = weather[0],
        datetime = getTimezoneDateTime(timezone)
    
        return {
            mainWeather: main,
            description,
            tempMin: temp_min,
            tempMax: temp_max,
            humidity,
            name,
            country,
            datetime,
            cod: +cod,
            message: '',
            icon: getWeatherIcon(icon)
        }
    }
    else {
        return getInitialFinalWeatherState({
            cod: +cod, 
            message,
            icon: getWeatherIcon(defaultIcon)
        })
    }
    
}