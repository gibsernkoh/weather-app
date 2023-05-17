import { useContext } from "react"
import { SearchContext } from "@/Context/search"
import { WeatherContext } from "@/Context/weather"
import { WeatherContextProps, SearchContextProps, SearchHistory } from "@/Shared/types"
import SearchHistoryEntry from "./SearchHistoryEntry"


const SearchHistoryList = () => {
  const searchContext = useContext(SearchContext) as SearchContextProps
  const wetherContext = useContext(WeatherContext) as WeatherContextProps
  
  const { searchQuery, searchDispatch } = searchContext
  const { history = [], loading = false } = searchQuery

  const { weatherDispatch } = wetherContext

  let index = 0;

  return (
    <table className="search-history-list border-collapse w-full">
      <tbody>
        {history.length > 0 ? 
          history.map((h: SearchHistory) => {
            index += 1;
            return <SearchHistoryEntry 
                        key={h.id} 
                        loading={loading}
                        index={index} {...h} 
                        searchDispatch={searchDispatch} 
                        weatherDispatch={weatherDispatch}/>
          }):
          (<tr><td className="text-center">No Record</td></tr>)
        }
      </tbody>
    </table>
  )
}

export default SearchHistoryList