const request = require('request');
const fs = require('fs');

const eventID = process.argv[2];
const gdqrun = {
  url: `https://gamesdonequick.com/tracker/search/?type=run&event=${eventID}`,
  method: 'GET',
  json: true,
};
const gdqrunner = {
  url: 'https://gamesdonequick.com/tracker/search/?type=runner',
  method: 'GET',
  json: true,
};

let res;
let tmpset = [];
request(gdqrun, (error, response, body) => {
  res = {};
  res.run = body;
  body.forEach((element) => {
    tmpset = [...tmpset, ...element.fields.runners];
  });
  tmpset = new Set(tmpset);
  request(gdqrunner, (runnererror, runnerresponse, runnerbody) => {
    let runneroutput = [];
    runnerbody.forEach((element) => {
      if (tmpset.has(element.pk)) {
        runneroutput.push(element);
      }
    });
    res.runner = runneroutput;
    const data = JSON.stringify(res, null, 4);
    fs.writeFile(`data-${eventID}.json`, data, (err) => {
      if (err) throw err;
      console.log('saved!');
    });
  });
});
