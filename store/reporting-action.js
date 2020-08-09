import React from 'react';
import { insertItem, fetchSums, removeItem, removeAll } from '../data/db';

export const SET_BDITEMS = 'SET_BDITEMS';



export const getSums = () => {
    return async dispatch => {
      try {
        const dbResult = await fetchSums();
        dispatch({ type: SET_BDITEMS, ctgrAndSums: dbResult.rows._array });
      } catch (err) {
        throw err;
      }
    };
  };

  
  export const deleteFromSQL = (id) => {
    
    return async dispatch => {
      try {
        const dbResult = await removeItem(
            id
        );
      } catch (err) {
        throw err;
        
      }
      getSums();
  
    };
  };

  export const deleteAllSQL = () => {
    return async dispatch => {
      try {
        const dbResult = await removeAll();
      } catch (err) {
        throw err;
      }
    };
  };

  export const insertToSQL = (id, categoryNm, itemNm, amount, insDate) => {
    return async dispatch => {
      try {
        const dbInsert = await insertItem(id, categoryNm, itemNm, amount, insDate);
        const dbResult = await fetchSums();
        dispatch({ type: SET_BDITEMS, ctgrAndSums: dbResult.rows._array });
      } catch (err) {
        throw err;
        
      }
    };
  };

  