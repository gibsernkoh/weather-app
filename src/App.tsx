import './App.tw.css';

import SearchWeatherForm from '@/Components/SearchWeatherForm'
import SearchHistoryList from '@/Components/SearchHistoryList';
import WeatherResult from '@/Components/WeatherResult'

import SectionTitle from '@/Scenes/SectionTitle'

import { SearchContextProvider } from '@/Context/search'
import { WeatherContextProvider } from '@/Context/weather'

const App = () => (
  <SearchContextProvider>
    <WeatherContextProvider>
      <div className="py-5 container px-5 mx-auto gap-6">

        <div className="flex flex-col">
          <SectionTitle>Today's Weather</SectionTitle>
          <div className='flex flex-col gap-3 md:flex-row md:justify-between lg:justify-start lg:gap-12'>
            <SearchWeatherForm />
            <WeatherResult />
          </div>
        </div>

        <div className="flex flex-col py-12">
          <SectionTitle>Search History</SectionTitle>
          <SearchHistoryList />
        </div>

      </div>
    </WeatherContextProvider>
  </SearchContextProvider>
);

export default App;
