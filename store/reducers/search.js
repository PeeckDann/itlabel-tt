import {FETCH_DATA} from '../actions/search';
import Repository from '../../models/repository';
import Organization from '../../models/organization';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      const quantity =
        action.result.total_count < 20 ? action.result.total_count : 20;
      const newItems = [];
      if (action.itemType) {
        for (let i = 0; i < quantity; ++i) {
          const newItem = new Repository(
            action.result.items[i].id,
            action.result.items[i].name,
            action.result.items[i].language,
            action.result.items[i].description,
          );
          newItems.push(newItem);
        }
      } else {
        for (let i = 0; i < quantity; ++i) {
          const newItem = new Organization(
            action.result.items[i].id,
            action.result.items[i].login,
          );
          newItems.push(newItem);
        }
      }
      return {items: newItems};
    default:
      return state;
  }
};