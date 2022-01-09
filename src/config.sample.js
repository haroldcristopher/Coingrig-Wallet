// import {LogBox} from 'react-native';

const CONFIG = {};

process.env.TESTNET = false;

// LogBox.ignoreLogs(['Easing']);

CONFIG.APP_VERSION = '1.3.3 (40)';
CONFIG.BUILD_NUMBER = 40;
CONFIG.TESTNET = process.env.TESTNET;
CONFIG.COINGRIG_KEY = '';
CONFIG.DEFAULT_DERIVATION_KEY = 0;
CONFIG.PIN_ANDROID_TIMEOUT = 180; // seconds
CONFIG.BALANCE_TIMEOUT = 10; // seconds
CONFIG.NEW_ASSET_DESCRIPTOR_VERSION = 1;
CONFIG.COVALENT_KEY = '';
CONFIG.MIGRATION_KEY = '@MIGRATION_KEY';
CONFIG.INIT_KEY = '@init';

// CONFIG.testNFTs = '';

export default CONFIG;
