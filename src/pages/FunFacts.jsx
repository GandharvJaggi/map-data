import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Search from '../components/Search';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet';

const prompts = {
  '#capital': {
    prompt: ['What is the capital of', ''],
    param: 'capital',
    extract: (fact) => fact.capital.join(', '),
    type: 'string'
  },
  '#coat-of-arms': {
    prompt: ['The Coat of Arms of', 'looks like'],
    param: 'coatOfArms',
    extract: (fact) =>
      fact.coatOfArms.png.length > 0
        ? { src: fact.coatOfArms.png, alt: 'Coat of Arms' }
        : {},
    type: 'img'
  },
  '#area': {
    prompt: ["What's the total area of", ''],
    param: 'area',
    extract: (fact) => fact.area && `${fact.area} sq. Km`,
    type: 'string'
  },
  '#independent': {
    prompt: ['Is', 'an Independent Country?'],
    param: 'independent',
    extract: (fact) => (fact.independent ? 'Yes' : 'No'),
    type: 'string'
  },
  '#un-member': {
    prompt: ['Is', 'part of the United Nations?'],
    param: 'unMember',
    extract: (fact) => (fact.unMember ? 'Yes' : 'No'),
    type: 'string'
  },
  '#currency': {
    prompt: ['I want to buy a house in', 'I will be spending some?'],
    param: 'currencies',
    extract: (fact) =>
      Object.entries(fact.currencies)
        .map(([, value]) => `${value.name}s`)
        .join(' or '),
    type: 'string'
  },
  '#language': {
    prompt: ["I'll be travelling to", 'I should learn a bit of?'],
    param: 'languages',
    extract: (fact) => Object.values(fact.languages).join(' and '),
    type: 'string'
  },
  '#landlocked': {
    prompt: ['Can I find a beach in', ''],
    param: 'landlocked',
    extract: (fact) => (fact.landlocked ? 'No' : 'Yes'),
    type: 'string'
  },
  '#flag': {
    prompt: ['What is the National Flag  of', ''],
    param: 'flags',
    extract: (fact) => ({ src: fact.flags.png, alt: fact.flags.alt }),
    type: 'img'
  }
};

const FunFacts = () => {
  const [data, setData] = useState();
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(false);

  const { hash } = useLocation();
  const navigate = useNavigate();

  const randomFact = (current) => {
    setLoading(true);
    const promptArr = Object.keys(prompts);
    const fact = promptArr[Math.ceil(Math.random() * promptArr.length - 1)];

    if (fact === current) return randomFact(current);
    return fact;
  };

  useEffect(() => {
    if (hash && query?.text?.length > 0) {
      setLoading(true);
      fetch(
        `https://restcountries.com/v3.1/name/${query.text}?fields=${prompts[hash].param}&fullText=true`
      )
        .then(async (d) => {
          let [fact] = await d.json();
          setData(prompts[hash].extract(fact));
        })
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [hash, query]);

  if (hash) {
    return (
      <>
        <Helmet>
          <title>{prompts[hash].prompt.join(' {Country} ')}</title>
          <meta
            name='title'
            content={prompts[hash].prompt.join(' {Country} ')}
          />
          <meta
            name='description'
            content='Find facts about countries from a generic API'
          />
        </Helmet>
        <div className='text-center my-2'>
          <button
            className='float-left flex items-center py-2 hover:underline'
            onClick={() => {
              setData();
              navigate(-1);
            }}
          >
            <FaChevronLeft className='pr-2' /> All Facts
          </button>
          <button
            className='bg-primary rounded-lg min-w-[100px] p-2'
            onClick={() => navigate(randomFact(hash), { replace: true })}
          >
            Randomize
          </button>
        </div>
        <Search setQuery={setQuery} prompt={prompts[hash].prompt} />
        <div className='mt-4'>
          {loading && (
            <div className='flex justify-center'>
              <Loading />
            </div>
          )}
          {data && !loading && (
            <>
              {prompts[hash].type === 'img' &&
                (data.src ? (
                  <div className='flex justify-center'>
                    <img src={data.src} alt={data.alt} width={300} />
                  </div>
                ) : (
                  <div className='text-center'>
                    Whoops looks like they don&apos;t have any. Weird.
                  </div>
                ))}
              {prompts[hash].type === 'string' && (
                <div className='text-center'>{data}</div>
              )}
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Fun Facts</title>
        <meta name='title' content='Fun Facts' />
        <meta
          name='description'
          content='Find facts about countries from a generic API'
        />
      </Helmet>
      <h1 className='text-3xl text-center mb-2'>Fun Facts</h1>
      <div className='flex flex-wrap justify-around'>
        {Object.entries(prompts).map(([key, value]) => (
          <Link
            to={key}
            className='self-start border hover:border-primary rounded-lg p-4 m-4'
            key={key}
          >
            {value.prompt.join(' {Country} ')}
          </Link>
        ))}
      </div>
    </>
  );
};
export default FunFacts;
