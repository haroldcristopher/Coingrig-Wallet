/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WalletStore} from 'stores/wallet';
import {CryptoService} from 'services/crypto';
import DeepLinkService from 'services/deeplink';
import {useTranslation} from 'react-i18next';
import Brick from 'components/Bricks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {ListPrices} from 'components/widgets/listPrices';
import {formatPrice, sleep} from '../../utils';
import {observer} from 'mobx-react-lite';
import {Loader} from 'components/loader';
import NotificationService from 'services/notifications';
import {styles} from './styles';
import {Colors} from 'utils/colors';
import {showMessage} from 'react-native-flash-message';
import {CONFIG_MODULES, CONFIG_PROPERTIES, ConfigStore} from 'stores/config';
import AppsStateService from 'services/appStates';
import {useNavigation} from '@react-navigation/native';
import {SettingsStore} from 'stores/settings';
import {BankStore} from 'stores/bankStore';
import {FiatStore} from 'stores/fiatStore';
import {CexStore} from 'stores/cexStore';
import BigNumber from 'bignumber.js';
// import CustomModal from 'components/Modal';

const DashboardScreen = observer(() => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [showMarketing, setShowMarketing] = useState(false);

  useEffect(() => {
    AppsStateService.coldStart = false;
    // LoadingModal.door.current?.count = 2;
    if (DeepLinkService.data) {
      DeepLinkService.handleDeepLink(DeepLinkService.data);
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingScreen')}
          style={styles.moreBtn}>
          {SettingsStore.mnemonicBackupDone ? null : badge()}
          <Icon3 name="settings-sharp" size={23} color={Colors.foreground} />
        </TouchableOpacity>
      ),
    });
    fetchBalance();
    setShowMarketing(
      ConfigStore.getModuleProperty(
        CONFIG_MODULES.MARKETING_HOME,
        CONFIG_PROPERTIES.MARKETING_HOME.DISPLAY_NEWS,
        false,
      ),
    );
  }, [SettingsStore.mnemonicBackupDone]);

  const badge = () => <View style={styles.badge} />;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBalance();
  }, []);

  const fetchBalance = useCallback(async () => {
    let success = await CryptoService.getAccountBalance();
    if (!success) {
      showMessage({
        message: t('message.error.remote_servers_not_available'),
        type: 'warning',
      });
    }
    setRefreshing(false);
    DeviceEventEmitter.emit('hideDoor');
    await sleep(2000);
    NotificationService.askForPermission();
  }, []);

  const Marketing = () => {
    if (!showMarketing) {
      return null;
    }
    return (
      <View>
        <View style={styles.subContainer}>
          <Icon
            name="info-circle"
            size={15}
            color={Colors.lighter}
            style={styles.icons}
          />
          <Text style={styles.subtitle}>{t('dashboard.coming_soon')}</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoContainer}>
            <Icon2 name="network" size={19} color={Colors.lighter} />
            <Text
              style={styles.infoText}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {t('dashboard.info1')}
            </Text>
          </View>
          <View style={styles.vLine} />
          <View style={styles.infoContainer}>
            <Icon2 name="network" size={19} color={Colors.lighter} />
            <Text
              style={styles.infoText}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {t('dashboard.info2')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const preRender = () => {
    if (WalletStore.wallets.length === 0) {
      return Loader();
    }
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.balance}>{t('dashboard.my_balance')}</Text>
          <Text style={styles.fiatValue} adjustsFontSizeToFit numberOfLines={1}>
            {formatPrice(
              new BigNumber(WalletStore.totalBalance)
                .plus(new BigNumber(BankStore.totalBalance))
                .plus(new BigNumber(FiatStore.totalBalance))
                .plus(new BigNumber(CexStore.totalBalance)),
              true,
            ) || 0.0}
          </Text>
          <View style={{marginTop: 20, width: '100%'}}>
            <View style={styles.subContainer}>
              <Icon
                name="wallet"
                size={15}
                color={Colors.lighter}
                style={styles.icons}
              />
              <Text style={styles.subtitle}>{t('dashboard.wallets')}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 10}}>
              <Brick
                title={'Crypto'}
                key={0}
                value={new BigNumber(WalletStore.totalBalance).plus(
                  new BigNumber(CexStore.totalBalance),
                )}
                icon={'bitcoin'}
                color={'orange'}
              />
              <Brick
                title={'Bank'}
                key={1}
                value={BankStore.totalBalance}
                icon={'bank'}
                color={'#2c8af2'}
              />
              <Brick
                title={'_END_'}
                key={'_END_'}
                icon={'menu'}
                color={Colors.background}
              />
            </ScrollView>
            {Marketing()}
            <View
              style={[styles.subContainer, {marginTop: 10, marginBottom: 5}]}>
              <Icon
                name="list-ul"
                size={15}
                color={Colors.lighter}
                style={styles.icons}
              />
              <Text style={styles.subtitle}>{t('dashboard.top_3_coins')}</Text>
            </View>
            <ListPrices />
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.lighter}
          colors={[Colors.lighter]}
        />
      }>
      {preRender()}
      {/* <CustomModal show={true} /> */}
    </ScrollView>
  );
});

export default React.memo(DashboardScreen);
