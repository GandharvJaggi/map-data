import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.getElementById('theme-switch').checked = true;
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <header className='bg-base dark:bg-base-dark p-4'>
      <div className='flex items-center space-x-4 container mx-auto'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/fun-facts'>Fun Facts</NavLink>
        <NavLink to='/globe'>Globe</NavLink>
        <div className='flex justify-end flex-1'>
          <input
            type='checkbox'
            className='h-0 w-0 absolute opacity-0'
            id='theme-switch'
            onChange={(e) => {
              console.log(e.target.checked);

              if (e.target.checked) {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
              } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
              }
            }}
          />
          <label
            htmlFor='theme-switch'
            className='flex items-center p-1 bg-white dark:bg-black rounded-full relative'
          >
            <FaMoon className='fill-yellow-100 mr-2' />
            <span className='absolute dark:translate-x-[24px] w-[16px] h-[16px] rounded-full transition-transform ease-linear bg-gray-200' />
            <FaSun className='fill-yellow-500' />
          </label>
        </div>
      </div>
    </header>
  );
};
export default Header;
