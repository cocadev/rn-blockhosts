import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ModalPlaceBid from "../../Components/ModalPlaceBid";
import { useTheme } from "react-native-paper";
import { Video } from "expo-av";
import { DEMO_AVATAR } from "../../config/keys";
import TimeAgo from 'react-native-timeago';
import LinearButton from "../../Components/LinearButton";
import DescriptionDetail from './descriptionDetail';
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useSelector } from "react-redux";
import { useGetChainId } from "../../hooks/useGetChainId";
import UtilService from "../../utils/utilService";
import { Asset, Enc, EncLazyMint1155Data, EncLazyMint721Data, ERC1155_LAZY, ERC721_LAZY, ETH, Order, SignOrder, ZERO } from "../../utils/LazymintConfig";
import FullLoading from "../../Components/Loadings/fullLoading";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useWalletConnect } from "../../WalletConnect";
import { getWeb3 } from "../../Moralis/getWeb3";

const screenWidth = Dimensions.get('window').width;
const mint721ABI = require("../../config/abis/mint721ABI.json");
const mint1155ABI = require("../../config/abis/mint1155ABI.json");

const SellButton = ({ data, minter, changedPrice }) => {

  const { colors } = useTheme();
  const { token_address, contract_type: type, token_id: ercTokenId, metadata, supply, owner_of, amount, isLazyMint } = data;
  const { chain, brand, category, price } = metadata;
  const { nfts1155 } = useSelector(state => state.nfts)
  const { chainId } = useGetChainId();
  const { isAuthenticated, Moralis } = useMoralis();
  const web3Js = new Web3(Moralis.provider);
  

  const { walletAddress: account } = useMoralisDapp();
  const connector = useWalletConnect();

  const [isFullLoading, setIsFullLoading] = useState(false);
  const [isEditablePriceModal, setIsEditablePriceModal] = useState(false);
  const [isEditableCountsModal, setIsEditableCountsModal] = useState(false);
  const [saleCounts, setSaleCounts] = useState("1");

  const OrderData = Moralis.Object.extend("OrderData");
  const { data: orderdata } = useMoralisQuery("OrderData", query => query.equalTo("tokenId", ercTokenId).notEqualTo('completed', true).descending("createdAt").limit(1));
  const { data: orderPricedata } = useMoralisQuery("OrderData", query => query.equalTo("tokenId", ercTokenId).descending("createdAt"));
  const { data: lazyMints } = useMoralisQuery("LazyMints", query => query.equalTo("tokenId", ercTokenId).limit(1));
  const { data: minterPricedata } = useMoralisQuery("OrderData", query => query.equalTo("tokenId", ercTokenId).ascending("createdAt"));

  const createdOrder = orderdata.length > 0 && orderdata[0].attributes;
  const moralisPrice = orderPricedata.length > 0 && orderPricedata[0].attributes?.price?.toString();
  const lazyMintDataSignature = lazyMints.length > 0 && lazyMints[0].attributes.signature;
  const lazyMintDataTokenURI = lazyMints.length > 0 && lazyMints[0].attributes.tokenURI;

  const finalPrice = createdOrder ? (createdOrder.price || price) : (changedPrice || moralisPrice || price);

  const MINT_PRICE = Moralis.Units.ETH(finalPrice || "0.001");
  const erc1155Data = nfts1155.filter(item => (item.token_id === ercTokenId) && (item.owner_of !== minter?.account));
  const totalSale = erc1155Data.reduce((s, f) => s + Number(f.amount), 0);
  const restAmounts = amount - totalSale;

  const onMakeOrder = async () => {
    const web3Js = await getWeb3({ connector })

    if (type === 'ERC1155') {
      setIsEditableCountsModal(true);
    }

    setIsFullLoading(true);

    const approve_request = {
      chain: chainId,
      contractAddress: type === 'ERC721' ? UtilService.getMint721Address(chainId) : UtilService.getMint1155Address(chainId),
      functionName: "setApprovalForAll",
      abi: type === 'ERC721' ? mint721ABI.abi : mint1155ABI.abi,
      params: {
        operator: UtilService.getMarketAddress(chainId),
        approved: true
      },
    }

    // console.log('body:', approve_request)

    try {
      const data = web3Js.eth.abi.encodeFunctionCall({
        name: 'setApprovalForAll',
        type: 'function',
        abi: type === 'ERC721' ? mint721ABI.abi : mint1155ABI.abi,
        inputs: [
          { type: 'address', name: 'operator' },
          { type: 'bool', name: 'approved' }
        ]
      }, [UtilService.getMarketAddress(chainId), true])

      await connector.sendTransaction({
        data: data,
        from: connector.accounts[0],
        to: type === 'ERC721' ? UtilService.getMint721Address(chainId) : UtilService.getMint1155Address(chainId),
        value: '0x00',
      });
      console.log("~ minted! ~");

      // await Moralis.executeFunction(approve_request);
      setIsFullLoading(false);
    } catch (e) {
      console.log('eeeeeeeeeee', e);
      setIsFullLoading(false);
      return false;
    }
    let left;

    if (type === 'ERC721') {
      console.log("~ are you there 1! ~");

      if (isLazyMint) {
        const encodedMintData = await EncLazyMint721Data(web3Js, UtilService.getMint721Address(chainId), ercTokenId, lazyMintDataTokenURI, account, royalties, lazyMintDataSignature);
        left = Order(account, Asset(ERC721_LAZY, encodedMintData, 1), ZERO, Asset(ETH, "0x", MINT_PRICE), "0x");
      } else {
        console.log("~ are you there 11! ~");

        left = Order(account, Asset(ERC721_LAZY, Enc(web3Js, UtilService.getMint721Address(chainId), ercTokenId), 1), ZERO, Asset(ETH, "0x", MINT_PRICE), "0x");
        console.log("~ are you there 12! ~", left);

      }
    } else {
      if (isLazyMint) {
        const encodedMintData = await EncLazyMint1155Data(web3Js, UtilService.getMint1155Address(chainId), ercTokenId, lazyMintDataTokenURI, supply, account, royalties, lazyMintDataSignature);
        left = Order(account, Asset(ERC1155_LAZY, encodedMintData, Number(saleCounts)), ZERO, Asset(ETH, "0x", MINT_PRICE), "0x");
      } else {
        left = Order(account, Asset(ERC1155_LAZY, Enc(web3Js, UtilService.getMint1155Address(chainId), ercTokenId), 1), ZERO, Asset(ETH, "0x", MINT_PRICE), "0x");
      }
    }

    const signatureLeft = await SignOrder(web3Js, left, account, UtilService.getMarketAddress(chainId));
    console.log("~ are you there 2! ~");

    const orderData = new OrderData();
    const request = {
      signatureLeft,
      maker: left.maker,
      taker: left.taker,
      data: left.data,
      makeAsset_value: left.makeAsset.value,
      makeAsset_assetType_assetClass: left.makeAsset.assetType.assetClass,
      makeAsset_assetType_data: left.makeAsset.assetType.data,
      takeAsset_value: Number(left.takeAsset.value),
      takeAsset_assetType_assetClass: left.takeAsset.assetType.assetClass,
      takeAsset_assetType_data: left.takeAsset.assetType.data,
      tokenId: ercTokenId,
      price: changedPrice || moralisPrice || price,
      completed: false,
      saleCounts
    }

    setIsFullLoading(true);
    console.log("~ are you there 3! ~", request);

    try {
      await orderData.save(request);

      const RealTimeHistory = Moralis.Object.extend("RealTimeHistory");
      const realTimeHistory = new RealTimeHistory();
      realTimeHistory.save({
        account,
        date: new Date(),
        tokenId: ercTokenId,
        tag: 'sale'
      });

      setIsFullLoading(false);
      // navigate('/sales');
    } catch (e) {

      // dispatch(addNotification('Transaction failed!', 'error'))
      setIsFullLoading(false);
    }
  }

  return (
    <View>

      {isFullLoading && <FullLoading />}

      <LinearButton
        title='Sell'
        onClick={() => {
          type === 'ERC721' ? onMakeOrder() : setIsEditableCountsModal(true)
        }} />
      <LinearButton title='Edit Price' onClick={() => setBidModal(true)} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SellButton;
