const request = require('request');
const fs = require('fs');

const eventID = process.argv[2];
const EVENT = require(`../../public/event/${eventID}.json`);
const tw = require(`../../public/lang/${eventID}.json`);
const EVENT_LIST = {
  18: 'sgdq-2016',
  19: 'agdq-2017',
  20: 'sgdq-2017',
  22: 'agdq-2018',
  23: 'sgdq-2018',
  24: 'gdqx',
  25: 'agdq-2019',
  26: 'sgdq-2019',
};
const gameToPk = {};
EVENT.run.forEach((element) => {
  let name = element.fields.name;
  name = name.replace('é', 'e');
  name = name.toLowerCase();
  gameToPk[name] = element.pk;
  name = name.replace(':', '');
  gameToPk[name] = element.pk;
  if (gameToPk[element.fields.run_time]) {
    console.log('[same duration]', name);
  }
  gameToPk[element.fields.run_time] = element.pk;
});
const gdqvod = {
  url: `http://gdqvods.com/event/${EVENT_LIST[eventID]}/`,
  method: 'GET',
};

request(gdqvod, (error, response, body) => {
  const data = JSON.parse(body.split('<script>var runData = ')[1].split(';</script><script src="//code.jquery.com')[0]);
  Object.values(data).forEach((element) => {
    if (!gameToPk[element.game.name.toLowerCase()]) {
      if (!gameToPk[element.duration]) {
        console.log('[not exist]', element.game.name);
      } else {
        if (tw[gameToPk[element.duration]]){
          console.log(element.game.name, ' <=> ', tw[gameToPk[element.duration]].tw);
        } else {
          console.log('[undefine]', element.game.name);
          return;
        }
        if (tw[gameToPk[element.duration]].yt !== '') {
          // console.log("already exist", gameToPk[element.duration], element.game.name.toLowerCase(), element.duration);
        } else if (element.links.primary_youtube) {
          // console.log('!!!!!',element.game.name, tw[gameToPk[element.duration]].tw);
          if (element.links.primary_youtube.start){
            tw[gameToPk[element.duration]].yt = element.links.primary_youtube.id + '&t=' + element.links.primary_youtube.start;
          } else {
            tw[gameToPk[element.duration]].yt = element.links.primary_youtube.id;
          }
        }
        if (tw[gameToPk[element.duration]].vod !== '') {
          console.log('[already exist]', gameToPk[element.duration], tw[gameToPk[element.duration]].tw, element.game.name.toLowerCase(), element.duration);
        } else if (element.links.primary_twitch) {
          if (element.links.primary_twitch.start) {
            tw[gameToPk[element.duration]].vod = element.links.primary_twitch.stripped_id + '&t=' + element.links.primary_twitch.start;
          } else {
            tw[gameToPk[element.duration]].vod = element.links.primary_twitch.stripped_id;
          }
        }
      }
    } else {
      if (tw[gameToPk[element.game.name.toLowerCase()]].yt !== '') {
        // console.log("already exist", gameToPk[element.game.name.toLowerCase()], element.game.name.toLowerCase());
      } else if (element.links.primary_youtube) {
        if (element.links.primary_youtube.start) {
          tw[gameToPk[element.game.name.toLowerCase()]].yt = element.links.primary_youtube.id + '&t=' + element.links.primary_youtube.start;
        } else {
          tw[gameToPk[element.game.name.toLowerCase()]].yt = element.links.primary_youtube.id;
        }
      }
      if (tw[gameToPk[element.game.name.toLowerCase()]].vod !== '') {
        console.log('[already exist]', gameToPk[element.game.name.toLowerCase()], tw[gameToPk[element.game.name.toLowerCase()]].tw, element.game.name.toLowerCase());
      } else if (element.links.primary_twitch) {
        if (element.links.primary_twitch.start) {
          tw[gameToPk[element.game.name.toLowerCase()]].vod = element.links.primary_twitch.stripped_id + '&t=' + element.links.primary_twitch.start;
        } else {
          tw[gameToPk[element.game.name.toLowerCase()]].vod = element.links.primary_twitch.stripped_id;
        }
      }
    }
  });
  fs.writeFile(`${eventID}.json`, JSON.stringify(tw, null, 4), (err) => {
    if (err) throw err;
    console.log('saved!');
  });
});
