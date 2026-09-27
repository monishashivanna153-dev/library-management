import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 1,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.author) {
      setMessage("Please enter book title and author.");
      return;
    }

    setLoading(true);
    setMessage("");

    const quantity = Number(form.quantity);

    const { error } = await supabase
      .from("books")
      .insert([
        {
          title: form.title,
          author: form.author,
          isbn: form.isbn,
          category: form.category,
          quantity: quantity,
          available_quantity: quantity,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Failed to add book.");
      return;
    }

    setMessage("Book added successfully!");

    setForm({
      title: "",
      author: "",
      isbn: "",
      category: "",
      quantity: 1,
    });

    setTimeout(() => {
      navigate("/books");
    }, 1000);
  }

  return (
    <div className="page-container">

      <h1>Add New Book</h1>

      <form className="book-form" onSubmit={handleSubmit}>

        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />

        <label>ISBN</label>
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Example: Programming"
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
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

export default AddBook;