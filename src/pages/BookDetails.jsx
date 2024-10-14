import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocalDb } from "../lib/LocalDb";

function BookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(
    LocalDb.isInWishlist(bookId)
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://gutendex.com/books/${bookId}`)
      .then((response) => {
        setBookDetails(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId]);

  const handleAddToWishlist = () => {
    LocalDb.addToWishlist(bookId);
    setIsInWishlist(true);
  };

  const handleRemoveFromWishlist = () => {
    LocalDb.removeFromWishlist(bookId);
    setIsInWishlist(false);
  };

  return (
    <div>
      {loading ? (
        <div className="flex md:flex-row flex-col m-8 rounded shadow-md animate-pulse h-96">
          <div className="md:w-[50%] w-full md:h-auto h-96 rounded-t bg-gray-300"></div>
          <div className="flex-1 px-4 py-8 space-y-4 md:p-8 bg-gray-50">
            <div className="w-full h-6 rounded bg-gray-300"></div>
            <div className="w-full h-6 rounded bg-gray-300"></div>
            <div className="w-3/4 h-6 rounded bg-gray-300"></div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-3 m-8">
          <div className="min-h-72">
            <img
              src={bookDetails.formats["image/jpeg"]}
              alt={bookDetails.title}
              className="w-full rounded-t"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{bookDetails.title}</h2>
              <div className="text-blue-600 flex flex-row flex-wrap gap-1">
                <p className="text-gray-800">Authors:</p>
                {bookDetails.authors.map((author, _) => (
                  <p key={_}>{author.name}</p>
                ))}
              </div>
              <div className="pt-2 flex flex-row items-center gap-3">
                {!isInWishlist ? (
                  <button
                    onClick={handleAddToWishlist}
                    className="rounded-full p-2 shadow shadow-gray-500 hover:shadow-gray-600"
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveFromWishlist}
                    className="rounded-full p-2 shadow shadow-gray-500 hover:shadow-gray-600"
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </button>
                )}
                <p>({isInWishlist ? "Added" : "Add"} to wish list)</p>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <a
                  target="_blank"
                  href={bookDetails.formats["text/html"]}
                  className="inline-flex w-auto items-center divide-x rounded bg-green-600 hover:bg-green-700 text-gray-100 divide-gray-300"
                >
                  <span className="px-3 py-1font-semibold">Read</span>
                  <span className="px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z" />
                    </svg>
                  </span>
                </a>
                <p className="font-light">
                  Total download:{" "}
                  <span className="font-normal">
                    {bookDetails.download_count}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
