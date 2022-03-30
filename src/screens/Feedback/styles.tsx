import {StyleSheet} from 'react-native';
import {Colors} from 'utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scrollview: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 0,
  },
  textItem: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.foreground,
    textAlign: 'center',
  },
  title: {
    fontSize: 35,
    color: Colors.foreground,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.lighter,
    marginVertical: 20,
    width: '100%',
    textAlign: 'center',
  },
  warningText: {
    color: Colors.lighter,
    marginHorizontal: 20,
    fontSize: 13,
    textAlign: 'center',
  },
  image: {height: 30, width: 30},
  item: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    marginHorizontal: 2,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    fontSize: 15,
    marginTop: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'solid',
    color: Colors.foreground,
    height: 130,
    flex: 1,
    backgroundColor: Colors.card,
  },
  submitButton: {
    backgroundColor: '#2e2c2c',
    fontFamily: 'RobotoSlab-Bold',
    width: '70%',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
