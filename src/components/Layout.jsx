import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './Header';
import { useContext, useEffect } from 'react';
import { CountriesContext } from '../App';

const Layout = () => {
  const countries = useLoaderData();
  const { setData } = useContext(CountriesContext);

  useEffect(() => {
    setData(countries);
  }, [countries, setData]);

  return (
    <div className='bg bg-[url("/public/world.png")] dark:bg-[url("")] dark:bg-fall-dark'>
      <div className='bg bg-[#eeeeeecc] dark:bg-transparent dark:bg-[url("/public/world.png")] dark:text-white min-h-screen flex flex-col'>
        <Header />
        <div className='container px-4 mx-auto my-2 py-2 flex-1 flex flex-col h-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
