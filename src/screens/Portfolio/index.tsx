/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import {SegmentedControl, Segment} from 'react-native-resegmented-control';
import WalletListItem from 'components/walletlistitem';
import NFTCard from 'components/NFT/Card';
import {Colors} from 'utils/colors';
import {observer} from 'mobx-react-lite';
import {styles} from './styles';
import {showMessage} from 'react-native-flash-message';
import {IWallet, WalletStore} from 'stores/wallet';
import {CryptoService} from 'services/crypto';
import {formatPrice} from 'utils';
import BigList from 'react-native-big-list';

const PortfolioScreen = observer(() => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [showNFTs, setShowNFTs] = useState(false);
  const [nfts, setNFTs] = useState<any[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchScreen', {onlySupported: true})
          }
          style={styles.moreBtn}>
          <Icon name="add-circle" size={25} color={Colors.foreground} />
        </TouchableOpacity>
      ),
    });
    fetchNFTs();
  }, []);

  const fetchCoins = async () => {
    const fetchedCoins = await CryptoService.getAccountBalance();
    fetchNFTs();
    if (!fetchedCoins) {
      showMessage({
        message: t('message.error.remote_servers_not_available'),
        type: 'warning',
      });
    }
    setRefreshing(false);
  };

  const fetchNFTs = async () => {
    // eslint-disable-next-line no-shadow
    const NFTList: any = await CryptoService.getNFTs();
    setNFTs(NFTList);
  };

  const renderItem = ({item}: {item: IWallet}) => {
    return (
      <WalletListItem
        key={item.cid}
        coin={item}
        onPress={() =>
          //@ts-ignore
          navigation.navigate('WalletScreen', {
            coin: item.cid,
            symbol: item.symbol,
            chain: item.chain,
          })
        }
      />
    );
  };

  const listHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.subLeft}>
          {showNFTs ? t('portfolio.my_nfts') : t('portfolio.my_assets')}
        </Text>
        <Text style={styles.subRight}>
          {showNFTs
            ? t('Ethereum')
            : formatPrice(WalletStore.totalBalance, true) || 0.0}
        </Text>
      </View>
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchCoins();
  }, []);

  const renderNFTs = ({item}) => {
    // console.log(item.image_url);
    if (
      item.image_url === null ||
      item.image_url === '' ||
      item.image_url.includes('svg')
    ) {
      item.image_url = 'https://i.imgur.com/5VXj3Ts.png';
    }
    return <NFTCard item={item} />;
  };

  const changeTab = name => {
    name === 'NFTs' ? setShowNFTs(true) : setShowNFTs(false);
    if (name === 'NFTs' && nfts.length === 0) {
      fetchNFTs();
    }
  };

  const renderList = () => {
    if (!showNFTs) {
      return (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.lighter}
              colors={[Colors.lighter]}
            />
          }
          data={WalletStore.wallets}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.cid + item.chain ?? ''}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeader()}
        />
      );
    } else {
      if (nfts.length > 0) {
        return (
          <BigList
            data={nfts}
            renderItem={renderNFTs}
            itemHeight={250}
            insetBottom={30}
            headerHeight={50}
            renderHeader={listHeader}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.id.toString() ?? ''}
          />
        );
      } else {
        return (
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 180,
                tintColor: 'gray',
                opacity: 0.4,
              }}
              source={require('assets/nft.png')}
              resizeMode="contain"
            />
          </View>
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title} numberOfLines={1}>
            {t('portfolio.portfolio')}{' '}
          </Text>
          <View
            style={{marginRight: 15, justifyContent: 'center', marginTop: 5}}>
            <SegmentedControl
              inactiveTintColor={Colors.lighter}
              initialSelectedName="Coins"
              sliderStyle={{width: '47%'}}
              style={{backgroundColor: Colors.darker, width: 140}}
              onChangeValue={name => changeTab(name)}>
              <Segment name="Coins" content="Coins" />
              <Segment name="NFTs" content="NFTs" />
            </SegmentedControl>
          </View>
        </View>
      </View>
      {renderList()}
    </View>
  );
});

export default PortfolioScreen;
