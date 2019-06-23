const request = require('request');
const fs = require('fs');

const gdqrun = {
  url: 'https://gamesdonequick.com/tracker/search/?type=run&event=26',
  method: 'GET',
  json: true,
};
request(gdqrun, (error, response, body) => {
  const output = {};
  body.forEach((element) => {
    output[element.pk] = {
      tw: element.fields.name,
      sr: '',
      vod: '',
      yt: '',
      gm: '',
    };
  });
  output.logo = '';
  output.yetee_link = '';
  output.gdq_link = '';
  const data = JSON.stringify(output, null, 4);

  fs.writeFile('tw.json', data, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('saved!');
  });
});
