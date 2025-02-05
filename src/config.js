'use strict';

const { release } = require('./package.json');

module.exports.USE_SUDO = process.env.USE_SUDO || (process.getuid() !== 0);
module.exports.SUDO_STRING = module.exports.USE_SUDO ? 'sudo -n ' : '';
module.exports.RELEASE = release;
module.exports.LISTEN_IP = process.env.LISTEN_IP || '0.0.0.0';
module.exports.PORT = process.env.PORT || 51821;
module.exports.PASSWORD = process.env.PASSWORD;
module.exports.WG_PATH = process.env.WG_PATH || '/etc/wireguard/';
module.exports.WG_HOST = process.env.WG_HOST;
module.exports.WG_PORT = process.env.WG_PORT || 51820;
module.exports.WG_MTU = process.env.WG_MTU || null;
module.exports.WG_PERSISTENT_KEEPALIVE = process.env.WG_PERSISTENT_KEEPALIVE || 0;
module.exports.WG_DEFAULT_ADDRESS = process.env.WG_DEFAULT_ADDRESS.replace(/\.x$/, '.0/24') || '10.8.0.0/24';
module.exports.WG_DEFAULT_DNS = typeof process.env.WG_DEFAULT_DNS === 'string'
  ? process.env.WG_DEFAULT_DNS
  : '1.1.1.1';
module.exports.WG_ALLOWED_IPS = process.env.WG_ALLOWED_IPS || '0.0.0.0/0, ::/0';
module.exports.ENFORCE_WG_ALLOWED_IPS = Boolean(process.env.ENFORCE_WG_ALLOWED_IPS || false);

module.exports.WG_PRE_UP = process.env.WG_PRE_UP || '';
module.exports.WG_POST_UP = process.env.WG_POST_UP || `
iptables -t mangle -A PREROUTING -i wg0 -j MARK --set-mark 0x30 -m comment --comment "wg-easy rule";
iptables -t nat -A POSTROUTING ! -o wg0 -m mark --mark 0x30 -j MASQUERADE -m comment --comment "wg-easy rule";
iptables -A INPUT -p udp -m udp --dport ${module.exports.WG_PORT} -j ACCEPT -m comment --comment "wg-easy rule";
iptables -A FORWARD -i wg0 -j ACCEPT -m comment --comment "wg-easy rule";
iptables -A FORWARD -o wg0 -j ACCEPT -m comment --comment "wg-easy rule";
`.split('\n').join(' ');

module.exports.WG_PRE_DOWN = process.env.WG_PRE_DOWN || 'iptables-save | grep -vF "wg-easy rule" | iptables-restore';
module.exports.WG_POST_DOWN = process.env.WG_POST_DOWN || '';
