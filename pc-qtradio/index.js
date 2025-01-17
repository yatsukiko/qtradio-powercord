const { get }    = require('powercord/http');
const { Plugin } = require('powercord/entities');

module.exports = class qtradio extends Plugin {
    startPlugin() {
      powercord
        .pluginManager
        .get('pc-commands')
        .register(
          'toggle',
          'Toggle qtradio.moe playback',
          'toggle',
          async () => await get('http://127.0.0.1:3939/togglePlayback')
        )

      powercord
        .pluginManager
        .get('pc-commands')
        .register(
          'volume',
          'Change qtradio.moe volume',
          'volume <number between 1-100>',
          async (args) => await get(`http://127.0.0.1:3939/changeVolume?input=${args}`)
        )

      powercord
        .pluginManager
        .get('pc-commands')
        .register(
          'np',
          'Gives you currently playing qtradio.moe song',
          'np',
          async () => {
            const np = await get('https://qtradio.moe/stats');
            let data = np.body.icestats.source[0];
            if (data === undefined) data = np.body.icestats.source;
            return {
              send: false,
              result: data.artist + ' - ' + data.title
            };
          }
        )
    }

    pluginWillUnload() {
      powercord
        .pluginManager
        .get('pc-commands')
        .unregister('toggle');
      powercord
        .pluginManager
        .get('pc-commands')
        .unregister('volume');
      powercord
        .pluginManager
        .get('pc-commands')
        .unregister('np');
    }
};
