import { createContext, useContext, useEffect, useState } from 'react';
import { useCryptoValue } from './CryptoProvider';

const StorageContext = createContext({});

export const useStorage = () => useContext(StorageContext);

const StorageProvider = ({ children }) => {
  const [savedData, setSavedData] = useState();
  const [allCoins, setAllCoins] = useState([]);

  const { currency, sortBy } = useCryptoValue();

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem('coins'));

    if (oldCoins.includes(oldCoins)) {
      return null;
    } else {
      let newCoins = [...oldCoins, coinId];
      setAllCoins(newCoins);
      localStorage.setItem('coins', JSON.stringify(newCoins));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem('coins'));
    let newCoins = oldCoins.filter((coin) => coin !== coinId);
    setAllCoins(newCoins);
    localStorage.setItem('coins', JSON.stringify(newCoins));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ','
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSavedData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const resetStoredData = () => {
    getSavedData();
  };
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('coins'));
    if (getLocalStorage) {
      let totalCoins = JSON.parse(localStorage.getItem('coins'));
      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    } else {
      localStorage.setItem('coins', JSON.stringify([]));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCoins]);
  return (
    <StorageContext.Provider
      value={{ allCoins, saveCoin, removeCoin, resetStoredData, savedData }}
    >
      {children}
    </StorageContext.Provider>
  );
};
export default StorageProvider;
