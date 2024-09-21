import { getExchangeRates } from "../services/api";
import { useEffect, useState } from "react";
import styles from "./Convertor.module.scss";
type Rates = {
  [key: string]: number;
};
const selectedCurrencies = [
  "USD",
  "EUR",
  "GBP",
  "UAH",
  "AUD",
  "CAD",
  "CHF",
  "PLN",
  "UYU",
  "MOP",
];
const CurrencyConverter = () => {
  const [rates, setRates] = useState<Rates>({});
  const [amount1, setAmount1] = useState<number>(0);
  const [amount2, setAmount2] = useState<number>(0);
  const [currency1, setCurrency1] = useState<string>("USD");
  const [currency2, setCurrency2] = useState<string>("UAH");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount1(value);
    setAmount2(
      parseFloat(((value * rates[currency2]) / rates[currency1]).toFixed(2))
    );
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount2(value);
    setAmount1(
      parseFloat(((value * rates[currency1]) / rates[currency2]).toFixed(2))
    );
  };

  const handleCurrency1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency1(e.target.value);
    setAmount2(
      parseFloat(
        ((amount1 * rates[currency2]) / rates[e.target.value]).toFixed(2)
      )
    );
  };

  const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency2(e.target.value);
    setAmount1(
      parseFloat(
        ((amount2 * rates[currency1]) / rates[e.target.value]).toFixed(2)
      )
    );
  };

  if (loading) {
    return <div>Loading exchange rates...</div>;
  }

  return (
    <div className={styles.converter_container}>
      <h1 className={styles.title}>Currency Converter</h1>
      <div className={styles.relative_container}>
        <input
          className={styles.currency_input}
          type="number"
          value={amount1}
          onChange={handleAmount1Change}
        />
        <select
          className={styles.currency_select}
          value={currency1}
          onChange={handleCurrency1Change}
        >
          {selectedCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.relative_container}>
        <input
          className={styles.currency_input}
          type="number"
          value={amount2}
          onChange={handleAmount2Change}
        />
        <select
          className={styles.currency_select}
          value={currency2}
          onChange={handleCurrency2Change}
        >
          {selectedCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
