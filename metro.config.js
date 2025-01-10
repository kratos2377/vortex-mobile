const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, realModuleName, platform) => {
  if (realModuleName === 'react-native-wagmi-charts') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/react-native-wagmi-charts/lib/module/index.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, realModuleName, platform);
};

module.exports = config;