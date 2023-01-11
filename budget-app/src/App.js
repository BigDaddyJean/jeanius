import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./components/Detail";
import Header from "./components/Header";
import EditEntry from "./components/EditEntry";
import NewEntry from "./components/NewEntry";
import TotalTransactions from "./components/TotalTransactions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TotalTransactions />} />
          <Route path="/transactions/new" element={<NewEntry />} />
          <Route path="/transactions/details/:id" element={<Detail />} />
          <Route path="/transactions/edit/:id" element={<EditEntry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;