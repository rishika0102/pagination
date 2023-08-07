import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const url = 'https://jsonplaceholder.typicode.com/comments';
  const itemsPerPage = 10;
  const pageRange = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      });
  };

  const totalPages = Math.ceil(product.length / itemsPerPage);
  console.log("totalPages", totalPages);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        console.log("prev", prev);
        const prevPageInCurrentRange = prev - (prev % pageRange === 0 ? pageRange : prev % pageRange);
        return prevPageInCurrentRange > 0 ? prevPageInCurrentRange : 1;
      });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => (prev % pageRange === 0 ? prev + 1 : prev + (pageRange - (prev % pageRange)) + 1));
    }
  };

  const getPageRange = (currentPage) => {
    debugger
    const pageBlock = Math.ceil(currentPage / pageRange);
    const start = (pageBlock - 1) * pageRange + 1;
    const end = Math.min(pageBlock * pageRange, totalPages);
    return { start, end };
  };

  const { start, end } = getPageRange(currentPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const productResponseRange = product.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isPreviousButtonHidden = currentPage <= pageRange;
  const isNextButtonHidden = currentPage >= totalPages || currentPage + pageRange > totalPages;

  const pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Product discount</th>
          </tr>
        </thead>
        <tbody>
          {productResponseRange.map((pr, index) => (
            <tr key={index}>
              <td>{pr.email}</td>
              <td>{pr.postId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {isPreviousButtonHidden ? null : (
          <p style={{ margin: '10px' }}>
            <a
              style={{ cursor: 'pointer' }}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </a>
          </p>
        )}
        {pageNumbers.map((page) => (
          <p style={{ margin: '10px' }} key={page}>
            <a
              onClick={() => changePage(page)}
              style={{ cursor: 'pointer', fontWeight: page === currentPage ? 'bold' : 'normal' }}
            >
              {page}
            </a>
          </p>
        ))}
        {isNextButtonHidden || end === totalPages ? null : (
          <p style={{ margin: '10px' }}>
            <a
              style={{ cursor: 'pointer' }}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
