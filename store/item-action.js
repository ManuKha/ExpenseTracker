import React from 'react';
import { insertItem, fetchItems, removeItem } from '../data/db';

import Item from '../model/item';

export const ADD_ITEM = 'ADD_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_ITEMS = 'GET_ITEMS';



  export const deleteItem = itemId => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://rn-complete-guide-5ea60.firebaseio.com/${userId}/${itemId}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      dispatch({ type: DELETE_ITEM, iid: itemId });
    };
  };



export const addItem = (categoryNm, itemNm, amount) => {
  return async (dispatch, getState) => {
    // any async code you want!
    console.log('starting to load to firebase')
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const newDate = new Date();
    const insDate = newDate.toISOString().substring(0, 19);
  
    const response = await fetch(
      `https://rn-complete-guide-5ea60.firebaseio.com/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryNm,
          itemNm,
          amount,
          insDate
        })
      }
    );
    const resData = await response.json();
   insertItem(resData.name, categoryNm,
      itemNm,
      amount,
      insDate);
      
    dispatch({
      type: ADD_ITEM,
      itemData: {
          id: resData.id,
          categoryNm: categoryNm,
          itemNm: itemNm,
          amount: amount,
          insDate: insDate
      }
    });
  };
};


export const loaditems = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-complete-guide-5ea60.firebaseio.com/${userId}.json`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedItems = [];
     
      try {
        for (const key in resData) {
          loadedItems.push(
            new Item(
              key,
              resData[key].categoryNm,
              resData[key].itemNm,
              resData[key].amount,
              resData[key].insDate
            )
          );
            insertItem(key, 
              resData[key].categoryNm,
              resData[key].itemNm,
                resData[key].amount,
                resData[key].insDate)
        }
      }
      catch (err){
        console.log(err)
      }

       const sortedItems = loadedItems.sort((a, b) => b.insDate.localeCompare(a.insDate));
 
      dispatch({ type: SET_ITEMS, items: sortedItems });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};



