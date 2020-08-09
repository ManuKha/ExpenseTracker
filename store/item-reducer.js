import { ADD_ITEM, SET_ITEMS, DELETE_ITEM, GET_ITEMS } from './item-action';
import Item from '../model/item';

const initialState = {
  items: [],
  categories: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS: 
          return {
              items: action.items.map(
                  im => new Item(im.id.toString(), im.categoryNm, im.itemNm, im.amount, im.insDate)
                  ),
         
          };
      case ADD_ITEM:
        const newItem = new Item(
          action.itemData.id.toString(),
          action.itemData.categoryNm,
          action.itemData.itemNm,
          action.itemData.amount,
          action.itemData.insDate
        );
        return {
            items: state.items.concat(newItem)
        };
    
        case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.iid
        )
        
      };
      default:
        return state;
    }
  };
  
