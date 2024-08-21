import { Helmet } from 'react-helmet';
import Header from '../components/Header';

const Error = () => {
  return (
    <div className='flex flex-col dark:text-white dark:bg-fall-dark min-h-screen'>
      <Helmet>
        <title>Fun with 404</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <Header />
      <div className='flex flex-col items-center justify-center flex-1'>
        <h1 className='text-5xl'>🤔 Looks Like somebody is lost.</h1>
        <div className='text-9xl'>🤨</div>
      </div>
    </div>
  );
};
export default Error;
