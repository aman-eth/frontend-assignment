import React from "react";
import "./App.css";
import useFetchData from "./hooks/useFetchData";
import usePagination from "./hooks/usePagination";

const AppContent = () => {
  const { data, loading, error } = useFetchData(
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json",
  );

  const { currentData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(data, 5);

  if (loading)
    return (
      <div role="status" aria-live="polite">
        Loading...
      </div>
    );
  if (error)
    return (
      <div role="alert" aria-live="assertive">
        Error: {error.message}
      </div>
    );

  return (
    <div>
      <h1>Highly-rated kickstarter projects data</h1>
      <table aria-labelledby="table-header">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage funded</th>
            <th scope="col">Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item?.["s.no"]}>
              <td>{item?.["s.no"]}</td>
              <td>{item?.["percentage.funded"]}</td>
              <td>{item?.["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;
