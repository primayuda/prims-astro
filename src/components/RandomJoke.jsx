import {useState} from 'react';

const RandomJoke = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      // console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}
      <h1>Fetching Dad's Joke</h1>
      <button onClick={handleClick}>Fetch New Joke</button>

      {isLoading && <h2>Loading...</h2>}

      <p>{data.joke}</p>
    </div>
  );
};

export default RandomJoke;
