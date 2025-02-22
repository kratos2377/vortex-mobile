const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, realModuleName, platform) => {
  return context.resolveRequest(context, realModuleName, platform);
};

config.resolver.extraNodeModules.crypto = require.resolve("expo-crypto");

module.exports = config;