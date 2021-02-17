var SonicChannelIngest = require('sonic-channel').Ingest;

const contents = [
  [
    'messages',
    'default',
    '1',
    `id 1 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, laborum nisi quae ad ipsam molestias assumenda. Consequatur iste, ducimus explicabo alias veniam maxime! Est, odio vitae eaque asperiores delectus incidunt.`,
  ],
  ['messages', 'default', '2', `id 2 show me the money..`],
  ['messages', 'default', '3', `id 3 給我 看錢.. chinese mix with english`],
  ['messages', 'default', '4', `這全部都是中文 你可以找到我嗎 試試看 哈`],
];
var sonicChannelIngest = new SonicChannelIngest({
  host: 'localhost',
  port: 1491,
  auth: 'SecretPassword',
}).connect({
  connected: function () {
    console.info('Sonic Channel succeeded to connect to host.');
    Promise.all(
      contents.map(([collectionId, bucketId, objectId, text]) => {
        return sonicChannelIngest.push(collectionId, bucketId, objectId, text.toLowerCase());
      }),
    ).then(() => {
      console.log('pushed contents', contents);
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
