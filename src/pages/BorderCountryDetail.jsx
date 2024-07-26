import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// API URL
const apiURL = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,nativeName,tld,currencies,languages,borders,cca3";

export default function BorderCountryDetail() {
  const { borderName } = useParams();
  const countryIdPrevious = sessionStorage.getItem("countryId");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  let flags;
  let name;
  let nativeName;
  let population;
  let region;
  let subRegion;
  let capital;
  let tld;
  let currencies;
  let languages;
  let borders;

  countries.map(item => {
    if (item.cca3 === borderName.toUpperCase()) {
      flags = item.flags.svg;
      name = item.name.common;
      nativeName = item.name.nativeName[Object.keys(item.name.nativeName)[Object.keys(item.name.nativeName).length - 1]].common;
      population = item.population.toLocaleString("en-US");
      region = item.region;
      subRegion = item.subregion;
      capital = item.capital[0];
      tld = item.tld[0];
      currencies = item.currencies[Object.keys(item.currencies)[Object.keys(item.currencies).length - 1]].name;
      languages = Object.values(item.languages).sort().join(', ');
      borders = item.borders.sort();
    }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiURL);
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="px-5 pt-8 max-wrapper selection:bg-dark-blue selection:text-white dark:selection:bg-white dark:selection:text-very-dark-blue-text lg:pt-12">
        {loading ? <p className="text-xl dark:text-white text-very-dark-blue-text">Retrieving Data...</p> :
          <div className="pb-10 mobile-lg:px-10 mobile-xl:px-16 mobile-xl:max-w-[35.438rem] mobile-2xl:max-w-[38.75rem] mobile-2xl:px-20 mobile-2xl:mx-auto md:px-8 md:max-w-full">
            {/* Back Button */}
            <div>
              <Link to={`/detail/${countryIdPrevious}`} className="inline-flex items-center justify-center gap-3 px-5 py-2 text-sm tracking-wide duration-75 ease-in-out bg-white rounded-md shadow-cstm text-very-dark-blue-text dark:bg-dark-blue dark:text-white dark:shadow-cstm dark:hover:bg-very-dark-blue hover:bg-dark-gray hover:text-white group">
                <svg className="w-3 dark:fill-white group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" xmlSpace="preserve">
                  <path d="M32.7,15.9c1.4-1.4,3.6-1.4,5,0c1.4,1.4,1.4,3.6,0,5L12.1,46.4h84.3c2,0,3.5,1.6,3.5,3.5c0,2-1.6,3.6-3.5,3.6H12.1  l25.6,25.5c1.4,1.4,1.4,3.7,0,5c-1.4,1.4-3.7,1.4-5,0L1.1,52.5c-1.4-1.4-1.4-3.6,0-5L32.7,15.9z"
                  />
                </svg>
                Back
              </Link>
            </div>

            {/* Border Country Detail */}
            <div className="py-10 lg:py-14 md:flex md:gap-10 md:items-center laptop-l:gap-28 tablet-md:gap-[4.2rem] lg:gap-[4.1rem]">
              {/* Flag */}
              <div className="md:basis-[20rem] tablet-sm:basis-[20.5rem] tablet-md:basis-[24rem] lg:basis-[28rem]">
                <img className="shadow-cstm" src={flags} alt="Country Flag" />
              </div>

              {/* Info country */}
              <div className="pt-8 md:flex-1 md:pt-0">
                {/* Name */}
                <h1 className="text-xl font-extrabold text-very-dark-blue-text dark:text-white">{name}</h1>

                {/* Data information */}
                <div className="pt-4 space-y-6 md:flex md:space-y-0 md:gap-6 tablet-md:gap-16">
                  {/* Left */}
                  <div className="tablet-md:space-y-1">
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Native Name : <span className="font-light">
                      {nativeName !== undefined ? nativeName : 'N/A'}
                    </span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Population : <span className="font-light">
                      {population !== undefined ? population : 'N/A'}
                    </span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Region : <span className="font-light">
                      {region !== undefined ? region : 'N/A'}</span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Sub Region : <span className="font-light">
                      {subRegion !== undefined ? subRegion : 'N/A'}</span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Capital : <span className="font-light">
                      {capital !== undefined ? capital : 'N/A'}</span></p>
                  </div>

                  {/* Right */}
                  <div className="tablet-md:space-y-1">
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Top Level Domain  : <span className="font-light">{tld !== undefined ? tld : 'N/A'}</span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Currencies : <span className="font-light">{currencies !== undefined ? currencies : 'N/A'}</span></p>
                    <p className="font-semibold text-very-dark-blue-text dark:text-white">Languages : <span className="font-light">{languages !== undefined ? languages : 'N/A'}</span></p>
                  </div>
                </div>

                {/* Border countries */}
                <div className="flex flex-col flex-wrap gap-2 pt-6 md:items-start lg:max-w-[34.688rem] md:gap-4">
                  <p className="text-[1.8] font-semibold text-very-dark-blue-text dark:text-white md:pt-0">Border Countries :
                  </p>

                  <div className="grid items-center grid-cols-[repeat(3,minmax(5rem,8rem))] gap-2 dark:text-white md:gap-4">
                    {borders.length > 0 ? borders.map((item, index) => (
                      <p key={index} className="basis-[5rem] px-2 py-1 text-sm font-light tracking-wider text-center duration-75 ease-in-out bg-white rounded-sm hover:text-white hover:bg-dark-gray shadow-cstm dark:bg-dark-blue dark:hover:bg-very-dark-blue">{item}</p>
                    )) : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
