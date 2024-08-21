const CountryCard = ({ data, handleClick }) => {
  const { flags, name, region, subregion, capital } = data;

  return (
    <div
      className='border border-2 hover:border-primary rounded-lg flex'
      onClick={handleClick}
    >
      {flags.png && (
        <img
          src={flags.png}
          alt={flags.alt}
          width={200}
          className='rounded-l-lg border'
        />
      )}
      <div className='p-4 flex flex-col justify-between'>
        <div>
          <div className='text-xl font-semibold'>{name.common}</div>
          {capital && <div className='text-gray-300'>{capital.join(', ')}</div>}
        </div>
        <div className='text-sm'>
          {region}, {subregion}
        </div>
      </div>
    </div>
  );
};
export default CountryCard;
