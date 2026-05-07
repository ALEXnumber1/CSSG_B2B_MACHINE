const https = require('https');

https.get('https://rdap.verisign.com/com/v1/domain/globalservices-ven.com', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const registrar = parsed.entities.find(e => e.roles.includes('registrar'));
      console.log('Registrar Info:', registrar ? registrar.vcardArray[1][1][3] : 'Not found');
    } catch (e) {
      console.error(e);
    }
  });
});
