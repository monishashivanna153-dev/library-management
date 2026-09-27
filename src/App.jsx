import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import BorrowBook from "./pages/BorrowBook";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
        </Routes>
      </main>
    </>
  );
}

export default App;