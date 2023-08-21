import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setProduct } from './action';
import { getCurrentPage, getProduct } from './selector';
import './App.css';

function Pagination() {
  const url = 'https://jsonplaceholder.typicode.com/comments';
  const itemsPerPage = 4;
  const pageRange = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    response(0, 5);
  }, []);

  const response = async (start, end) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setProduct({totalCount: json.length, product: json.filter((pr, index) => index >= ((start-1) * 4) && index < (end*4))}));
      });
  };

  const productDetails = useSelector(getProduct);
  const { totalCount, product } = productDetails;
  const currentPage = useSelector(getCurrentPage);

  console.log("productDetails", productDetails);

  const getPageRange = (currentPage) => {
    const pageBlock = Math.ceil(currentPage / pageRange);
    const start = (pageBlock - 1) * pageRange + 1;
    const end = Math.min(pageBlock * pageRange, totalCount);
    return { start, end };
  };

  const goToPreviousPage = () => {
    const { start } = getPageRange(currentPage);
    if (currentPage > 1) {
      dispatch(setCurrentPage(start - 1));
    }
  };

  const goToNextPage = () => {
    const { start, end } = getPageRange(currentPage);
    if (currentPage < totalCount) {
      response(start+5, end+5);
      dispatch(setCurrentPage(end + 1));
    }
  };

  const { start, end } = getPageRange(currentPage);

   const changePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const startIdx = (currentPage - start) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalCount);

  const productResponseRange = product.slice(startIdx, endIdx);

  const isPreviousButtonHidden = currentPage <= pageRange;
  const isNextButtonHidden = currentPage >= totalCount || currentPage + pageRange > totalCount;

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
              role="link"
              onClick={() => changePage(page)}
              style={{ cursor: 'pointer', fontWeight: page === currentPage ? 'bold' : 'normal' }}
            >
              {page}
            </a>
          </p>
        ))}
        {isNextButtonHidden || end === totalCount ? null : (
          <p style={{ margin: '10px' }}>
            <a
              style={{ cursor: 'pointer' }}
              onClick={goToNextPage}
              disabled={currentPage === totalCount}
            >
              Next Page
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Pagination;
