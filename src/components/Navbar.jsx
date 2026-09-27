import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📚 Library Management
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/borrow-book">Borrow Book</Link>
      </div>
    </nav>
  );
}

export default Navbar;