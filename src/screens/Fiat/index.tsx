import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import React, {createRef, useState} from 'react';
import {Colors} from 'utils/colors';
import {useNavigation} from '@react-navigation/native';
import fx from 'services/fx';
import {SmallButton} from 'components/smallButton';
import ActionSheet from 'react-native-actions-sheet';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {FiatStore} from 'stores/fiatStore';
import {formatNoComma} from 'utils';
import {ILogEvents, LogEvents} from 'utils/analytics';

const editSheet: React.RefObject<any> = createRef();

export default function AddFiat() {
  const navigation = useNavigation();
  const [selected, setselected] = useState(null);
  const [accName, setAccName] = useState('');
  const [accBalance, setAccBalance] = useState('');
  const {t} = useTranslation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setselected(item[0]);
          setAccBalance('');
          setAccName('');
          editSheet.current?.setModalVisible(true);
        }}
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            paddingLeft: 10,
            color: Colors.foreground,
            fontSize: 17,
          }}>
          {item[0]}
        </Text>
        <Text
          style={{
            color: Colors.lighter,
            marginLeft: 10,
            fontSize: 13,
            textAlign: 'right',
          }}>
          {item[1]} USD
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={Object.entries(fx.rates)}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
        maxToRenderPerBatch={10}
        initialNumToRender={15}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: Colors.border}} />
        )}
        style={{
          paddingHorizontal: 16,
        }}
        ListHeaderComponent={null}
        ListFooterComponent={() => <View style={{height: 30}} />}
      />
      <ActionSheet
        //@ts-ignore
        ref={editSheet}
        keyboardShouldPersistTaps="always"
        // gestureEnabled={true}
        // headerAlwaysVisible
        containerStyle={styles.editContainer}>
        <Text style={styles.editTitle}>{t('wallet.add_fiat') + selected}</Text>
        <TextInput
          placeholder="Account name"
          placeholderTextColor={'gray'}
          autoCorrect={false}
          style={styles.editInput}
          value={accName}
          onChangeText={t => setAccName(t)}
        />
        <TextInput
          placeholder={0 + ' ' + selected}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
          style={styles.editInput}
          value={accBalance}
          onChangeText={t => setAccBalance(t)}
        />
        <SmallButton
          text={t('swap.slippage_save')}
          onPress={() => {
            let balanceValue = formatNoComma(accBalance);
            if (!balanceValue) {
              balanceValue = '0';
            }
            let balance = parseFloat(balanceValue);
            FiatStore.addAccount({
              id: Date.now().toLocaleString(),
              balance: balance,
              currency: selected || '',
              name: accName,
              usdBalance: balance / fx.rates[selected!],
            });
            FiatStore.updateTotalBalance(
              FiatStore.totalBalance + balance / fx.rates[selected!],
            );
            editSheet.current?.setModalVisible(false);
            LogEvents(ILogEvents.ACTION, 'AddCash');
            navigation.goBack();
          }}
          color="#f2eded"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#2e2c2c',
            width: '70%',
            marginTop: 20,
          }}
        />
      </ActionSheet>
    </>
  );
}
