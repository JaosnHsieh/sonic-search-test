const SonicChannelSearch = require('sonic-channel').Search;

const words = ['lorem', 'dolor sit','lore', 'show','english', '錢', '看錢','我','中文','哈','這全部都是中文 你可以找到我嗎 試試看 哈'];

var sonicChannelSearch = new SonicChannelSearch({
  host: 'localhost',
  port: 1491,
  auth: 'SecretPassword',
}).connect({
  connected: function () {
    console.info('Sonic Channel succeeded to connect to host.');

    words.forEach((word) => {
      sonicChannelSearch
        .suggest('messages', 'default', word.replace(/\s/ig,''))
        .then((results) => {
          console.log('suggest results', word, results);
        }).catch(err=>{
          
        console.log('suggest error',word,err)
        });

      sonicChannelSearch.query('messages', 'default', word,{lang:'none'}).then((results) => {
        console.log('query results', word, results);
      }).catch(err=>{
        console.log('query error',word,err)
      });
      
    });
  },

  disconnected: function () {
    console.error('Sonic Channel is now disconnected.');

    process.exit(1);
  },

  timeout: function () {
    console.error('Sonic Channel connection timed out.');
  },

  retrying: function () {
    console.error('Trying to reconnect to Sonic Channel...');
  },

  error: function (error) {
    console.error('Sonic Channel failed to connect to host.', error);
  },
});
