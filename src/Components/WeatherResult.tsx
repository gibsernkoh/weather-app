import { useContext } from "react"
import { WeatherContextProps } from '@/Shared/types'
import { WeatherContext } from '@/Context/weather'
import { capitalizeFirstLetter } from "@/Shared/utility"
import { InformationCircleIcon } from "@heroicons/react/20/solid"

const WeatherResult = () => {
    const weatherContext = useContext(WeatherContext) as WeatherContextProps
    const { weather } = weatherContext
    const {
        mainWeather,
        description,
        tempMin,
        tempMax,
        humidity,
        name,
        country,
        datetime,
        cod,
        icon,
        message
    } = weather

    if (cod === 0) {
        return null
    } else if (cod === 200) {
        return (
            <div>
                <div className="flex items-center">
                    <div className="basis-[6.25rem] aspect-square">
                        <img src={icon} alt={description} />
                    </div>
                    <div>
                        <div className="opacity-70 text-[0.9rem]">{name}, {country}</div>
                        <div className="text-[1.8rem] font-bold">{mainWeather}</div>
                    </div>
                </div>
                
                <table className="weather-summary">
                    <tbody>
                        <tr>
                            <td>Description:</td>
                            <td>{capitalizeFirstLetter(description)}</td>
                        </tr>
                        <tr>
                            <td>Temperature:</td>
                            <td>{tempMin}&#8451; ~ {tempMax}&#8451;</td>
                        </tr>
                        <tr>
                            <td>Humidity:</td>
                            <td>{humidity}&#x25;</td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td>{datetime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className="py-3">
                <div className="bg-blue-500/80 text-white w-[300px] max-w-full border-sky-100 border px-3 py-2 rounded-md flex gap-3">
                    <InformationCircleIcon className="w-[1.2rem]" />
                    {capitalizeFirstLetter(message)}
                </div>
            </div>
        )
    }

}

export default WeatherResult