import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setProduct } from './action';
import { getCurrentPage, getProduct } from './selector';
import './App.css';

function App() {
  const url = 'https://jsonplaceholder.typicode.com/comments';
  const itemsPerPage = 10;
  const pageRange = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProduct(json));
      });
  };

  const product = useSelector(getProduct);
  const currentPage = useSelector(getCurrentPage);

  const totalPages = Math.ceil(product.length / itemsPerPage);

  const getPageRange = (currentPage) => {
    console.log("currentPage", currentPage);
    const pageBlock = Math.ceil(currentPage / pageRange);
    console.log("pageBlock", pageBlock);
    const start = (pageBlock - 1) * pageRange + 1;
    const end = Math.min(pageBlock * pageRange, totalPages);
    return { start, end };
  };

  const goToPreviousPage = () => {
    const { start } = getPageRange(currentPage);
    if (currentPage > 1) {
      dispatch(setCurrentPage(start - 1));
    }
  };

  const goToNextPage = () => {
    const { end } = getPageRange(currentPage);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(end + 1));
    }
  };

  const { start, end } = getPageRange(currentPage);

   const changePage = (page) => {
    dispatch(setCurrentPage(page));
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
