import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchBooks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setBooks(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function deleteBook(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Could not delete book.");
      return;
    }

    fetchBooks();
  }

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Library Books</h1>
          <p>View all books available in the library.</p>
        </div>

        <Link to="/add-book" className="primary-btn">
          + Add Book
        </Link>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search by title, author or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <div className="empty">
          <h2>No books found</h2>
          <p>Add your first book to the library.</p>
        </div>
      ) : (
        <div className="books-grid">

          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>

              <div className="book-icon">
                📚
              </div>

              <h2>{book.title}</h2>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {book.category || "Not specified"}
              </p>

              <p>
                <strong>ISBN:</strong>{" "}
                {book.isbn || "Not specified"}
              </p>

              <div className="book-stock">
                <span>
                  Total: {book.quantity}
                </span>

                <span>
                  Available: {book.available_quantity}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Books;