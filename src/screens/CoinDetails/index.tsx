/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, Text, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import {find} from 'lodash';
import FastImage from 'react-native-fast-image';
import {TransitionEnd} from 'utils/hooks';
import {Colors} from 'utils/colors';
import {COINS_MAX, SIZE} from 'utils/constants';
import {styles} from './styles';
import {LineChart} from 'react-native-chart-kit';
import {Loader} from 'components/loader';
import {MarketCapCoinType, MarketStore} from 'stores/market';
import {formatPrice, formatNumber} from 'utils';
import {getAllCoins} from '@coingrig/core';
import {showMessage} from 'react-native-flash-message';
import {CryptoService} from 'services/crypto';

const CoinDetailScreen = observer(({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [price, setPrice] = useState('0');
  const [showScreen, setShowScreen] = useState(false);
  const [coinData, setCoinData] = useState<MarketCapCoinType>();
  const [chartData, setChartData] = useState([]);
  const transitionEnded = TransitionEnd(navigation);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // console.log(route.params.coin.toUpperCase());
    navigation.setOptions({
      headerTitle:
        route.params.title?.toUpperCase() ?? route.params.coin.toUpperCase(),
    });
  }, []);

  useEffect(() => {
    if (transitionEnded) {
      getData();
    }
  }, [transitionEnded]);

  const getData = async () => {
    // get data from coingecko
    const data = await CryptoService.getCoinDetails(route.params.coin);
    if (!data) {
      showMessage({
        message: t('message.error.remote_servers_not_available'),
        type: 'warning',
      });
      setShowScreen(false);
      return;
    }
    const p = formatPrice(data?.market_data.current_price.usd);
    setPrice(p);
    setCoinData(data);
    setChartData(data?.market_data.sparkline_7d?.price ?? []);
    setShowScreen(true);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  const screen = () => {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.lighter}
            colors={[Colors.lighter]}
          />
        }>
        <View style={styles.container}>
          <View style={styles.subcont}>
            <View>
              <Text style={styles.subTitleTop}>{t('coindetails.price')}</Text>
              <Text style={styles.title} adjustsFontSizeToFit numberOfLines={2}>
                {price}
              </Text>
            </View>
            <View style={{marginRight: 20}}>
              <Text style={styles.subTitleTop}>{t('coindetails.change')}</Text>
              <View
                style={[
                  styles.change,
                  {
                    backgroundColor:
                      //@ts-ignore
                      coinData?.market_data.price_change_percentage_24h < 0
                        ? '#d9534f'
                        : '#5cb85c',
                  },
                ]}>
                <Text
                  style={[
                    styles.title2,
                    {
                      fontWeight: 'normal',
                      textAlign: 'right',
                    },
                  ]}
                  adjustsFontSizeToFit
                  numberOfLines={2}>
                  {coinData?.market_data.price_change_percentage_24h.toFixed(2)}
                  %
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.linechart}>
            {chartData.length == 0 ? null : (
              <LineChart
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withHorizontalLines={false}
                useShadowColorFromDataSet={false}
                width={SIZE.width - 15}
                height={160}
                bezier
                withDots={false}
                withVerticalLines={false}
                withOuterLines={false}
                chartConfig={{
                  color: () => Colors.lighter,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  fillShadowGradient: Colors.background,
                  // fillShadowGradientOpacity: 0,
                }}
                style={styles.chart}
                data={{
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
              />
            )}
            <Text style={styles.txtBg}>{t('coindetails.last_7_days')}</Text>
          </View>

          <FastImage
            style={styles.logoimg}
            source={{
              uri: coinData?.image.large,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
          />
          <View style={styles.viewStats}>
            <Text style={styles.subTitle}>
              {coinData?.name + ' ' + t('coindetails.stats')}
            </Text>
          </View>
          <View style={styles.viewStatsDetail}>
            <View style={styles.item}>
              <Text style={styles.itemtext}>#{t('coindetails.rank')}</Text>
              <Text style={styles.textr}>{coinData?.market_cap_rank}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>{t('coindetails.marketcap')}:</Text>
              <Text style={styles.textr}>
                {formatPrice(coinData?.market_data.market_cap.usd)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>{t('coindetails.volume')}:</Text>
              <Text style={styles.textr}>
                {formatPrice(coinData?.market_data.total_volume.usd)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>
                {t('coindetails.all_time_high')}:
              </Text>
              <Text style={styles.textr}>
                {formatPrice(coinData?.market_data.ath.usd)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>{t('coindetails.high_24')}:</Text>
              <Text style={styles.textr}>
                {formatPrice(coinData?.market_data.high_24h.usd)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>{t('coindetails.low_24h')}:</Text>
              <Text style={styles.textr}>
                {formatPrice(coinData?.market_data.low_24h.usd)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>
                {t('coindetails.circulating_supply')}:
              </Text>
              <Text style={styles.textr}>
                {coinData?.market_data.circulating_supply != null
                  ? formatNumber(coinData?.circulating_supply)
                  : '-'}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>
                {t('coindetails.max_supply')}:
              </Text>
              <Text style={styles.textr}>
                {coinData?.market_data.max_supply != null
                  ? formatNumber(coinData?.market_data.max_supply)
                  : '-'}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemtext}>
                {t('coindetails.total_supply')}:
              </Text>
              <Text style={styles.textr}>
                {coinData?.total_supply != null
                  ? formatNumber(coinData?.market_data.total_supply)
                  : '-'}
              </Text>
            </View>
          </View>
          <Text style={styles.coingecko}>
            Market data provided by CoinGecko
          </Text>
        </View>
      </ScrollView>
    );
  };

  const preRender = () => {
    if (showScreen) {
      return screen();
    }
    return <Loader />;
  };

  return preRender();
});

export default CoinDetailScreen;
