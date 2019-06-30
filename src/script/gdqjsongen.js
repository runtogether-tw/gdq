const request = require('request');
const fs = require('fs');

const eventID = 26;
const gdqrun = {
  url: `https://gamesdonequick.com/tracker/search/?type=run&event=${eventID}`,
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

  fs.writeFile(`${eventID}.json`, data, (err) => {
    if (err) throw err;
    console.log('saved!');
  });
});
