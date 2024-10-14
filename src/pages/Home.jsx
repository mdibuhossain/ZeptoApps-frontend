import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [nextURL, setNextURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousURL, setPreviousURL] = useState(null);

  const fetchBooks = (URL) => {
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        const { results, next, previous } = response.data;
        setBooks(results);
        setNextURL(next);
        setPreviousURL(previous);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks("https://gutendex.com/books");
  }, []);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2">
      <div className="flex flex-row justify-between items-start">
        <div className="relative">
          {/* dropdown option */}
          <select className="p-2 text-sm rounded-md focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-violet-600 border border-gray-400">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="relative ms-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span className="p-1 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-gray-800"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </span>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50 focus:border-violet-600 border border-gray-400"
          />
        </div>
      </div>
      <div>
        {loading
          ? Array.from({ length: 6 }, (_, idx) => (
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
          : books?.map((book) => (
              <Link
                to={`/books/${book.id}`}
                key={book.id}
                className="flex items-center p-4 border-b hover:bg-slate-400/30 cursor-pointer"
              >
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-16 h-16 rounded-md"
                />
                <div className="flex flex-col ml-4">
                  <h2 className="text-lg font-medium">{book.title}</h2>
                </div>
              </Link>
            ))}
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

export default Home;
