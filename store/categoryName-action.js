
import { insertCategory, loadCategories, removeCategory } from '../data/dbCategoryAlias';


export const ADD_CATEGORY = 'ADD_CATEGORY';
export const SET_CATEGORY = 'SET_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const fetch = () => {
  return async dispatch => {
    try {
      const dbResult = await loadCategories();
      dispatch({ type: SET_CATEGORY, categories: dbResult.rows._array });

    } catch (err) {
      throw err;
    }
  };
};

export const deleteCategory = categoryId => {
  return async dispatch => {
    try {
      const dbResult = await removeCategory(
        categoryId
      );
    } catch (err) {
      throw err;
      
    }
    dispatch({ type: DELETE_CATEGORY, cid: categoryId });

  };
};

export const addCategory = (categoryNm) => {
  return async dispatch => {
    try {
      const dbResult = await insertCategory(
        categoryNm
      );
      if (dbResult.insertId > 0) {
        dispatch({
          type: ADD_CATEGORY,
          itemData: {
            id: dbResult.insertId,
            categoryNm: categoryNm
          }
        });
      }

    } catch (err) {
      throw err;
    }
  };

};


