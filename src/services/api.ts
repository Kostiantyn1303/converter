import axios from "axios";
export const getExchangeRates = async () => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/UAH"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates");
  }
};
