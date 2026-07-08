const dns = require('dns');
const net = require('net');

const host = 'ep-curly-mountain-at92hbt7.c-9.us-east-1.aws.neon.tech';
const port = 5432;

console.log(`Resolving DNS for ${host}...`);
dns.lookup(host, { family: 4 }, (err, address, family) => {
  if (err) {
    console.error('DNS Lookup Failed:', err);
    return;
  }
  console.log(`DNS Resolved successfully: ${address} (family: IPv${family})`);

  console.log(`Attempting TCP connection to ${address}:${port}...`);
  const socket = new net.Socket();
  socket.setTimeout(5000);

  socket.on('connect', () => {
    console.log('TCP Connection Succeeded!');
    socket.destroy();
  });

  socket.on('timeout', () => {
    console.error('TCP Connection Timed Out!');
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('TCP Connection Failed:', err);
  });

  socket.connect(port, address);
});
