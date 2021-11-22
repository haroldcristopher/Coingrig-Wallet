const CONFIG = {};

process.env.TESTNET = true;

CONFIG.APP_VERSION = '1.2.0 (27)';
CONFIG.BUILD_NUMBER = 27;
CONFIG.TESTNET = process.env.TESTNET;
CONFIG.DEFAULT_DERIVATION_KEY = 0;
CONFIG.PIN_ANDROID_TIMEOUT = 180; // seconds
CONFIG.BALANCE_TIMEOUT = 10; // seconds
CONFIG.NEW_ASSET_DESCRIPTOR_VERSION = 1;
CONFIG.COVALENT_KEY = '';
CONFIG.MIGRATION_KEY = '@MIGRATION_KEY';
CONFIG.INIT_KEY = '@init';

export default CONFIG;
