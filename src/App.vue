<template>
  <div id="app">
    <v-app>
      <v-btn
        dark
        fab
        color="#212121"
        class="twitchbtn"
        v-on:click="twitchopen()"
        title="觀看直播"
      >
        <v-icon>fab fa-twitch</v-icon>
      </v-btn>
      <v-layout v-if="rendertwitch" row class="twitchlayout" :class="{twitchshow: opentwitch}">
        <v-flex class="twitchvideo">
          <iframe id="twitchvideo" width="100%" height="100%" frameborder="0" framespacing="0" src="https://player.twitch.tv/?channel=gamesdonequick&autoplay=false">
          </iframe>
        </v-flex>
        <v-flex class="twitchchat">
          <iframe id="twitchchat" frameborder="0" scrolling="no" src="https://www.twitch.tv/embed/tetristhegrandmaster3/chat?darkpopout" height="100%" width="340px">
          </iframe>
        </v-flex>
      </v-layout>
      <v-container class="mb-4">
        <audio id="BaoAlert">
          <source :src="'https://code.responsivevoice.org/getvoice.php?t=\''+alertselect+'\'&tl=zh-CN'" type="audio/mpeg">
        </audio>
        <v-tabs icons-and-text centered dark color="teal"
        show-arrows
        prev-icon="fas fa-arrow-circle-left"
        next-icon="fas fa-arrow-circle-right">
          <v-tabs-slider color="teal lighten-5"></v-tabs-slider>
          <v-tab href="#menu-1">
            Next
            <v-icon>fas fa-gamepad</v-icon>
          </v-tab>
          <v-tab href="#menu-2">
            Notification
            <v-icon>fas fa-bell</v-icon>
          </v-tab>
          <v-tab href="#menu-3">
            Info
            <v-icon>fas fa-info-circle</v-icon>
          </v-tab>
          <v-tab-item value="menu-1">
            <v-card class="cardbg pa-2" flat>
              <v-layout row wrap justify-space-around align-center>
                <v-flex xs3 v-if="!loading">
                  <v-card>
                    <v-img
                      :src="getPic(sdList[nowplaying].name)"
                      height="300px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-start flexbox>
                            <span class="Ctitle headline white--text">UP Next</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-title primary-title>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="headline">{{sdList[nowplaying].name}}</v-flex>
                        <v-flex xs12>{{sdList[nowplaying].tw.tw}}<a v-if="sdList[nowplaying].tw.sr!=''" :href="'https://www.speedrun.com/'+sdList[nowplaying].tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a></v-flex>
                        <v-flex xs12 class="grey--text">準備時間: {{sdList[nowplaying].setup_time}}</v-flex>
                        <v-flex xs12 class="grey--text">預計時間: {{sdList[nowplaying].run_time}}</v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="!loading">
                  <v-card>
                    <v-img
                      :src="twJSON['logo']"
                      height="300px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-start flexbox>
                            <span class="Ctitle headline white--text">UP Next</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-title primary-title pa-3>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="grey--text">現在時間</v-flex>
                        <v-flex xs12 class="headline">{{nowdate.getHours().toString().padStart(2,0)}}:{{nowdate.getMinutes().toString().padStart(2,0)}}</v-flex>
                        <v-flex xs12>{{(nowdate.getMonth()+1).toString().padStart(2,0)}}/{{nowdate.getDate().toString().padStart(2,0)}}</v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="!loading">
                  <v-card v-if="(nowplaying+1)<=(sdList.length-1)">
                    <v-img
                      :src="getPic(sdList[nowplaying+1].name)"
                      height="300px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-start flexbox>
                            <span class="Ctitle headline white--text">UP Next</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-title primary-title>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="headline">{{sdList[nowplaying+1].name}}</v-flex>
                        <v-flex xs12>{{sdList[nowplaying+1].tw.tw}}<a v-if="sdList[nowplaying+1].tw.sr!=''" :href="'https://www.speedrun.com/'+sdList[nowplaying+1].tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a></v-flex>
                        <v-flex xs12 class="grey--text">準備時間: {{sdList[nowplaying+1].setup_time}}</v-flex>
                        <v-flex xs12 class="grey--text">開始時間: {{(sdList[nowplaying+1].starttime.getMonth()+1).toString().padStart(2,0)}}/{{sdList[nowplaying+1].starttime.getDate().toString().padStart(2,0)}} {{sdList[nowplaying+1].starttime.getHours().toString().padStart(2,0)}}:{{sdList[nowplaying+1].starttime.getMinutes().toString().padStart(2,0)}}</v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-btn color="teal" title="重新整理資訊" v-on:click="refresh()"><v-icon style="color:#E0F2F1">fas fa-sync-alt</v-icon></v-btn>
              <v-btn color="teal" title="Youtube頻道" href="https://www.youtube.com/user/gamesdonequick/videos" target="_blank"><v-icon style="color:#E0F2F1">fab fa-youtube</v-icon></v-btn>
            </v-card>
          </v-tab-item>
          <v-tab-item value="menu-2">
            <v-card class="cardbg pa-2" flat>
              <v-layout row wrap justify-space-around>
                <v-flex xs12>
                  <div v-if="notification.length === 0">你可以點擊節目表上的鬧鐘按鈕來加入提醒清單，我們將在節目開始時提醒您。</div>
                  <div>請依照自己喜好調整通知系統強度。</div>
                  <div>使用提醒功能時，建議將此頁面獨立成一個視窗，放置於背景分頁會因為瀏覽器節省資源而不播放背景音效。</div>
                </v-flex>
                <v-flex xs3>
                  <v-select
                  :items="alertitem"
                  v-model="alertselect"
                  label="提醒強度"
                  class="input-group--focused"
                  item-text="state"
                  item-value="alerttext"
                  append-icon="fas fa-sort-down"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <div>- 提醒清單 -</div>
                </v-flex>
              </v-layout>
              <template v-if="!loading">
                <v-layout class="slayout" :class="{end: (sdList[i].starttime.getTime() < nowdate.getTime())}" row wrap v-for="i in notification" :key="i">
                  <v-flex class="sbl" xs1>
                    <div>{{(sdList[i].starttime.getMonth()+1)|time}}/{{sdList[i].starttime.getDate()|time}}</div>
                  </v-flex>
                  <v-flex class="sbl" xs1>
                    <div>{{sdList[i].starttime.getHours()|time }}:{{sdList[i].starttime.getMinutes()|time}}</div>
                  </v-flex>
                  <v-flex class="sbl" xs4>
                    <div>{{sdList[i].name}}</div>
                  </v-flex>
                  <v-flex class="sbl" xs4>
                    <div>{{sdList[i].runners}}</div>
                  </v-flex>
                  <v-flex class="sbl slast" xs2>
                    <div>{{sdList[i].category}}</div>
                  </v-flex>
                  <v-flex class="sbl" xs1>
                    <div>{{sdList[i].console}}</div>
                  </v-flex>
                  <v-flex class="sbl" xs4>
                    <div>{{sdList[i].tw.tw}}</div><a v-if="sdList[i].tw.sr!=''" :href="'https://www.speedrun.com/'+sdList[i].tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a>
                  </v-flex>
                  <v-flex align-center class="sbl" xs5>
                    <div></div>
                  </v-flex>
                  <v-flex class="sbl slast" xs2>
                    <v-btn v-on:click="DeleteNotification(i)" color="pink darken-3"><v-icon style="color:#E0F2F1">far fa-bell-slash</v-icon></v-btn>
                  </v-flex>
                </v-layout>
              </template>
            </v-card>
          </v-tab-item>
          <v-tab-item value="menu-3">
            <v-card class="cardbg pa-2" flat>
              <v-flex xs12>彩學台:</v-flex>
              <v-flex xs12>
                <v-btn title="Twitch頻道" color="teal" href="https://www.twitch.tv/tetristhegrandmaster3" target="_blank"><v-icon style="color:#E0F2F1">fab fa-twitch</v-icon></v-btn>
                <v-btn title="Google節目表單" color="teal" :href="twJSON['google_link']" target="_blank"><v-icon style="color:#E0F2F1">fas fa-th-list</v-icon></v-btn>
              </v-flex>
              <v-flex xs12>GDQ官方:</v-flex>
              <v-flex xs12>
                <v-btn title="Twitch頻道" color="teal" href="https://www.twitch.tv/gamesdonequick" target="_blank"><v-icon style="color:#E0F2F1">fab fa-twitch</v-icon></v-btn>
                <v-btn title="官方網站" color="teal" href="https://gamesdonequick.com/" target="_blank"><v-icon style="color:#E0F2F1">fas fa-gamepad</v-icon></v-btn>
                <v-btn title="節目表" color="teal" href="https://gamesdonequick.com/schedule/" target="_blank"><v-icon style="color:#E0F2F1">far fa-calendar-alt</v-icon></v-btn>
                <v-btn title="捐款系統" color="teal" :href="'https://gamesdonequick.com/tracker/index/'+twJSON['gdq_link']" target="_blank"><v-icon style="color:#E0F2F1">fas fa-money-check-alt</v-icon></v-btn>
                <v-btn title="抽獎獎品" color="teal" :href="'https://gamesdonequick.com/tracker/prizes/'+twJSON['gdq_link']" target="_blank"><v-icon style="color:#E0F2F1">fas fa-trophy</v-icon></v-btn>
                <v-btn title="解禁項目" color="teal" :href="'https://gamesdonequick.com/tracker/bids/'+twJSON['gdq_link']" target="_blank"><v-icon style="color:#E0F2F1">fas fa-gavel</v-icon></v-btn>
              </v-flex>
              <v-flex xs12>其他:</v-flex>
              <v-flex xs12>
                <v-btn title="GDQ VOD" color="teal" href="http://gdqvods.com/" target="_blank"><v-icon style="color:#E0F2F1">fas fa-video</v-icon></v-btn>
                <v-btn title="GDQ Stat" color="teal" href="http://gdqstat.us/" target="_blank"><v-icon style="color:#E0F2F1">fas fa-chart-bar</v-icon></v-btn>
                <v-btn title="/r/Speedrun" color="teal" href="https://www.reddit.com/r/speedrun/" target="_blank"><v-icon style="color:#E0F2F1">fab fa-reddit-alien</v-icon></v-btn>
                <v-btn title="The Yetee紀念T恤" color="teal" :href="'https://theyetee.com/collections/'+this.twJSON['yetee_link']" target="_blank"><v-icon style="color:#E0F2F1">fas fa-tshirt</v-icon></v-btn>
                <v-btn title="Fangamer紀念品商店" color="teal" href="https://www.fangamer.com/collections/games-done-quick" target="_blank"><v-icon style="color:#E0F2F1">fas fa-gift</v-icon></v-btn>
              </v-flex>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <v-tabs grow icons-and-text centered dark color="teal"
        show-arrows
        v-model="tabs"
        prev-icon="fas fa-arrow-circle-left"
        next-icon="fas fa-arrow-circle-right">
          <v-tabs-slider color="teal lighten-5"></v-tabs-slider>
          <v-tab v-for="(i,index) in dateArr" :key="'slide-'+index" :href="'#tab-'+index">
            {{(i.date.getMonth()+1).toString().padStart(2,0)+'/'+i.date.getDate().toString().padStart(2,0)}}
            <v-icon>far fa-calendar-alt</v-icon>
          </v-tab>
        </v-tabs>
        <v-layout v-if="!loading" class="sticky slayout" row wrap>
          <v-flex class="stl" xs1>
            開始時間
          </v-flex>
          <v-flex class="stl" xs4>
            遊戲名稱
          </v-flex>
          <v-flex class="stl" xs4>
            玩家
          </v-flex>
          <v-flex class="stl" xs1>
            預估時間
          </v-flex>
          <v-flex class="stl slast" xs2>
            規則
          </v-flex>
        </v-layout>
        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="(i,index) in dateArr" :key="'tab-'+index" :value="'tab-'+index">
            <template v-if="!loading">
              <v-layout class="slayout" :class="{ end: (i.starttime.getTime() < nowdate.getTime()),now:(i.pk === sdList[nowplaying].pk) }" row wrap v-for="i in SliceList(index)" :key="i.pk">
                <v-flex class="sbl" xs1>
                  <div>{{i.starttime.getHours().toString().padStart(2,0)}}:{{i.starttime.getMinutes().toString().padStart(2,0)}}</div>
                </v-flex>
                <v-flex class="sbl" xs4>
                  <div>{{i.name}}</div>
                </v-flex>
                <v-flex class="sbl" xs4>
                  <div>{{i.runners}}</div>
                </v-flex>
                <v-flex class="sbl" xs1>
                  <div>{{i.run_time}}</div>
                </v-flex>
                <v-flex class="sbl slast" xs2>
                  <div>{{i.category}}</div>
                </v-flex>
                <v-flex class="sbl" xs1>
                  <div>{{i.console}}</div>
                </v-flex>
                <v-flex class="sbl" xs4>
                  <div>{{i.tw.tw}}</div><a v-if="i.tw.sr!=''" :href="'https://www.speedrun.com/'+i.tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a>
                </v-flex>
                <v-flex align-center class="sbl" xs5>
                  <v-layout row wrap justify-space-around>
                    <v-flex xs6 v-for="j in i.runnersArr" :key="'runner'+index+j">
                      {{rnList[j].name}}:
                      <a :href="rnList[j].stream" target="_blank"><v-icon v-if="rnList[j].stream!=''">fab fa-twitch</v-icon></a>
                      <a :href="'https://twitter.com/'+rnList[j].twitter" target="_blank"><v-icon v-if="rnList[j].twitter!=''">fab fa-twitter</v-icon></a>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="sbl slast" xs2>
                  <v-btn v-on:click="InsertNotification(sdList.indexOf(i))" color="teal" v-if="(!i.notification)&&((i.starttime.getTime() > nowdate.getTime()))"><v-icon style="color:#E0F2F1">far fa-bell</v-icon></v-btn>
                  <v-btn v-on:click="DeleteNotification(sdList.indexOf(i))" color="pink darken-3" v-if="(i.notification)&&((i.starttime.getTime() > nowdate.getTime()))"><v-icon style="color:#E0F2F1">far fa-bell-slash</v-icon></v-btn>
                </v-flex>
              </v-layout>  
            </template>
          </v-tab-item>
        </v-tabs-items>
        <v-layout class="pa-3" v-if="loading">
          <v-flex xs12>
            <v-progress-circular :size="70" :width="7" indeterminate color="teal"></v-progress-circular>
            <v-flex xs12 style="font-size:2rem;">
              資料讀取中...
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'App',
  data(){
    return {
      tabs: 0,
      rendertwitch: false,
      opentwitch: false,
      twJSON:[],
      dateArr:[],
      sdList: [],
      rnList: [],
      notification: [],
      alertitem: [{"state":"弱","alerttext":"節目快開始了骯骯骯骯骯骯骯骯骯骯"},
                  {"state":"中","alerttext":"節目快開始了骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯"},
                  {"state":"強","alerttext":"節目快開始了骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯"}],
      alertselect: "節目快開始了骯骯骯骯骯骯骯骯骯骯",
      nowdate: null,
      loading: true,
      nowplaying: 0,
    };
  },
  watch: {
    nowplaying: function (val) {
      if(this.notification.includes(val)){
        //Clear old notification from list
        this.notification = this.notification.filter(element => element >= val);
        this.DeleteNotification(val);
        document.getElementById("BaoAlert").load();
        document.getElementById("BaoAlert").play();
      }
    }
  },
  filters: {
    time: function (value) {
      return value.toString().padStart(2,0);
    }
  },
  methods: {
    SliceList(index){
      return this.sdList.filter(e => e.starttime.getDate() === this.dateArr[index].date.getDate());
    },
    getPic(gname){
      if((gname === "Pre-Show")||(gname === "Preshow")
        ||(gname === "FINALE")||(gname === "Finale")){
        return this.twJSON["logo"];
      }
      return "https://static-cdn.jtvnw.net/ttv-boxart/"+gname+"-285x380.jpg";
    },
    async getRequest (url) {
      let Jdata = await (await (fetch(url, {cache: "no-cache"})
        .then(res => {
          return res.json();
        })
        .catch(err => {
          console.log('Error: ', err);
        })
      ));
      return Jdata;
    },
    getPage(){
      for(let i = this.tabs;i<this.dateArr.length;i++){
        if(this.nowdate.getTime() < this.dateArr[0].time){
          this.tabs = 'tab-'+0;
        }else if(i===this.dateArr.length-1){
          if(this.nowdate.getTime() > this.dateArr[i].time){
            this.tabs = 'tab-'+i;
          }
        }else{
          if((this.nowdate.getTime() > this.dateArr[i].time)&&(this.nowdate.getTime() < this.dateArr[i+1].time)){
            this.tabs = 'tab-'+i;
          }
        }
      }
    },
    clock(){
      this.nowdate = new Date();
      this.getCurrentGame();
      this.getPage();
      return this.nowdate;
    },
    setclock(){
      let n = this.clock();
      let time_wait = Math.ceil(n.getTime()/60000)*60000 - n.getTime();
      setTimeout(()=>{
        this.clock();
        setInterval(this.clock, 60000);
      }, time_wait);
    },
    setNotification(){
      //init
      if(!localStorage.getItem("notification")){
        this.notification = [];
        localStorage.setItem("notification", JSON.stringify(this.notification));
      }else{
        this.notification = JSON.parse(localStorage.getItem("notification"));
      }
    },
    InsertNotification(id){
      this.notification.push(id);
      this.sdList[id].notification = true;
      this.notification.sort(function(a, b) {
        return a - b;
      });
      localStorage.setItem("notification", JSON.stringify(this.notification));
    },
    DeleteNotification(id){
      this.notification = this.notification.filter(item => item !== id);
      this.sdList[id].notification = false;
      localStorage.setItem("notification", JSON.stringify(this.notification));
    },
    getCurrentGame(){
      for(let i=this.nowplaying;i<this.sdList.length;i++){
        if(i===0){
          if(this.nowdate.getTime() < this.sdList[i].endtime.getTime()){
            this.nowplaying = i;
          }
        }else if(i===this.sdList.length-1){
          if(this.nowdate.getTime() > this.sdList[i].starttime.getTime()){
            this.nowplaying = i;
          }
        }else{
          if((this.nowdate.getTime() > this.sdList[i-1].endtime.getTime())&&(this.nowdate.getTime() < this.sdList[i].endtime.getTime())){
            this.nowplaying = i;
          }
        }
      }
    },
    async getList(RequestJSON){
      let ListJSON = RequestJSON.run;
      let RunnerJSON = RequestJSON.runner;
      ListJSON.forEach((element,index) => {
        let s = new Date(element.fields.starttime);
        this.sdList.push({
          "pk": element.pk,
          "name":element.fields.name,
          "console":element.fields.console,
          "category":element.fields.category.replace("any%","Any%"),
          "setup_time": element.fields.setup_time,
          "starttime": s,
          "run_time": element.fields.run_time,
          "endtime": new Date(element.fields.endtime),
          "runners":element.fields.deprecated_runners,
          "runnersArr":element.fields.runners,
          "notification":this.notification.includes(index),
          "tw": this.twJSON[element.pk] || "",
        });
        if(!this.dateArr.find(e => e.date.getDate() === s.getDate())){
          this.dateArr.push({
            "date":s,
            "time":s.getTime()
          });
        }
      });
      RunnerJSON.forEach((element,index) => {
        this.rnList[element.pk] = element.fields;
      });
      this.loading = false;
    },
    async getJSON () {
      this.twJSON = await this.getRequest('./tw.json');
      let RequestJSON = await this.getRequest('//crs-dlbot.herokuapp.com/gdq');
      this.getList(RequestJSON);
      this.setclock();
    },
    refresh(){
      this.loading = true;
      this.sdList.length = 0;
      this.getJSON();
    },
    twitchopen(){
      if(!this.rendertwitch){
        this.rendertwitch=true;
      }
      this.opentwitch=!this.opentwitch;
      if(this.opentwitch){
        document.body.classList.add("scrolllock");
      }
      else{
        document.body.classList.remove("scrolllock");
      }
    },
  },
  mounted(){
    this.setNotification();
    this.getJSON();
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
* {
    font-family: 'Noto Sans TC';
}
body{
  margin:0;
  background-color: #6CABA5;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1.2rem;
  color: #2c3e50;
  background-color: #6CABA5;
}
.sarea{
  padding-top:2%;
  padding-bottom:2%;
  background-color: #B2DFDB;
}
.slayout:nth-child(odd) {
    background-color: #B2DFDB;
    color:#303030;
}
.slayout:nth-child(even) {
    background-color: #E0F2F1;
    color:#303030;
}
.slayout > .stl{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #009688;
  padding:5px 0 5px 0;
  color:#E0F2F1;
  border:#80CBC4;
  border-right-style: solid;
  border-top-style: solid;
}
.slayout > .sbl {
  display: flex;
  align-items: center;
  justify-content: center;
  border:#80CBC4;
  border-right-style: solid;
  border-top-style: solid;
  vertical-align: middle;
}
.slayout:nth-child(odd).end {
  background-color: #CCCCCC !important;
  color:#303030 !important;
}
.slayout:nth-child(even).end{
  background-color: #DDDDDD !important;
  color:#303030 !important;
}
.slayout > .slast{
  border-right-style: none;
}
.cardbg{
  background-color: #E0F2F1 !important;
}
.Ctitle{
  padding:1%;
  background: rgba(80, 80, 80, 0.5);
}
.slayout.end.now{
  background-color: #FAFAFA !important;
}
.slayout.now{
  background-color: #FAFAFA !important;
}
.sticky{
  position: sticky;
  top:-3px;
  z-index:2;
}
a:link,a:visited,a:hover,a:active{
    text-decoration: none;
}
.twitchbtn{
  position:fixed !important;
  top:0px;
  right:0px;
  z-index: 30;
}
.twitchshow{
  z-index:25 !important;
}
.twitchlayout{
  z-index:-1;
  position:fixed;
  width:100%;
  height:100%;
}
.twitchvideo{
  height:100%;
  width: 100%;
  flex-grow:1;
  flex-shrink: 1;
}
#twitchvideo{
  height:100%;
  width:100%;
}
.twitchchat,#twitchchat{
  height:100%;
  width: 22vw;
}
body {
  width:100%;
  height:100%;
}
.scrolllock{
  position: fixed;
  overflow: hidden !important;
}
</style>
