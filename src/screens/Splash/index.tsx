/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import SS from 'react-native-splash-screen';
import * as RNLocalize from 'react-native-localize';
import {
  deleteUserPinCode,
  hasUserSetPinCode,
} from '@haskkor/react-native-pincode';
import {useTranslation} from 'react-i18next';
import {Colors} from 'utils/colors';
import {StorageGetItem} from 'services/storage';
import {MigrationService} from 'services/migrations';
import {ConfigStore} from 'stores/config';
import CONFIG from 'config';
import {Logs} from 'services/logs';
var ccxt = require('ccxt');

const SplashScreen: FC = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();

  ConfigStore.initializeConfig();

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const exchangeId = 'binance';
    const exchangeClass = ccxt[exchangeId];
    let exchange = new exchangeClass({
      apiKey: '-',
      secret: '-',
    });
    // exchange.verbose = true;
    const b = await exchange.fetchBalance();

    for (const [key, v] of Object.entries(b.total)) {
      if (v > 0) {
        console.log(`${key}: ${v}`);
      }
    }

    console.log(await exchange.fetchDepositAddress('BTC'));
    console.log('--', await exchange.fetchTicker('BTC/USDT'));
    return;

    if (await MigrationService.migrationRequired()) {
      await MigrationService.handleMigrations();
      Logs.info('Migration completed');
    } else {
      Logs.info('Nothing to migrate');
    }
    const lng = await StorageGetItem('@lng', false);
    if (lng) {
      //@ts-ignore
      i18n.changeLanguage(lng);
    } else {
      const local = RNLocalize.getLocales();
      Logs.info('Phone local: ', local);
      if (local.length > 0 && local[0].languageCode) {
        i18n.changeLanguage(local[0].languageCode);
      }
    }
    checkPin();
    SS.hide();
  };

  const checkPin = async () => {
    let hasPin = await hasUserSetPinCode();
    let isInit = await StorageGetItem(CONFIG.INIT_KEY, false);
    CONFIG.navigation = navigation;
    if (hasPin && isInit) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'EnterPinScreen'}],
        }),
      );
    } else {
      await deleteUserPinCode();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'OnBoardingScreen'}],
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{height: 100, tintColor: Colors.foreground}}
        resizeMode="contain"
        source={require('../../assets/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 40,
    letterSpacing: 1,
  },
});

export default SplashScreen;
