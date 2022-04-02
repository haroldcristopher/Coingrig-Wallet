const apps = [
  {
    title: 'hub.swap',
    screen: 'SwapScreen',
    image: require('../assets/hub/swap.png'),
    keywords: 'swap, schimb, exchange',
    categories: ['defi', 'featured', 'home'],
    description: 'hub.swap.description',
    enable: true,
    module: true,
  },
  {
    title: 'market.market',
    screen: 'MarketScreen',
    image: require('../assets/hub/chart.png'),
    keywords: 'market, piata, marche',
    categories: ['market', 'featured'],
    description: 'hub.market.description',
    enable: true,
    module: true,
  },
  {
    title: 'title.crypto_news',
    screen: 'CryptoNewsScreen',
    image: require('../assets/hub/newspaper.png'),
    keywords: 'stiri, news, nouvelles',
    categories: ['market', 'featured', 'news'],
    description: 'hub.crypto_news.description',
    enable: true,
    module: true,
  },
  {
    title: 'title.stock_news',
    screen: 'StockNewsScreen',
    image: require('../assets/hub/news2.png'),
    keywords: 'stiri, news, nouvelles',
    categories: ['market', 'featured', 'news'],
    description: 'hub.stock_news.description',
    enable: true,
    module: true,
  },
  {
    title: 'settings.walletconnect',
    screen: 'WalletconnectScreen',
    image: require('../assets/hub/wc.png'),
    keywords: 'walletconnect',
    categories: ['tools', 'defi', 'featured', 'home'],
    description: 'hub.wc.description',
    enable: true,
    module: true,
  },
  {
    title: 'hub.portfolio_sumamry',
    screen: 'SummaryScreen',
    image: require('../assets/hub/pie-chart.png'),
    keywords: 'pie, chart, summary',
    categories: ['tools'],
    description: 'hub.portfolio_sumamry.description',
    enable: true,
    module: true,
  },
  {
    title: 'hub.synthetics',
    screen: 'SyntheticScreen',
    image: require('../assets/hub/paper.png'),
    keywords: 'swap, schimb, exchange',
    categories: ['defi'],
    description: 'hub.synthetics.description',
    enable: true,
    module: true,
  },
  {
    title: 'hub.card',
    screen: 'CardScreen',
    image: require('../assets/hub/card.png'),
    keywords: 'card, debit',
    categories: ['card'],
    description: 'hub.card.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.index',
    screen: 'IndexScreen',
    image: require('../assets/hub/etf.png'),
    keywords: 'index, etf, invest',
    categories: ['defi'],
    description: 'hub.index.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.earn',
    screen: 'IndexScreen',
    image: require('../assets/hub/savings.png'),
    keywords: 'index, etf, invest, dobanda',
    categories: ['defi'],
    description: 'hub.earn.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.web3browser',
    screen: '',
    image: require('../assets/hub/browser.png'),
    keywords: 'web',
    categories: ['defi', 'tools'],
    description: 'hub.browser.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.portfolio_tracker',
    screen: '',
    image: require('../assets/hub/portfolio.png'),
    keywords: 'portfolio, portofoliu, tracker',
    categories: ['defi', 'tools'],
    description: 'hub.portfolio_tracker.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.create_token',
    screen: 'NewsScreen',
    image: require('../assets/hub/lego.png'),
    keywords: 'token, create, erc20',
    categories: ['tools'],
    description: 'hub.create_token.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.create_nft',
    screen: 'NewsScreen',
    image: require('../assets/hub/nft.png'),
    keywords: 'create, nft',
    categories: ['tools'],
    description: 'hub.create_nft.description',
    enable: false,
    module: true,
  },
  {
    title: 'hub.discover_coins',
    screen: 'https://www.coingecko.com/en/discover',
    image: require('../assets/hub/coingecko.png'),
    keywords: 'discover, coins',
    categories: ['market'],
    description: 'hub.coingecko.description',
    enable: true,
    module: false,
  },
  {
    title: 'hub.ico_calendar',
    screen: 'https://coinmarketcap.com/ico-calendar/',
    image: require('../assets/hub/coinmarketcap.png'),
    keywords: 'ico, calendar',
    categories: ['market'],
    description: 'hub.coinmarketcap.description',
    enable: true,
    module: false,
  },
  {
    title: 'hub.economic_calendar',
    screen: 'https://tradingeconomics.com/calendar',
    image: require('../assets/hub/te.png'),
    keywords: 'economic, calendar',
    categories: ['market'],
    description: 'hub.tradingeconomics.description',
    enable: true,
    module: false,
  },
  {
    title: 'hub.donate_ukraine',
    screen: 'https://donate.thedigital.gov.ua/',
    image: {uri: 'https://assets.coingrig.com/images/ua.png'},
    keywords: 'ukraine',
    categories: ['home'],
    description: 'hub.donate_ukraine.description',
    enable: true,
    module: false,
  },
];

export default apps;
