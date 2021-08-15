import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
