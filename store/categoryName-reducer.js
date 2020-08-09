import { ADD_CATEGORY, SET_CATEGORY, DELETE_CATEGORY } from './categoryName-action';
import Category from '../model/category';

const initialState = {
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        categories: action.categories.map(
          im => new Category(im.id.toString(), im.categoryNm)
        )
      };
    case ADD_CATEGORY:
      const newCategory = new Category(
        action.itemData.id.toString(),
        action.itemData.categoryNm
      );
      return {
        categories: state.categories.concat(newCategory)
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.cid
        )
        
      };
    default:
      return state;
  }
};


