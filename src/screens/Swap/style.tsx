import {StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import {Colors} from 'utils/colors';
import {SIZE} from 'utils/constants';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swapContainer: {
    marginTop: 10,
  },
  swapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.card,
    height: 74,
    marginVertical: 2,
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  details: {
    flexDirection: 'column',
    height: 200,
    padding: 20,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  swapApproveContainer: {
    height: SIZE.height / 2,
    backgroundColor: Colors.card,
    paddingHorizontal: 15,
  },
  connector: {
    width: 36,
    height: 36,
    position: 'absolute',
    backgroundColor: Colors.brick,
    borderRadius: 100,
    top: 60,
    left: windowWidth / 2 - 18,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youPay: {
    color: Colors.lighter,
    fontSize: 13,
  },
  balance: {
    color: Colors.lighter,
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  amount: {
    color: Colors.foreground,
    fontSize: 18,
    marginTop: Platform.OS == 'android' ? 0 : 5,
    paddingRight: 10,
    height: Platform.OS == 'android' ? 40 : 20,
    // backgroundColor: 'red',
    // flex: 1,
  },
  coinText: {
    color: Colors.foreground,
    fontSize: 14,
    flex: 1,
  },
  coin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 30,
    // width: 100,
    justifyContent: 'flex-start',
  },
  tinyLogo: {
    width: 28,
    height: 28,
    padding: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  coinsSheet: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: Colors.background,
  },
  close: {
    position: 'absolute',
    // backgroundColor: Colors.darker,
    width: 36,
    height: 36,
    left: 10,
    top: 15,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    color: Colors.foreground,
  },
  modalTitle: {
    color: Colors.foreground,
    fontSize: 19,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'RobotoSlab-Bold',
  },
  modalBody: {
    textAlign: 'center',
    color: Colors.foreground,
    fontSize: 15,
    margin: 5,
  },
});
