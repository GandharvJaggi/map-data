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
    <div className='dark:text-white dark:bg-fall-dark min-h-screen flex flex-col'>
      <Header />
      <div className='container px-2 lg:p-0 mx-auto my-2 py-2 flex-1 flex flex-col h-full'>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
