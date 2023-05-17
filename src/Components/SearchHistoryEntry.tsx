import { SearchAction, FinalWeather } from "@/Shared/types"
import { getWeatherData, getFinalWeather } from "@/Shared/utility"

import {
    MagnifyingGlassIcon,
    TrashIcon
} from "@heroicons/react/24/solid"

type Props = {
    id: string
    index: number;
    city: string;
    loading: boolean
    countryCode: string;
    searchTime: string;
    searchDispatch: (action: SearchAction) => void
    weatherDispatch: (action: FinalWeather) => void
}

const SearchHistoryEntry = (props: Props) => {
    
    const {
        id,
        index, 
        city, 
        countryCode, 
        searchTime,
        searchDispatch,
        weatherDispatch
    } = props;

    const onSearchClick = () => {
        searchDispatch({
            type: 'quickSearch',
            city,
            countryCode,
            loading: true
        } as SearchAction)

        getWeatherData(city, countryCode)
            .then(weatherData => {
                const finalWeather = getFinalWeather(weatherData)

                searchDispatch({ type: 'updateHistory', finalWeather })
                weatherDispatch(finalWeather)
            })
    }

    const onDeleteClick = () => searchDispatch({ type: 'removeHistory', id } as SearchAction)

    return (
        <tr className="align-text-top">
            <td width={1}>{index}.</td>
            <td>
                <div className="flex flex-col justify-between gap-1 md:gap-2 md:flex-row">
                    <div>{city},{countryCode}</div>
                    <div className="text-[0.9rem] opacity-50">{searchTime}</div>
                </div>
            </td>
            <td width={1}>
                <div className="flex gap-2">
                    <button className="search-history-btn primary-btn" title="Quick Search" onClick={onSearchClick}><MagnifyingGlassIcon/></button>
                    <button className="search-history-btn secondary-btn" title="Remove Record" onClick={onDeleteClick}><TrashIcon/></button>
                </div>
            </td>
        </tr>
    )
}

export default SearchHistoryEntry