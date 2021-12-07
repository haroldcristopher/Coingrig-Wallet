import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';

export const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 25,
    paddingBottom: 10,
  },
  previewText: {
    fontSize: 19,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'RobotoSlab-Regular',
    color: Colors.lighter,
  },
  selectNetwork: {
    marginTop: 15,
    marginLeft: 15,
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.foreground,
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {flex: 1, color: Colors.foreground, fontSize: 15},
  inputView: {
    flex: 1,
    minHeight: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 0,
    borderColor: Colors.brick,
    marginHorizontal: 15,
    backgroundColor: Colors.card,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chain: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  contractData: {
    color: Colors.foreground,
    fontSize: 15,
    marginVertical: 5,
  },
  pill: {
    backgroundColor: Colors.inputBackground,
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: Colors.brick,
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 20,
    // minWidth: 100,
    flex: 1,
    // alignSelf: 'flex-start',
  },
  moreBtn: {
    justifyContent: 'center',
    marginRight: 10,
    paddingLeft: 10,
  },
});
