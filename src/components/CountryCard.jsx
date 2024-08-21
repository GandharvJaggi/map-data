const CountryCard = ({ data, handleClick }) => {
  const { flags, name, region, subregion, capital } = data;

  return (
    <div
      className='border border-2 hover:border-primary rounded-lg flex items-center'
      onClick={handleClick}
    >
      {flags.png && (
        <img
          src={flags.png}
          alt={flags.alt}
          width={200}
          className='rounded-l-lg border height-auto max-w-[45vw]'
        />
      )}
      <div className='p-4 flex flex-col justify-between'>
        <div>
          <div className='text-xl font-semibold'>{name.common}</div>
          {capital && (
            <div className='text-gray-600 dark:text-gray-300'>
              {capital.join(', ')}
            </div>
          )}
        </div>
        <div className='text-sm'>
          {region}, {subregion}
        </div>
      </div>
    </div>
  );
};
export default CountryCard;
