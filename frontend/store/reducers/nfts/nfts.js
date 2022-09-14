import { GET_NFT721_DATA, GET_NFT1155_DATA, UPDATE_IS_LOADING } from "../../actions/actionTypes";
import { updateObject } from "../utility";
import _ from 'underscore';

const initialState = {
  nfts: [],
  nfts1155: [],
  loading: false,
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_NFT721_DATA:
      const myData1 = [...state.nfts, ...action.payload]?.sort(function (a, b) {
        return new Date(b.last_metadata_sync) - new Date(a.last_metadata_sync)
      })
      const uniqueData1 = _.uniq(myData1, function (item) {
        return item.token_id;
      });
      return updateObject(state, {
        nfts: uniqueData1
      });

    case GET_NFT1155_DATA:
      const myData2 = [...state.nfts1155, ...action.payload]?.sort(function (a, b) {
        return new Date(b.last_metadata_sync) - new Date(a.last_metadata_sync)
      })
      const uniqueData2 = _.uniq(myData2, function (item) {
        return item.block_number;
      });
      return updateObject(state, {
        nfts1155: uniqueData2
      });
    case UPDATE_IS_LOADING:
      return updateObject(state, {
        loading: action.payload
      });
    default:
      return state;
  }
}

export default reducer;