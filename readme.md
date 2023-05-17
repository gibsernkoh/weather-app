## Today's Weather

  - This is a simple React.js app that search for the weather based on City and Country.
  - It utilize [Open Weather Map (Free Tier) ](https://openweathermap.org/api) to obtain weather information.
  - Site is code up with 
	  - Tailwindcss for programmable styling
	  - Typescript for type safety checks
	  - ViteJs bundler
	  - [Heroicons](https://heroicons.com/) for icon selections

### To Run
- Run `npm i`
- Create an `.env` file and copy the below and paste it in.
    ```
        VITE_OPEN_WEATHER_MAP_APPID=802c67980ed29dc4d9dbd12e059dbbf2
        VITE_OPEN_WEATHER_MAP_UNIT=metric
        VITE_DEFAULT_CITY=
        VITE_DEFAULT_COUNTRY_CODE=
        VITE_DEFAULT_ICON=01d
    ```
- Run `npm run dev` to start dev
- Run `npm run build` to build into production
- Run `npm run preview`  to preview build

### Notes
- City and Country are assumed to be unlikely to change but to maintain some flexibility, the Country is coded to to a `select` dropdown menu while the city remain as a `input` box.
- The Dropdown country list is downloaded via npm.
- The `clear` button, I assume it to clear the `filter values` but if feels odd to not clear the weather result. So weather result were cleared along while remaining the search history.
- The Weather Result is quite plain and notice that Open Weather Map API do have their own icon for individual weather so it maybe a good addition to include into the Frontend design for some illustration.
- The `dt` field from Open Weather Map API response doesn't seem to be a *Live Date Time*. An alternative way to calculate the date time base on the timezone differences has to be implemented.
- Decided to use hero icons as its' icons are in svg format (won't blur)
- Readjusting the layout by aligning the search form and weather result for pc users.