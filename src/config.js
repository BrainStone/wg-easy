'use strict';

module.exports.PORT = process.env.PORT || 80;
module.exports.PASSWORD = process.env.PASSWORD || 'wireguard';
module.exports.WG_PATH = process.env.WG_PATH || '/etc/wireguard/';
module.exports.WG_HOST = process.env.WG_HOST || '127.0.0.1';
module.exports.WG_PORT = process.env.WG_PORT || 51820;
module.exports.WG_DEFAULT_ADDRESS = process.env.WG_DEFAULT_ADDRESS || '10.6.0.1/32';