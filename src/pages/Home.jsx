import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero">
        <div>
          <h1>Welcome to Library Management</h1>

          <p>
            Manage books, borrowers and library records
            easily from one place.
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="primary-btn">
              View Books
            </Link>

            <Link to="/add-book" className="secondary-btn">
              Add New Book
            </Link>
          </div>
        </div>

        <div className="hero-icon">
          📚
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          <h2>📖</h2>
          <h3>Manage Books</h3>
          <p>
            Add and view books stored in the library.
          </p>
        </div>

        <div className="feature-card">
          <h2>👤</h2>
          <h3>Borrow Books</h3>
          <p>
            Record which student has borrowed a book.
          </p>
        </div>

        <div className="feature-card">
          <h2>↩️</h2>
          <h3>Return Books</h3>
          <p>
            Track returned books and available copies.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;