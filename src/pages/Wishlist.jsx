import { useEffect, useState } from "react";
import { LocalDb } from "../lib/LocalDb";
import { Link } from "react-router-dom";
import axios from "axios";

function Wishlist() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextURL, setNextURL] = useState(null);
  const [previousURL, setPreviousURL] = useState(null);

  const fetchBooks = () => {
    const ids = LocalDb.getWishlist().join(",");
    const URL = `https://gutendex.com/books?ids=${ids}`;
    setLoading(true);
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    axios
      .get(URL)
      .then((response) => {
        const { results, next, previous } = response.data;
        setBooks(() => results);
        setNextURL(next);
        setPreviousURL(previous);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveFromWishlist = (bookId, e) => {
    e.preventDefault();
    LocalDb.removeFromWishlist(bookId);
    setBooks(books.filter((book) => book.id !== bookId));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-5xl px-2 mx-auto flex flex-col gap-y-2">
      <div>
        {loading ? (
          Array.from({ length: 6 }, (_, idx) => (
            <div
              key={idx}
              className="py-4 rounded shadow-md w-full animate-pulse bg-gray-400/40"
            >
              <div className="flex p-4 space-x-4 sm:px-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-gray-400"></div>
                <div className="flex-1 py-2 space-y-4">
                  <div className="w-full h-3 rounded bg-gray-400"></div>
                  <div className="w-5/6 h-3 rounded bg-gray-400"></div>
                </div>
              </div>
            </div>
          ))
        ) : books.length > 0 ? (
          books?.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className="flex items-center  justify-between p-4 border-b hover:bg-slate-400/30 cursor-pointer"
            >
              <div className="flex items-center flex-1">
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex flex-col ml-4">
                  <h2 className="text-lg font-medium">{book.title}</h2>
                </div>
              </div>
              <button
                onClick={(e) => handleRemoveFromWishlist(book.id, e)}
                className="p-1 hover:bg-gray-300 shadow-md rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="red"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" />
                </svg>
              </button>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">No books in wishlist</p>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => fetchBooks(previousURL)}
          disabled={!previousURL}
          className={`p-2 text-white bg-blue-500 ${
            !previousURL && "cursor-not-allowed opacity-50"
          }`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => fetchBooks(nextURL)}
          disabled={!nextURL}
          className={`p-2 text-white bg-blue-500 ${
            !nextURL && "cursor-not-allowed opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Wishlist;
