import { createContext, useContext, useEffect, useState } from 'react';

const TrendingContext = createContext({});

export const useTrendingValue = () => useContext(TrendingContext);

const TrendingProvider = ({ children }) => {
  const [trendData, setTrendingData] = useState();

  const getTrendData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log(data);
      setTrendingData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendData = () => {
    getTrendData();
  };

  useEffect(() => {
    getTrendData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TrendingContext.Provider value={{ trendData, resetTrendData }}>
      {children}
    </TrendingContext.Provider>
  );
};
export default TrendingProvider;
