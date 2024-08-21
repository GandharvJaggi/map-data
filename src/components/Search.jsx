import { memo, useContext, useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import { CountriesContext } from '../App';
import { useSearchParams } from 'react-router-dom';

const Search = ({ setQuery, prompt = [] }) => {
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState(
    (searchParams.has('country') && {
      type: 'alpha',
      text: searchParams.get('country')
    }) ||
      {}
  );
  const [error, setError] = useState();
  const [popup, setPopup] = useState(false);

  const { data } = useContext(CountriesContext);

  const handleChange = useMemo(() => throttle(setQuery, 500), [setQuery]);

  const handleLucky = () => {
    if (data.length) {
      const luckyCountry = data[Math.ceil(Math.random() * data.length - 1)];
      setValue({ type: 'name', text: luckyCountry.name.common });
      if (prompt.length > 0) {
        setPopup(false);
        setQuery({ type: 'name', text: luckyCountry.name.common });
      }
    }
  };

  useEffect(() => {
    if (prompt.length === 0) {
      if (value?.text && value.text.length > 0) {
        if (value.text.length < 3) {
          setError('Enter atleast 3 characters.');
        } else if (!/^[a-zA-Z ]+$/.test(value.text)) {
          setError(
            "Countries don't usually have special characters in them :/"
          );
        } else {
          handleChange(value);
          setError();
        }
      } else {
        setError();
        setQuery({});
      }
    }
  }, [handleChange, setQuery, value, prompt]);

  return (
    <div className='w-full lg:w-2/3 mx-auto'>
      {prompt[0] && (
        <div className='text-5xl text-gray-500 dark:text-gray-300 text-center my-4'>
          {prompt[0]}
        </div>
      )}
      <div className='flex align-center flex-wrap lg:flex-nowrap'>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Try a country name'
            className='border rounded-lg p-2 w-full bg-white dark:bg-fall-dark mb-2 lg:mb-0'
            value={value?.text || ''}
            onChange={(e) => {
              if (prompt.length > 0) setPopup(true);
              setValue({ type: 'name', text: e.target.value });
            }}
          />
          {popup &&
            prompt.length !== 0 &&
            value?.text &&
            value.text.length > 0 && (
              <div className='absolute bg-white dark:bg-fall-dark border rounded-lg px-2 flex flex-col w-full divide-y'>
                {data
                  .filter((d) =>
                    d.name.common
                      .toLowerCase()
                      .includes(value.text.toLowerCase())
                  )
                  .map((d) => (
                    <button
                      key={d.name.common}
                      className='py-2'
                      onClick={() => {
                        setValue({
                          type: 'name',
                          text: d.name.common
                        });
                        setQuery({
                          type: 'name',
                          text: d.name.common
                        });
                        setPopup(false);
                      }}
                    >
                      {d.name.common}
                    </button>
                  ))}
              </div>
            )}
        </div>
        <button
          className='bg-primary rounded-lg lg:ml-2 text-nowrap p-2 w-full lg:w-auto ml-0'
          onClick={handleLucky}
        >
          I&apos;m Feeling Lucky
        </button>
      </div>
      {error && (
        <div className='text-xs text-red-500 dark:text-red-300 mt-1'>
          {error}
        </div>
      )}
      {prompt[1] && (
        <div className='text-5xl text-gray-500 dark:text-gray-300 text-center my-4'>
          {prompt[1]}
        </div>
      )}
    </div>
  );
};
export default memo(Search);
