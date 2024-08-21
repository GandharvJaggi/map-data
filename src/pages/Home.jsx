import { useEffect, useRef, useState } from 'react';
import Search from '../components/Search';
import Loading from '../components/Loading';
import CountryCard from '../components/CountryCard';
import Country from '../components/Country';

const Home = () => {
  const [query, setQuery] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const controller = useRef();

  useEffect(() => {
    if (query?.text && query.text.length > 0) {
      setLoading(true);
      controller.current?.abort();
      controller.current = new AbortController();
      fetch(`https://restcountries.com/v3.1/${query.type}/${query.text}`, {
        method: 'GET',
        signal: controller.current.signal
      })
        .then(async (d) => {
          const data = await d.json();
          if (data.status !== 404) setCountryData(data || []);
        })
        .catch((error) => {
          setCountryData([]);
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setCountryData([]);
    }
  }, [query]);

  return (
    <>
      <h1 className='text-center text-5xl mb-4'>
        Best place to get generic country data from an API*
      </h1>
      <Search setQuery={setQuery} />
      <div className='flex-1 my-4'>
        {query?.text && query.text.length > 0 ? (
          loading ? (
            <div className='flex justify-center'>
              <Loading />
            </div>
          ) : countryData.length === 0 ? (
            <div className='text-center text-2xl'>
              Whooops! That&apos;s an undiscovered country.
            </div>
          ) : countryData.length === 1 ? (
            <Country data={countryData[0]} />
          ) : (
            <div className='grid lg:grid-cols-3 gap-4'>
              {countryData.map((d) => (
                <CountryCard
                  key={d.ccn3}
                  data={d}
                  handleClick={() => setCountryData([d])}
                />
              ))}
            </div>
          )
        ) : (
          <div className='text-center text-2xl'>
            Go on, Don&apos;t be shy. Search up a country. 🙂
          </div>
        )}
      </div>
      <small className='text-xs text-center'>
        *Second to the API endpoint itself.
      </small>
    </>
  );
};
export default Home;
