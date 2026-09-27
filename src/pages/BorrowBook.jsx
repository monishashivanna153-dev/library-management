import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function BorrowBook() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    book_id: "",
    borrower_name: "",
    borrower_email: "",
    due_date: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  async function fetchAvailableBooks() {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .gt("available_quantity", 0)
      .order("title");

    if (error) {
      console.error(error);
      return;
    }

    setBooks(data || []);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleBorrow(e) {
    e.preventDefault();

    if (
      !form.book_id ||
      !form.borrower_name ||
      !form.borrower_email ||
      !form.due_date
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(form.book_id)
    );

    if (!selectedBook) {
      setMessage("Please select a valid book.");
      return;
    }

    const { error: borrowError } = await supabase
      .from("borrowings")
      .insert([
        {
          book_id: selectedBook.id,
          borrower_name: form.borrower_name,
          borrower_email: form.borrower_email,
          due_date: form.due_date,
        },
      ]);

    if (borrowError) {
      console.error(borrowError);
      setMessage("Failed to borrow book.");
      return;
    }

    const { error: updateError } = await supabase
      .from("books")
      .update({
        available_quantity:
          selectedBook.available_quantity - 1,
      })
      .eq("id", selectedBook.id);

    if (updateError) {
      console.error(updateError);
      setMessage("Borrowing recorded, but stock update failed.");
      return;
    }

    setMessage("Book borrowed successfully!");

    setForm({
      book_id: "",
      borrower_name: "",
      borrower_email: "",
      due_date: "",
    });

    fetchAvailableBooks();
  }

  return (
    <div className="page-container">

      <h1>Borrow a Book</h1>

      <form
        className="book-form"
        onSubmit={handleBorrow}
      >

        <label>Select Book</label>

        <select
          name="book_id"
          value={form.book_id}
          onChange={handleChange}
        >
          <option value="">
            -- Select a book --
          </option>

          {books.map((book) => (
            <option
              key={book.id}
              value={book.id}
            >
              {book.title} - {book.author}
            </option>
          ))}
        </select>

        <label>Borrower Name</label>

        <input
          type="text"
          name="borrower_name"
          value={form.borrower_name}
          onChange={handleChange}
          placeholder="Enter borrower name"
        />

        <label>Borrower Email</label>

        <input
          type="email"
          name="borrower_email"
          value={form.borrower_email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <label>Due Date</label>

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />

        <button type="submit">
          Borrow Book
        </button>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

      </form>

    </div>
  );
}

export default BorrowBook;