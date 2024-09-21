import "./App.scss";
import CurrencyConverter from "./components/Converter";
import Header from "./components/Header";
function App() {
  return (
    <>
      <div>
        <Header />
        <CurrencyConverter />
      </div>
    </>
  );
}

export default App;
