import React, { useEffect, useState} from 'react';
import './App.css';

function App() {

  const url = 'https://jsonplaceholder.typicode.com/comments';
  // const url = 'https://dummyjson.com/products';
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState(5);
  const [number, setNumber] = useState([]);
  let perPage = 5;

  const [hide, setHide] = useState(false);
  const [product, setProduct] = useState([]);
  const response = async() => {
    fetch(url).then(res => res.json()).then((json) => {
      console.log(json);
      const arr = json.filter((fr, index) => index < 82)
      // setProduct(json.products)
      setProduct(arr);
    })
  }

  const size = Math.ceil(product.length/10);
  console.log("size", size);
  console.log("range", range);
  const isNextButtonDisabled = product.length < range*10 ? true : false;
  let totalCount;
  // totalCount = Array.from({ length: size }, (_, index) => index + 1);
  if(size < range) {
    totalCount = Array.from({ length: size }, (_, index) => index + 1);
  } else if(currentPage === 1){
    totalCount = Array.from({ length: range }, (_, index) => index + 1);
  } else {
    const totalNumber = Array.from({ length: size }, (_, index) => index +1);
    (size > range) ? totalCount = totalNumber.slice(range-5, range) : totalCount = totalNumber.slice(range, size);
  }

  useEffect(() => {
    response();
  }, [])

  const changePage = (e, n) => {
    setCurrentPage(n);
    console.log("change page", n);
  }

  const goToPreviousPage = (pageNumber) => {
    console.log("range", range);
    if(size !== range) {
      setPageCount(perPage-5);
      setRange(range-5);
      perPage = perPage -5;
    }
    setCurrentPage(range - 1);
    console.log("previous page", pageNumber);
  }

  const goToNextPage = (pageNumber) => {
    if(size !== range) {
      setPageCount(perPage+5);
      setRange(range+5);
      perPage = perPage + 5;
    }
    setCurrentPage(range + 1);
    // const totalNumber = Array.from({ length: size }, (_, index) => index +1);
    // (size > range) ? totalCount = totalNumber.slice(range, range+5) : totalCount = totalNumber.slice(range, size);
  }
  // console.log("product", product);
  console.log("currentPage", currentPage);
  const productResponseRange = product.filter((pr, index) => {
    if(currentPage == 1) {
      return index+1 <= currentPage*10
    } else {
      return currentPage*10 > index && (currentPage*10 - 10) <= index;
    }
  });

  // const isNextButtonDisabled = (product.length < (range+1)*10) ? true : false;
  console.log("productResponseRange", productResponseRange);

  return (
    <div className="App">
      <table>
        <th>Product Title</th>
        <th>Product discount</th>
        {
          productResponseRange.map((pr) => {
            return (
            <tr>
              <td>{pr.email}</td>
            </tr>
            )
          })
        }
      </table>
      <div style={{display: 'inline-block', display: 'flex'}}>
        { currentPage > 5 ? <p style={{margin: '10px'}}><a style={{cursor: 'pointer'}} onClick={(e) => goToPreviousPage(currentPage)}>Previous Page</a></p> : <></> }
        {
          totalCount.map((n) => {
            return (
            <p style={{margin: '10px'}}><a onClick={(e) => changePage(e, n)} style={{cursor: 'pointer'}}>{n}</a></p>
            )
          })
        }
       <p style={{margin: '10px'}}><a
        style={{
            cursor: isNextButtonDisabled ? 'not-allowed' : 'pointer',
            color: isNextButtonDisabled ? 'gray' : 'inherit',
            pointerEvents: isNextButtonDisabled ? 'none' : 'auto',
          }}
          disabled={isNextButtonDisabled} onClick={(e) => goToNextPage(currentPage)}>Next Page</a></p>
      </div>
    </div>
  );
}

export default App;

