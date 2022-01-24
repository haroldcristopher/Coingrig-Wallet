import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';
import {SIZE} from 'utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    height: 200,
    width: '100%',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -2,
    borderRadius: 20,
  },
  pills: {
    backgroundColor: Colors.darker,
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  bigText: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Bold',
    color: Colors.foreground,
    marginTop: '10%',
    marginHorizontal: '20%',
  },
  roundBtn: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.foreground,
    alignItems: 'center',
    borderRadius: 50,
  },
  deleteBtn: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#d9534f',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemtext: {fontWeight: 'bold', color: Colors.foreground},
  title: {
    fontSize: 17,
    fontFamily: 'RobotoSlab-Bold',
    color: Colors.foreground,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 0,
  },
  title2: {
    fontSize: 12,
    fontFamily: 'RobotoSlab-Bold',
    color: 'white',
    marginTop: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  change: {
    color: 'white',
    textAlign: 'center',
    padding: 3,
    marginTop: 3,
    fontFamily: 'RobotoSlab-Bold',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
  },
  roundb: {
    textAlign: 'center',
    marginTop: 5,
    color: Colors.foreground,
  },
  unconfValue: {
    justifyContent: 'center',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
  },
  unconfTxt: {
    color: Colors.foreground,
    fontSize: 15,
    marginBottom: 5,
    flex: 1.5,
    textAlign: 'left',
    alignSelf: 'center',
  },
  smallCard: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: Colors.card,
    padding: 20,
    width: '85%',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  btnCointainers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 45,
    marginBottom: 10,
    alignSelf: 'center',
    width: '75%',
  },
  chart: {
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 10,
  },
  coins: {
    color: Colors.lighter,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    color: Colors.foreground,
    paddingLeft: 20,
  },
  subTitleTop: {
    fontSize: 14,
    fontFamily: 'RobotoSlab-Regular',
    color: Colors.foreground,
    marginLeft: 20,
    marginTop: 5,
  },
  smallContainer: {
    flexDirection: 'row',
    marginHorizontal: 0,
    marginVertical: 2,
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
  },
  textItem: {marginLeft: 10, color: Colors.foreground, flex: 3, fontSize: 13},
  smallTitle: {
    fontSize: 15,
    fontFamily: 'RobotoSlab-Bold',
    color: Colors.foreground,
  },
  logoimg: {
    width: 250,
    height: 250,
    opacity: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -50,
    left: -100,
    zIndex: -1,
  },
  moreBtn: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    paddingRight: 15,
  },
  editContainer: {
    // height: 300,
    margin: 10,
    backgroundColor: Colors.background,
  },
  editTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    fontFamily: 'RobotoSlab-Bold',
    color: Colors.foreground,
  },
  editInput: {
    color: 'black',
    backgroundColor: 'white',
    height: 45,
    width: '70%',
    borderRadius: 30,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 20,
  },
});
