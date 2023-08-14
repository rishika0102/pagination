export const setCurrentPage = (page) => {
  console.log("page", page);
  return {
    type: 'SET_CURRENT_PAGE',
    payload: page,
  };
};

export const setProduct = (product) => {
  console.log("product", product);
  return {
    type: 'SET_PRODUCT',
    payload: product,
  };
};
