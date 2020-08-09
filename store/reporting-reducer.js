import { SET_BDITEMS } from './reporting-action';
import Sums from '../model/sums';

const initialState = {
  ctgrAndSums: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BDITEMS: 
          return {
            ctgrAndSums: action.ctgrAndSums.map(
              im => new Sums(im.categoryNm, im.total)
              )
          };
         
      default:
        return state;
    }
  };
  
