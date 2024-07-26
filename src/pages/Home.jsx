import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// API URL
const apiURL = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,nativeName,tld,currencies,languages,borders,cca3";

export default function Home() {
 const [countries, setCountries] = useState([]); // API Datas
 const [searchInputValue, setSearchInputValue] = useState("");
 const [filterRegionValue, setFilterRegionValue] = useState("");
 const [countrySearchResults, setCountrySearchResults] = useState([]);
 const [loading, setLoading] = useState(true);

 const searchCountryInputRef = useRef(null);
 const filterRegionButtonRef = useRef(null);
 const targetBackToTop = useRef(null);

 // Filter search results based on user search
 const searchHandler = (ref) => {
  setSearchInputValue(ref.value);

  const filteredCountries = countries.filter((country) => {
   return country.name.common.toLowerCase().includes(ref.value.toLowerCase());
  });
  setCountrySearchResults(filteredCountries);
 };

 // Filter search results based on region
 const filterRegionHandler = (ref) => {
  setFilterRegionValue(ref.value);

  const filteredCountriesRegion = countries.filter((country) => {
   return country.region.toLowerCase().includes(ref.value);
  });
  setCountrySearchResults(filteredCountriesRegion);
 }

 // Back to top handler
 const backToTopHandler = (ref) => {
  window.scrollTo({
   top: ref.offsetTop,
   left: 0,
   behavior: "smooth"
  })
 }

 // Get country data based on user clicked and store it into sessionStorage
 const countryDatasHandler = (ref) => {
  countries.map(item => {
   if (item.cca3.toLowerCase() === ref.target.dataset.cca3.toLowerCase()) {
    sessionStorage.setItem("dataCountry", JSON.stringify(item));
   }
  });
 }

 useEffect(() => {
  // Fetch Data from API
  async function fetchData() {
   try {
    const response = await axios.get(apiURL);
    setCountries(response.data);
    setLoading(false);
   } catch (error) {
    console.log(error);
   }
  }
  // Call Function Fetch Data
  fetchData();
 }, []);

 return (
  <>
   {/* Main */}
   <main ref={targetBackToTop} className="relative px-4 mobile-2xl:px-8 md:px-8 lg:px-12 max-wrapper dark:bg-very-dark-blue selection:bg-dark-blue selection:text-white dark:selection:bg-white dark:selection:text-very-dark-blue-text">
    {/* Search and filter wrapper */}
    <div className="flex flex-col justify-center gap-4 pt-5 mobile-lg:flex-row mobile-lg:justify-between mobile-lg:items-center md:flex-row md:justify-between">
     {/* Search */}
     <label className="relative block lg:basis-80">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
       {/* Icon search */}
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="1.188rem" height="1.188rem" className="fill-dark-gray dark:fill-white">
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
       </svg>
      </span>

      <input ref={searchCountryInputRef} onChange={() => searchHandler(searchCountryInputRef.current)} className="block w-full py-3 pr-3 bg-white border border-none rounded-md text-dark-blue shadow-cstm dark:bg-dark-blue dark:focus:text-white placeholder:italic dark:placeholder:text-white placeholder:text-dark-gray placeholder:text-sm pl-9 focus:outline-none focus:border-very-dark-blue focus:ring-very-dark-blue dark:text-white" placeholder="Search for a country..." type="text" name="search" autoComplete="off" />
     </label>

     {/* Filter */}
     <div>
      <label htmlFor="filter">
       <select aria-label="Filter" name="filter" id="filter" ref={filterRegionButtonRef} onChange={() => filterRegionHandler(filterRegionButtonRef.current)} className="p-2 rounded-md cursor-pointer shadow-cstm mobile-lg:p-3 dark:bg-dark-blue dark:text-white">
        <option value="">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
       </select>
      </label>
     </div>
    </div >

    {loading ? <p className="pt-8 text-xl dark:text-white text-very-dark-blue-text">Retrieving data...</p> :
     <>
      {/* Card wrapper - countries list from API */}
      <div className={`justify-center grid-cols-1 gap-8 px-4 pt-8 pb-8 mobile-lg:px-8 mobile-xl:px-20 mobile-2xl:grid-cols-2 mobile-2xl:px-0 md:grid-cols-2 md:pt-12 md:px-0 tablet-md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ${searchInputValue.length === 0 ? "grid" : "hidden"} ${filterRegionValue.length > 0 ? "hidden" : "grid"}`}>
       {countries.map((country, index) => (
        <Link className="mobile-xl:max-w-[21.563rem] mobile-xl:mx-auto" onClick={countryDatasHandler} key={index} to={`/detail/${country.cca3.toLowerCase()}`} data-cca3={country.cca3}>
         <div className="grid grid-rows-[1fr] text-left rounded-lg shadow-cstm dark:bg-dark-blue h-full" data-cca3={country.cca3}>
          {/* Flag Country */}
          <img className="object-cover w-full h-full rounded-tl-lg rounded-tr-lg" src={country.flags.svg} alt="Flag Country" data-cca3={country.cca3} />

          {/* Info Country */}
          <div className="px-5 pt-5 pb-12 space-y-1" data-cca3={country.cca3}>
           {/* Name */}
           <p className="text-lg font-extrabold text-very-dark-blue-text dark:text-white" data-cca3={country.cca3}>
            {country.name.common}
           </p>

           {/* Population */}
           <p className="pt-2 font-semibold text-very-dark-blue-text dark:text-white" data-cca3={country.cca3}>
            Population : <span className="font-light" data-cca3={country.cca3}>{country.population.toLocaleString("en-US")}</span>
           </p>

           {/* Region */}
           <p className="font-semibold text-very-dark-blue-text dark:text-white" data-cca3={country.cca3}>
            Region : <span className="font-light dark:text-white" data-cca3={country.cca3}>{country.region}</span>
           </p>

           {/* Capital */}
           <p className="font-semibold text-very-dark-blue-text dark:text-white" data-cca3={country.cca3}>
            Capital : <span className="font-light" data-cca3={country.cca3}>{country.capital}</span>
           </p>
          </div>
         </div>
        </Link>
       ))
       }
      </div>

      {/* Card wrapper - will visible when user typing on search input and will visble also when user choose filter while the input search is empty */}
      <div className={`${searchInputValue.length > 0 ? "grid" : filterRegionValue.length > 0 ? "grid" : "hidden"} justify-center grid-cols-1 gap-8 px-4 pt-8 pb-8 mobile-lg:px-8 mobile-xl:px-20 mobile-2xl:grid-cols-2 mobile-2xl:px-0 md:grid-cols-2 md:pt-12 md:px-0 tablet-md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4`}>
       {countrySearchResults.map((countrySearchResult, index) => (
        <Link className="mobile-xl:max-w-[21.563rem] mobile-xl:mx-auto" key={index} to={`/detail/${countrySearchResult.cca3.toLowerCase()}`} onClick={countryDatasHandler} data-cca3={countrySearchResult.cca3}>
         <div className="grid grid-rows-[1fr] text-left rounded-lg shadow-cstm dark:bg-dark-blue h-full" data-cca3={countrySearchResult.cca3}>
          {/* Flag Country */}
          <img className="object-cover w-full h-full rounded-tl-lg rounded-tr-lg" src={countrySearchResult.flags.svg} alt="Flag Country" data-cca3={countrySearchResult.cca3} />
          {/* Info Country */}
          <div className="px-5 pt-5 pb-12 space-y-1" data-cca3={countrySearchResult.cca3}>
           {/* Name */}
           <p className="text-lg font-extrabold text-very-dark-blue-text dark:text-white" data-cca3={countrySearchResult.cca3}>
            {countrySearchResult.name.common}
           </p>

           {/* Population */}
           <p className="pt-2 font-semibold text-very-dark-blue-text dark:text-white" data-cca3={countrySearchResult.cca3}>
            Population : <span className="font-light" data-cca3={countrySearchResult.cca3}>{countrySearchResult.population.toLocaleString("en-US")}</span>
           </p>

           {/* Region */}
           <p className="font-semibold text-very-dark-blue-text dark:text-white" data-cca3={countrySearchResult.cca3}>
            Region : <span className="font-light" data-cca3={countrySearchResult.cca3}>{countrySearchResult.region}</span>
           </p>

           {/* Capital */}
           <p className="font-semibold text-very-dark-blue-text dark:text-white" data-cca3={countrySearchResult.cca3}>
            Capital : <span className="font-light" data-cca3={countrySearchResult.cca3}>{countrySearchResult.capital}</span>
           </p>
          </div>
         </div>
        </Link>
       ))
       }
      </div>

      {/* Back to top button */}
      <span onClick={() => backToTopHandler(targetBackToTop.current)} className="absolute w-10 h-10 bg-white rounded-full shadow-xl cursor-pointer right-10 bottom-10">
       <svg className="fill-dark-gray" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" version="1.1" viewBox="0 0 847 1058.75" x="0px" y="0px" fillRule="evenodd" clipRule="evenodd">
        <polygon points="423,285 203,505 260,561 423,398 587,561 643,505 " />
       </svg>
      </span>
     </>
    }
   </main>
  </>
 )
}