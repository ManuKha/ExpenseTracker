import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';

import NavigationContainer from './navigation/NavigationContainer';
import itemReducer from './store/item-reducer';
import categoryReducer from './store/categoryName-reducer';
import reportingReducer from './store/reporting-reducer';
import authReducer from './store/auth/auth-reducer';
import { init } from './data/db';
import { initCategory } from './data/dbCategoryAlias';





init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

initCategory()
  .then(() => {
    console.log('Initialized Category database');
  })
  .catch(err => {
    console.log('Initializing dbCategory failed.');
    console.log(err);
  });
  

   const rootReducer = combineReducers({
     items: itemReducer,
     categories: categoryReducer,
     reporting: reportingReducer,
     auth: authReducer
   });
  
   const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  
  export default function App() {
    return (
       <Provider store={store}>
        <NavigationContainer />
       </Provider>
    );
  }
