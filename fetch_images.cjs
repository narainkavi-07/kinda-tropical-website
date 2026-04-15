const https = require('https');

const urls = [
  'https://do512.com/venues/kinda-tropical',
  'https://www.northarrowstudio.com/commercial/kinda-tropical',
  'https://heyaustin.com/listing/kinda-tropical/kinda-tropical-08/'
];

urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const imgMatches = [...data.matchAll(/<img[^>]*src="([^"]+)"/ig)];
      console.log(`URL: ${url}`);
      imgMatches.slice(0, 5).forEach(m => console.log(`  Img: ${m[1]}`));
      console.log('');
    });
  }).on('error', err => console.error(err));
});
