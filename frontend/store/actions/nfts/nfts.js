import * as actionTypes from "../actionTypes";
import UtilService from "../../../utils/utilService";
import { PROD } from "../../../config/keys";
var bigInt = require("big-integer");

export const get721Data = (data) => ({
  type: actionTypes.GET_NFT721_DATA,
  payload: data
});
export const get1155Data = (data) => ({
  type: actionTypes.GET_NFT1155_DATA,
  payload: data
});
export const isLoading = (data) => ({
  type: actionTypes.UPDATE_IS_LOADING,
  payload: data
});
export const onGetData = (query, chainId, Web3Api) => {

  return async (dispatch) => {

    dispatch(isLoading(true));

    const allLazyMints = await query.find();

    const mints = allLazyMints.map((item) => {
      return {
        amount: item.attributes.supply || "1",
        contract_type: item.attributes.type || 'ERC721',
        is_valid: 0,
        metadata: null,
        name: "MetaSaltNFT",
        owner_of: item.attributes.creator,
        token_address: item.attributes.type === 'ERC1155' ? UtilService.getMint1155Address(chainId) : UtilService.getMint721Address(chainId),
        token_id: item.attributes.tokenId,
        token_uri: item.attributes.tokenURI,
        lazyMint: true,
        last_metadata_sync: item.attributes.createdAt,
        synced_at: item.attributes.createdAt,
        type: item.attributes.type || 'ERC721',
        supply: item.attributes.supply || 1,
        royaltyFee: item.attributes.royaltyFee || 0,
        privateSale: item.attributes.privateSale || false
      }
    })
    console.log('****** lazy mints ******', mints?.length)
    await filtering(mints)

    if(PROD){
      const c5 = { address: UtilService.getMint721Address('0x1'), chain: UtilService.getChain('0x1') };
      const nftOwners5 = await Web3Api.token.getNFTOwners(c5);
      await filtering(nftOwners5?.result)
      console.log('****** ethereum erc721 ******', nftOwners5?.result?.length)
  
      const c55 = { address: UtilService.getMint1155Address('0x1'), chain: UtilService.getChain('0x1') };
      const nftOwners55 = await Web3Api.token.getNFTOwners(c55);
      await filtering(nftOwners55?.result, 'erc1155')
      console.log('****** ethereum erc1155 ******', nftOwners55?.result?.length)
    }else{

      const c4 = { address: UtilService.getMint721Address('0x3'), chain: UtilService.getChain('0x3') };
      const nftOwners4 = await Web3Api.token.getNFTOwners(c4);
      filtering(nftOwners4?.result)
      console.log('****** ropsten erc721 ******', nftOwners4?.result?.length)
  
      const c45 = { address: UtilService.getMint1155Address('0x3'), chain: UtilService.getChain('0x3') };
      const nftOwners45 = await Web3Api.token.getNFTOwners(c45);
      filtering(nftOwners45?.result, 'erc1155')
      console.log('****** ropsten erc1155 ******', nftOwners45?.result?.length)

      const c3 = { address: UtilService.getMint721Address('0x4'), chain: UtilService.getChain('0x4') };
      const nftOwners3 = await Web3Api.token.getNFTOwners(c3);
      filtering(nftOwners3?.result)
      console.log('****** rinkeby erc721 ******', nftOwners3?.result?.length)
  
      const c35 = { address: UtilService.getMint1155Address('0x4'), chain: UtilService.getChain('0x4') };
      const nftOwners35 = await Web3Api.token.getNFTOwners(c35);
      filtering(nftOwners35?.result, 'erc1155')
      console.log('****** rinkeby erc1155 ******', nftOwners35?.result?.length)
  
      const c2 = { address: UtilService.getMint721Address('0x61'), chain: UtilService.getChain('0x61') };
      const nftOwners2 = await Web3Api.token.getNFTOwners(c2);
      filtering(nftOwners2?.result)
      console.log('****** bsc erc721 ******', nftOwners2?.result?.length)
  
      const c25 = { address: UtilService.getMint1155Address('0x61'), chain: UtilService.getChain('0x61') };
      const nftOwners25 = await Web3Api.token.getNFTOwners(c25);
      filtering(nftOwners25?.result, 'erc1155')
      console.log('****** bsc erc1155 ******', nftOwners25?.result?.length)
  
      const c1 = { address: UtilService.getMint721Address('0x13881'), chain: UtilService.getChain('0x13881') };
      const nftOwners1 = await Web3Api.token.getNFTOwners(c1);
      filtering(nftOwners1?.result)
      console.log('****** mumbai erc721 ******', nftOwners1?.result.length)
  
      const c15 = { address: UtilService.getMint1155Address('0x13881'), chain: UtilService.getChain('0x13881') };
      const nftOwners15 = await Web3Api.token.getNFTOwners(c15);
      filtering(nftOwners15?.result, 'erc1155')
      console.log('****** mumbai erc1155 ******', nftOwners15?.result?.length)
  
    }

    dispatch(isLoading(false));

    async function filtering(myData, erc) {

      const filterData = await Promise.all(myData
        .map(async (item) => {
          if (item.metadata && item.is_valid === 1) {
            return item;
          } else {
            try {
              var postTokenUri = item.token_uri;
              if (item.token_uri.substring(8, 12) === 'ipfs') {
                postTokenUri = item.token_uri.replace(/^.{28}/g, 'https://ipfs.moralis.io:2053')
              }
              const response = await fetch(postTokenUri)
              const ddd = await response.json();
              item.metadata = JSON.stringify(ddd)
              return item
            } catch {
              return item
            }
          }
        }))

        const filtering = filterData.reduce(function (filterd, item) {
          if (!item.metadata) return null
          const { name, price } = JSON.parse(item.metadata);
          // if (moment(item.synced_at) < moment('2022-04-20T07:28:40.376Z')) return null
          if (BLOCKLIST.includes(item.token_id)) return null
          if (!name || !price) return null
          const hextokenId = UtilService.checkHexa(item.token_id) ? item.token_id : '0x' + bigInt(item.token_id).toString(16);
          filterd.push({ ...item, token_id: hextokenId })
          return filterd
        }, [])

        dispatch(!erc ? get721Data(filtering) : get1155Data(filtering))

    }
  }
};

const BLOCKLIST = [
  // '0xbc6f27549a7f3ad4d88c9efe83e6732b024dfe19b00000000000000008400004', 
  // '0xbc6f27549a7f3ad4d88c9efe83e6732b024dfe19b00000000000000008100004',
  // '0xbc6f27549a7f3ad4d88c9efe83e6732b024dfe19b00000000000000008200004',
  // '0x8bdad0bb632e31141c311bc3df82016b795e7a71b00000000000000007800004',
  // '0x8bdad0bb632e31141c311bc3df82016b795e7a71b00000000000000007500004'
]