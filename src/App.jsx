import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import FunFacts from './pages/FunFacts';
import Globe from './pages/Globe';
import Layout from './components/Layout';
import { createContext, useState } from 'react';
import Error from './pages/Error';
import { Helmet } from 'react-helmet';

const router = createBrowserRouter([
  {
    Component: Layout,
    ErrorBoundary: Error,
    loader: async () => {
      return fetch('https://restcountries.com/v3.1/all?fields=name').then((d) =>
        d.json()
      );
    },
    children: [
      {
        index: true,
        Component: Home
        // loader: async ({ request }) => {
        //   const country = new URL(request.url).searchParams.get('country');
        //   if (country)
        //     return fetch(
        //       `https://restcountries.com/v3.1/alpha/${country}`
        //     ).then((d) => d.json());
        //   return null;
        // }
      },
      {
        path: 'fun-facts',
        Component: FunFacts
      },
      {
        path: 'globe',
        Component: Globe
      }
    ]
  }
]);

export const CountriesContext = createContext('countries');

const App = () => {
  const [data, setData] = useState();
  return (
    <>
      <Helmet>
        <title>Fun with Countries</title>
        <meta name='title' content='Fun with Countries' />
        <meta
          name='description'
          content='Find info about countries from a generic API'
        />
      </Helmet>
      <CountriesContext.Provider value={{ data, setData }}>
        <RouterProvider router={router} />
      </CountriesContext.Provider>
    </>
  );
};

export default App;
