import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {Colors} from 'utils/colors';
import {buyFromGuardarian, buyFromRamp, RampProviders} from 'services/ramp';
import ActionSheet from 'react-native-actions-sheet';
import {SmallButton} from 'components/smallButton';
import {formatNoComma, openLink, sleep} from 'utils';
import {WalletStore} from 'stores/wallet';
import {showMessage} from 'react-native-flash-message';

const fiatSheet: React.RefObject<any> = createRef();

export default function SellComponent({coin, chain, price}) {
  const {t} = useTranslation();
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);
  const [amount, setAmount] = useState('$100');
  const [conversion, setConversion] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardEnabled(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardEnabled(false);
    });

    formatAmount('$100');

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buy = async (provider, currency) => {
    const val = amount.replace('$', '');
    if (Number(val) < 50) {
      showMessage({
        message: 'Minimum $50',
        type: 'warning',
      });
      return;
    }
    const w = WalletStore.getWalletByCoinId(coin, chain);
    const address = WalletStore.getWalletAddressByChain(w?.chain!);
    if (provider === 'ramp') {
      const link = await buyFromRamp(val, currency, coin, address);
      openLink(link);
    } else {
      fiatSheet.current?.hide();
      const link = await buyFromGuardarian(val, currency, coin, address, chain);
      openLink(link);
    }
  };

  const formatAmount = v => {
    const val = v.replace('$', '');
    const formattedValue: any = formatNoComma(val);
    setConversion(Number(formattedValue) / price);
    setAmount('$' + formattedValue);
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={{flexDirection: 'column'}}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={v => formatAmount(v)}
            value={amount}
            placeholder={'$0'}
            keyboardType={'numeric'}
            numberOfLines={1}
            returnKeyType="done"
            placeholderTextColor="gray"
            autoCompleteType={'off'}
            autoCapitalize={'none'}
            textAlign="center"
            autoCorrect={false}
            allowFontScaling={true}
            autoFocus={true}
          />
          <Text style={{color: Colors.lighter, fontSize: 12}}>
            {'\u2248 ' + conversion.toFixed(4) + ' ' + coin}
          </Text>
        </View>
        <Text style={styles.title}>Select Provider:</Text>
        <View style={{marginHorizontal: 16, marginVertical: 10}}>
          <TouchableOpacity
            style={styles.card}
            onPress={async () => {
              if (keyboardEnabled) {
                Keyboard.dismiss();
              }
              await sleep(500);
              fiatSheet.current?.show();
            }}>
            <Image
              source={RampProviders.guardarian.image}
              style={{width: 50, height: 50, borderRadius: 100}}
            />
            <Text style={styles.providerText}>
              {RampProviders.guardarian.name}
            </Text>
            <Image
              source={RampProviders.guardarian.methods}
              style={{width: 100, height: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        //@ts-ignore
        ref={fiatSheet}
        keyboardShouldPersistTaps="always"
        // gestureEnabled={true}
        headerAlwaysVisible
        containerStyle={styles.editContainer}>
        <Text style={styles.editTitle}>{t('Choose currency')}</Text>
        <SmallButton
          text={t('USD')}
          onPress={() => buy('guardarian', 'USD')}
          color={Colors.foreground}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: Colors.background,
            borderColor: Colors.foreground,
            borderWidth: 1,
            width: '70%',
          }}
        />
        <SmallButton
          text={t('EUR')}
          onPress={() => buy('guardarian', 'EUR')}
          color={Colors.foreground}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: Colors.background,
            borderColor: Colors.foreground,
            borderWidth: 1,
            width: '70%',
          }}
        />
        <SmallButton
          text={t('GBP')}
          onPress={() => buy('guardarian', 'GBP')}
          color={Colors.foreground}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: Colors.background,
            borderColor: Colors.foreground,
            borderWidth: 1,
            width: '70%',
            marginBottom: 30,
          }}
        />
      </ActionSheet>
    </ScrollView>
  );
}
