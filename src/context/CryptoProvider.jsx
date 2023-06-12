import { createContext, useContext, useLayoutEffect, useState } from 'react';

const CryptoContext = createContext({});

export const useCryptoValue = () => useContext(CryptoContext);

const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinData, setCoinData] = useState();
  const [coinsSearch, setCoinSearch] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(250);
  const [perPage, setPerPage] = useState(10);

  const getCryptoData = async () => {
    setCryptoData([]);
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => res.json())
        .then((json) => json);

      setTotalPage(data.length);
    } catch (err) {
      console.log(err);
    }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinsSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      setCryptoData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setPage(1);
    setCoinSearch('');
  };
  const getSearchData = (query) => {
    fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data.coins);
      })
      .catch((err) => console.log(err));
  };
  const getCoinData = async (coinId) => {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCoinData(data);
    } catch (err) {
      console.log('Error');
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinsSearch, currency, sortBy, page, perPage]);
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchData,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        reset,
        setPerPage,
        perPage,
        coinData,
        getCoinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
export default CryptoProvider;
