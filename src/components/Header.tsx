import { useState, useEffect } from "react";
import { getExchangeRates } from "../services/api";
import styles from "./Header.module.scss";
const Header = () => {
  const [usdRate, setUsdRate] = useState<number>(0);
  const [eurRate, setEurRate] = useState<number>(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        setUsdRate(1 / data.rates.USD);
        setEurRate(1 / data.rates.EUR);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.icon_money_wrapper}>
        <div className={styles.icon_money_usd}></div>
        <div className={styles.header_currency}>
          1 USD / {usdRate.toFixed(2)} UAH
        </div>
      </div>
      <div className={styles.icon_money_wrapper}>
        <div className={styles.icon_money}></div>
        <div className={styles.header_currency}>
          1 EUR / {eurRate.toFixed(2)} UAH
        </div>
      </div>
    </header>
  );
};

export default Header;
