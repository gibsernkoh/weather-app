import { useReducer, createContext } from 'react'
import { cloneObject, getFinalWeather, getTime } from '@/Shared/utility';
import { ReactChildNode, SearchContextProps, SearchQuery, SearchHistory, SearchAction } from '@/Shared/types';


const env = import.meta.env,
      defaultCity = env.VITE_DEFAULT_CITY,
      defaultCountryCode = env.VITE_DEFAULT_COUNTRY_CODE


export const initialState = {
        city: defaultCity,
        countryCode: defaultCountryCode,
        loading: false,
        history: []
    }

const reducer = (state: SearchQuery, action: SearchAction): SearchQuery => {
    const { type, ...rest } = action

    let responses = cloneObject(state) as SearchQuery;

    if (['change', 'clear', 'quickSearch'].includes(type)) {
        responses = {
            ...responses,
            ...rest
        }
    }
    else if (type === 'loading'){
        const { loading } = action
        responses = {
            ...responses,
            loading
        }
    }
    else if (type === 'updateHistory') {

        const { finalWeather } = rest
        const { history = [] } = state

        const { cod, name, country } = finalWeather

        const newSearchQuery: SearchQuery = { 
            loading: false, 
            city: name, 
            countryCode: country, 
            history: [] 
        }

        if(cod === 200) {
            const id = `${country}-${name.split(' ').join('-')}`
            const newSearchHistory = [...history].filter(h => h.id !== id)

            const nowTime = getTime(new Date(), 'long')
            
            const newSearchEntry: SearchHistory = { 
                id,
                countryCode: country, 
                city: name, 
                searchTime: nowTime 
            }

            newSearchHistory.unshift(newSearchEntry)
            newSearchQuery.history = newSearchHistory
        }

        responses = newSearchQuery
    }
    else if (type === 'removeHistory') {
        const { id } = rest
        const { history = [] } = responses 

        responses.history = history.filter(h => h.id !== id)
    }

    return responses as SearchQuery
}

export const SearchContext = createContext<SearchContextProps|null>(null)


export const SearchContextProvider = ({ children }: ReactChildNode) => {
    const [searchQuery, dispatch] = useReducer(reducer, initialState)
    
    const searchDispatch = (action: SearchAction) => dispatch(action)

    return (
        <SearchContext.Provider value={{ searchQuery, searchDispatch }}>
            {children}
        </SearchContext.Provider>
    )
}