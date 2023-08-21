import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import store from './store';
import Pagination from './Pagination';
import { setProduct, setCurrentPage } from './action';

describe('pagination component', () => {

  const useSelectorMock = jest.fn();
  const mockStore = configureStore([]);
  // jest.mock('react-redux', () => ({
  //   ...jest.requireActual('react-redux'),
  //   useSelector: jest.fn(),
  // // }));
  // jest.mock('react-redux', () => ({
  //   useSelector: jest.fn().mockImplementation(selector => selector()),
  // }));

  // jest.mock('./selector.js', () => ({
  //   getProduct: jest.fn().mockReturnValue("getProduct"),
  // }));

  // beforeEach(() => {
  //   useSelector.mockImplementation(callback => callback(templates));
  // });
  // const useSelectorMock = jest.mock('react-redux');
  // const selectorValue = jest.spyOn(reactRedux, 'useSelector');
  // {
  //   preloadedState = {},
  //   store = configureStore({ reducer: { user: rootReducer }, preloadedState })
  // } = {}
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  // console.log("useSelectorMock", useSelectorMock);
  // console.log("selectorValue", selectorValue);

  it('render pagination page', () => {

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    expect(screen.getByText('Product Title')).toBeInTheDocument();
    expect(screen.getByText('Product discount')).toBeInTheDocument();
  });

  it('check currentPage', async () => {
    const currentPage = 5;

    useSelectorMock.mockReturnValue(currentPage);

    render (
      <Provider store={store}>
        <Pagination/>
      </Provider>
    );

    const pageNumberElement = await screen.findByText('5', { selector: 'p > a' });
    expect(pageNumberElement).toBeInTheDocument();
    expect(screen.getByText('Next Page')).toBeInTheDocument();
  });

  it('dispatch action and set products', () => {
    const initialState = {
      currentPage: 1,
      totalCount: 0,
      product: [],
    };
    const store = mockStore(initialState);

    const productData = {
      totalCount: 500,
      product: {
        postId: 1,
        id: 1,
        name: 'test',
        email: 'test@email.com',
        body: 'testing',
      },
    };

    const expectedActions = [
      {
        type: 'SET_PRODUCT',
        payload: productData,
      },
    ];

    store.dispatch(setProduct({ totalCount: productData.totalCount, product: productData.product }));

    const actions = store.getActions();
    console.log("actions", actions);
    expect(actions).toEqual(expectedActions);
  });

  it('dispatch action and set current page', () => {
    const initialState = {
      currentPage: 1,
      totalCount: 0,
      product: [],
    };

    const store = mockStore(initialState);

    const currentPageData = 11;

     const expectedActions = [
      {
        type: 'SET_CURRENT_PAGE',
        payload: currentPageData,
      },
    ];

    store.dispatch(setCurrentPage(currentPageData));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions)
  })

});
