const Field = ({ label, value }) =>
  value !== undefined && (
    <div className='mb-2'>
      <div className='text-gray-400 text-sm'>{label}</div>
      <div className='text-2xl capitalize'>{value}</div>
    </div>
  );

const Country = ({ data }) => {
  const {
    flags,
    name,
    area,
    continents,
    region,
    subregion,
    capital,
    currencies,
    landlocked,
    languages,
    population,
    unMember,
    coatOfArms
  } = data;

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='flex-1 order-2'>
        <Field label='Common Name' value={name.common} />
        <Field label='Official Name' value={name.official} />
        <Field label='Area' value={area && `${area} km^2`} />
        <Field
          label='Currency'
          value={
            currencies &&
            Object.entries(currencies)
              .map(([key, value]) => `${value.symbol} ${value.name} (${key})`)
              ?.join(', ')
          }
        />
        <Field label='Landlocked' value={landlocked ? 'Yes' : 'No'} />
        <Field
          label='Languages'
          value={languages && Object.values(languages)?.join(', ')}
        />
        <Field label='Population' value={population} />
        <Field label='UN Member' value={unMember ? 'Yes' : 'No'} />
      </div>
      <div className='shrink-1 order-1 lg:order-2'>
        {flags.png && (
          <img
            src={flags.png}
            alt={flags.alt}
            width={400}
            className='border mb-4'
          />
        )}
        <Field label='Capital' value={capital?.join(', ')} />
        <Field label='Continent' value={continents?.join(', ')} />
        <Field label='Region' value={region} />
        <Field label='Sub Region' value={subregion} />
        {coatOfArms.png && (
          <>
            <div className='text-gray-400 text-sm mb-2'>Coat of Arms</div>
            <img
              src={coatOfArms.png}
              alt='Coat of Arms'
              width={100}
              className='border mb-4'
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Country;
