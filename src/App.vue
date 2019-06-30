<template>
  <div id="app">
    <v-app>
      <v-btn
        dark
        fab
        color="#212121"
        class="twitchbtn hidden-xs-only"
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
          <v-tab :disabled="!showNotification" href="#menu-2">
            Notification
            <v-icon>fas fa-bell</v-icon>
          </v-tab>
          <v-tab href="#menu-3">
            Info
            <v-icon>fas fa-info-circle</v-icon>
          </v-tab>
          <v-tab-item value="menu-1">
            <v-card class="cardbg pa-2" flat>
              <v-layout v-if="!loading" row wrap justify-space-around align-center
                :class="{
                  'column': $vuetify.breakpoint.xsOnly,
                }">
                <v-flex xs5 sm4 md3
                  :class="{
                    'mb-2': $vuetify.breakpoint.xsOnly,
                  }">
                  <v-card
                  :class="{
                    'layout': $vuetify.breakpoint.xsOnly,
                    'row': $vuetify.breakpoint.xsOnly,
                  }">
                    <v-img
                      :src="getPic(sdList[nowplaying].name)"
                      class="card__pic"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-start flexbox>
                            <span class="card__title headline white--text">Now Playing</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-title primary-title>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="twolines">{{sdList[nowplaying].name}}</v-flex>
                        <v-flex xs12>{{sdList[nowplaying].tw.tw}}<a v-if="sdList[nowplaying].tw.sr!=''" :href="'https://www.speedrun.com/'+sdList[nowplaying].tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a></v-flex>
                        <v-flex xs12 class="grey--text">
                          準備時間: {{sdList[nowplaying].setup_time}}
                        </v-flex>
                        <v-flex xs12 class="grey--text">
                          預計時間: {{sdList[nowplaying].run_time}}
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex sm3 hidden-xs-only>
                  <v-card>
                    <v-img
                      :src="twJSON['logo']"
                      class="card__pic"
                    >
                    </v-img>
                    <v-card-title primary-title pa-3>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="grey--text">現在時間</v-flex>
                        <v-flex xs12 class="headline">
                          {{ nowdate | timeformat }}
                        </v-flex>
                        <v-flex xs12>{{ nowdate | dateformat }}</v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs5 sm4 md3
                  :class="{
                    'mb-2': $vuetify.breakpoint.xsOnly,
                  }">
                  <v-card
                    v-if="(nowplaying+1)<=(sdList.length-1)"
                    :class="{
                      'layout': $vuetify.breakpoint.xsOnly,
                      'row': $vuetify.breakpoint.xsOnly,
                    }">
                    <v-img
                      :src="getPic(sdList[nowplaying+1].name)"
                      class="card__pic"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-start flexbox>
                            <span class="card__title headline white--text">UP Next</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    <v-card-title primary-title>
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 class="twolines">{{sdList[nowplaying+1].name}}</v-flex>
                        <v-flex xs12>{{sdList[nowplaying+1].tw.tw}}<a v-if="sdList[nowplaying+1].tw.sr!=''" :href="'https://www.speedrun.com/'+sdList[nowplaying+1].tw.sr"><span>&ensp;</span><v-icon>fas fa-trophy</v-icon></a></v-flex>
                        <v-flex xs12 class="grey--text">
                          準備時間: {{sdList[nowplaying+1].setup_time}}
                        </v-flex>
                        <v-flex xs12 class="grey--text">
                          開始時間: {{ nowdate | dateformat }} {{ nowdate | timeformat }}
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout row justify-center align-center mt-3>
                <v-flex xs5>
                  <v-select
                  :items="eventItem"
                  ref="eventSelect"
                  v-model="eventID"
                  label="活動選擇"
                  item-text="text"
                  item-value="id"
                  append-icon="fas fa-sort-down"
                  ></v-select>
                </v-flex>
                <v-btn color="teal" title="重新整理資訊" v-on:click="refresh()">
                  <v-icon style="color:#E0F2F1">fas fa-sync-alt</v-icon>
                </v-btn>
              </v-layout>
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
                <v-flex xs4>
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
                <v-flex v-if="sysNotiSupport" xs4>
                  <v-switch v-model="sysNoti" label="啟用系統桌面通知"></v-switch>
                </v-flex>
                <v-flex xs12>
                  <div>- 提醒清單 -</div>
                </v-flex>
              </v-layout>
              <template v-if="!loading">
                <v-layout class="slayout" row wrap
                  v-for="i in notification" :key="i"
                  :class="{end: (sdList[i].starttime.getTime() < nowdate.getTime())}">
                  <v-flex class="sbl" xs1>
                    <div>{{ sdList[i].starttime | dateformat }}</div>
                  </v-flex>
                  <v-flex class="sbl" xs1>
                    <div>{{ sdList[i].starttime | timeformat }}</div>
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
                    <v-btn v-on:click="DeleteNotification(i)" color="pink darken-3">
                      <v-icon style="color:#E0F2F1">far fa-bell-slash</v-icon>
                    </v-btn>
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
                <v-btn title="Google節目表單" color="teal"
                  v-if="twJSON['google_link']"
                  :href="twJSON['google_link']" target="_blank">
                  <v-icon style="color:#E0F2F1">fas fa-th-list</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>GDQ官方:</v-flex>
              <v-flex xs12>
                <v-btn title="Twitch頻道" color="teal" href="https://www.twitch.tv/gamesdonequick" target="_blank"><v-icon style="color:#E0F2F1">fab fa-twitch</v-icon></v-btn>
                <v-btn color="teal" title="Youtube頻道" href="https://www.youtube.com/user/gamesdonequick/videos" target="_blank"><v-icon style="color:#E0F2F1">fab fa-youtube</v-icon></v-btn>
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
              <v-flex xs12>功能測試:</v-flex>
              <v-flex xs12>
                <v-btn color="teal" title="測試鬧鈴" v-on:click="test()">
                  <v-icon style="color:#E0F2F1">fas fa-volume-up</v-icon>
                </v-btn>
              </v-flex>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <v-tabs grow icons-and-text centered dark color="teal"
          class="sticky sticky--tab"
          show-arrows
          v-model="tabs"
          prev-icon="fas fa-arrow-circle-left"
          next-icon="fas fa-arrow-circle-right">
          <v-tabs-slider color="teal lighten-5"></v-tabs-slider>
          <v-tab v-for="(i,index) in dateArr" :key="'slide-'+index" :href="'#tab-'+index">
            {{ i.date | dateformat }}
            <v-icon>far fa-calendar-alt</v-icon>
          </v-tab>
        </v-tabs>
        <v-layout v-if="!loading" class="sticky sticky--time slayout" row wrap
          :class="{'reverse': $vuetify.breakpoint.xsOnly}">
          <v-flex class="stl" xs4 sm1>
            開始時間
          </v-flex>
          <v-flex class="stl" xs8 sm4>
            遊戲名稱
          </v-flex>
          <v-flex class="stl" hidden-xs-only sm4>
            玩家
          </v-flex>
          <v-flex class="stl" hidden-xs-only sm1>
            預估時間
          </v-flex>
          <v-flex class="stl slast" hidden-xs-only sm2>
            規則
          </v-flex>
        </v-layout>
        <v-tabs-items v-model="tabs">
          <v-tab-item
            :transition="false"
            :reverse-transition="false"
            v-for="(i,index) in dateArr"
            :key="'tab-'+index"
            :value="'tab-'+index">
            <template v-if="!loading">
              <v-layout class="slayout" row wrap v-for="i in SliceList(index)" :key="i.pk"
                :class="{
                  'reverse': $vuetify.breakpoint.xsOnly,
                  'end': (i.starttime.getTime() < nowdate.getTime()),
                  'now':(i.pk === sdList[nowplaying].pk),
                  }">
                <v-flex class="sbl" xs4 sm1>
                  <div>{{ i.starttime | timeformat }}</div>
                </v-flex>
                <v-flex class="sbl" xs8 sm4
                  :class="{
                    'pa-1': $vuetify.breakpoint.mdAndUp,
                    'pa-3': $vuetify.breakpoint.smAndDown
                  }">
                  <div>
                    {{i.name}}
                  <a class="ml-1" v-if="!!i.tw.sr" :href="'https://www.speedrun.com/'+i.tw.sr">
                    <v-icon>fas fa-trophy</v-icon>
                  </a>
                    <a class="ml-1" v-if="!!i.tw.gm" :href="i.tw.gm" target="_blank">
                      <v-icon>fab fa-steam</v-icon>
                    </a>
                  </div>
                </v-flex>
                <v-flex class="sbl justify-space-around" hidden-xs-only sm4>
                  {{i.runners}}
                </v-flex>
                <v-flex class="sbl" hidden-xs-only sm1>
                  <div>{{i.run_time}}</div>
                </v-flex>
                <v-flex class="sbl slast" hidden-xs-only sm2>
                  <div>{{i.category}}</div>
                </v-flex>
                <v-flex class="sbl" xs4 sm1>
                  <div class="hidden-xs-only">{{i.console}}</div>
                  <v-btn icon class="hidden-sm-and-up" @click="i.mobileExpand=!i.mobileExpand">
                    <v-icon v-if="!i.mobileExpand">fas fa-chevron-down</v-icon>
                    <v-icon v-if="i.mobileExpand">fas fa-chevron-up</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex class="sbl" xs8 sm4
                  :class="{
                    'pa-1': $vuetify.breakpoint.mdAndUp,
                    'pa-3': $vuetify.breakpoint.smAndDown
                  }">
                  <div>
                    {{i.tw.tw}}
                    <a class="ml-1" v-if="!!i.tw.vod" :href="'https://www.twitch.tv/videos/'+i.tw.vod" target="_blank">
                      <v-icon>fab fa-twitch</v-icon>
                    </a>
                    <a class="ml-1" v-if="!!i.tw.yt" :href="'https://www.youtube.com/watch?v='+i.tw.yt" target="_blank">
                      <v-icon>fab fa-youtube</v-icon>
                    </a>
                  </div>
                </v-flex>
                <v-flex align-center class="sbl" hidden-xs-only sm5>
                  <v-layout row wrap justify-space-around>
                    <v-flex xs6 v-for="j in i.runnersArr" :key="'runner'+index+j">
                      {{rnList[j].name}}:
                      <a class="px-1" :href="rnList[j].stream" target="_blank">
                        <v-icon v-if="!!rnList[j].stream">fab fa-twitch</v-icon>
                      </a>
                      <a class="px-1" :href="'https://twitter.com/'+rnList[j].twitter" target="_blank">
                        <v-icon v-if="!!rnList[j].twitter">fab fa-twitter</v-icon>
                      </a>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="sbl slast" hidden-xs-only sm2>
                  <template v-if="sdList.indexOf(i)!==0">
                    <v-btn v-on:click="InsertNotification(sdList.indexOf(i))" color="teal"
                      v-if="(!i.notification)&&((i.starttime.getTime() > nowdate.getTime()))">
                      <v-icon style="color:#E0F2F1">far fa-bell</v-icon>
                    </v-btn>
                    <v-btn v-on:click="DeleteNotification(sdList.indexOf(i))" color="pink darken-3"
                      v-if="(i.notification)&&((i.starttime.getTime() > nowdate.getTime()))">
                      <v-icon style="color:#E0F2F1">far fa-bell-slash</v-icon>
                    </v-btn>
                  </template>
                </v-flex>
                <transition name="fade">
                  <v-flex v-if="i.mobileExpand"
                    xs12 class="sbl slast hidden-sm-and-up text-xs-left">
                    <v-flex xs12 pa-3>
                      <div class="font-weight-bold">跑者</div>
                      <div class="pl-3" v-for="j in i.runnersArr" :key="'runner'+index+j">
                        {{rnList[j].name}}:
                        <a class="px-1" :href="rnList[j].stream" target="_blank">
                          <v-icon v-if="!!rnList[j].stream">fab fa-twitch</v-icon>
                        </a>
                        <a class="px-1" :href="'https://twitter.com/'+rnList[j].twitter" target="_blank">
                          <v-icon v-if="!!rnList[j].twitter">fab fa-twitter</v-icon>
                        </a>
                      </div>
                      <div class="font-weight-bold">預估時間</div>
                      <div class="pl-3">{{i.run_time}}</div>
                      <div class="font-weight-bold">規則</div>
                      <div class="pl-3">{{i.category}}</div>
                      <div class="font-weight-bold">遊戲平台</div>
                      <div class="pl-3">{{i.console}}</div>
                    </v-flex>
                  </v-flex>
                </transition>
              </v-layout>
            </template>
          </v-tab-item>
        </v-tabs-items>
        <v-layout v-if="loading">
          <v-flex xs12 class="px-3 py-5 cardbg">
            <v-progress-circular :size="70" :width="7" indeterminate color="teal">
            </v-progress-circular>
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
import { LATEST_EVENT, EVENT_LIST } from './js/constant';

export default {
  name: 'App',
  data() {
    return {
      tabs: 0,
      rendertwitch: false,
      opentwitch: false,
      eventID: null,
      eventItem: [],
      twJSON: [],
      dateArr: [],
      sdList: [],
      rnList: [],
      notification: [],
      sysNotiSupport: false,
      sysNoti: true,
      alertitem: [{ state: '弱', alerttext: '節目快開始了骯骯骯骯骯骯骯骯骯骯' },
        { state: '中', alerttext: '節目快開始了骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯' },
        { state: '強', alerttext: '節目快開始了骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯骯' }],
      alertselect: '節目快開始了骯骯骯骯骯骯骯骯骯骯',
      nowdate: null,
      loading: true,
      nowplaying: 0,
    };
  },
  watch: {
    eventID(val, oldVal) {
      if (!oldVal) {
        return;
      }
      if (val && EVENT_LIST[val]) {
        this.$refs.eventSelect.blur();
        window.scrollTo(0, 0);
        window.history.pushState(null, null, `#${val}-${EVENT_LIST[val]}`);
        this.refresh();
      }
    },
    nowplaying(val) {
      if (this.eventID !== LATEST_EVENT) {
        return;
      }
      if (this.notification.includes(val)) {
        // Clear old notification from list
        this.notification = this.notification.filter(element => element >= val);
        this.DeleteNotification(val);
        if (this.sysNotiSupport && this.sysNoti) {
          // eslint-disable-next-line no-unused-vars
          const gameNotification = new Notification('GDQ中文節目表', {
            badge: 'https://i.imgur.com/3HF5L7V.png',
            body: `'${this.twJSON[this.sdList[val].pk].tw}'快開始了！`,
            icon: this.twJSON.logo,
          });
        }
        document.getElementById('BaoAlert').load();
        document.getElementById('BaoAlert').play();
      }
    },
    sysNoti(val) {
      if (val) {
        if (Notification.permission !== 'granted') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              // eslint-disable-next-line no-unused-vars
              const firstNotification = new Notification('GDQ中文節目表', {
                badge: 'https://i.imgur.com/3HF5L7V.png',
                body: '您已開啟桌面通知功能',
                icon: this.twJSON.logo,
              });
            } else {
              this.sysNoti = false;
            }
          });
        } else {
          // eslint-disable-next-line no-unused-vars
          const notification = new Notification('GDQ中文節目表', {
            badge: 'https://i.imgur.com/3HF5L7V.png',
            body: '您已開啟桌面通知功能',
            icon: this.twJSON.logo,
          });
        }
      }
    },
  },
  computed: {
    showNotification() {
      return this.eventID === LATEST_EVENT;
    },
  },
  filters: {
    timeformat(val) {
      return `${val.getHours().toString().padStart(2, 0)}:${val.getMinutes().toString().padStart(2, 0)}`;
    },
    dateformat(val) {
      return `${(val.getMonth() + 1).toString().padStart(2, 0)}/${val.getDate().toString().padStart(2, 0)}`;
    },
    time(value) {
      return value.toString().padStart(2, 0);
    },
  },
  methods: {
    SliceList(index) {
      return this.sdList.filter(e => e.starttime.getDate() === this.dateArr[index].date.getDate());
    },
    getPic(gname) {
      if ((gname === 'Pre-Show') || (gname === 'Preshow')
        || (gname === 'FINALE') || (gname === 'Finale') || (gname === 'Finale!')) {
        return this.twJSON.logo;
      }
      return `https://static-cdn.jtvnw.net/ttv-boxart/${gname}-285x380.jpg`;
    },
    async getRequest(url) {
      const Jdata = await (await (fetch(url, { cache: 'no-cache' })
        .then(res => res.json())
        .catch((err) => {
          console.log('Error: ', err);
        })
      ));
      return Jdata;
    },
    getPage() {
      for (let i = this.tabs; i < this.dateArr.length; i += 1) {
        if (this.nowdate.getTime() < this.dateArr[0].time) {
          this.tabs = `tab-${0}`;
        } else if (i === this.dateArr.length - 1) {
          if (this.nowdate.getTime() > this.dateArr[i].time) {
            this.tabs = `tab-${i}`;
          }
        } else if ((this.nowdate.getTime() > this.dateArr[i].time)
          && (this.nowdate.getTime() < this.dateArr[i + 1].time)) {
          this.tabs = `tab-${i}`;
        }
      }
    },
    clock() {
      this.nowdate = new Date();
      this.getCurrentGame();
      this.getPage();
      return this.nowdate;
    },
    setclock() {
      const n = this.clock();
      const timeWait = Math.ceil(n.getTime() / 60000) * 60000 - n.getTime();
      setTimeout(() => {
        this.clock();
        setInterval(this.clock, 60000);
      }, timeWait);
    },
    setNotification() {
      if (this.eventID !== LATEST_EVENT) {
        return;
      }
      // init
      if (!localStorage.getItem('notification')) {
        this.notification = [];
        localStorage.setItem('notification', JSON.stringify(this.notification));
      } else {
        this.notification = JSON.parse(localStorage.getItem('notification'));
      }
    },
    InsertNotification(id) {
      this.notification.push(id);
      this.sdList[id].notification = true;
      this.notification.sort((a, b) => a - b);
      localStorage.setItem('notification', JSON.stringify(this.notification));
    },
    DeleteNotification(id) {
      this.notification = this.notification.filter(item => item !== id);
      this.sdList[id].notification = false;
      localStorage.setItem('notification', JSON.stringify(this.notification));
    },
    getCurrentGame() {
      for (let i = this.nowplaying; i < this.sdList.length; i += 1) {
        if (i === 0) {
          if (this.nowdate.getTime() < this.sdList[i].endtime.getTime()) {
            this.nowplaying = i;
          }
        } else if (i === this.sdList.length - 1) {
          if (this.nowdate.getTime() > this.sdList[i].starttime.getTime()) {
            this.nowplaying = i;
          }
        } else if ((this.nowdate.getTime() > this.sdList[i - 1].endtime.getTime())
          && (this.nowdate.getTime() < this.sdList[i].endtime.getTime())) {
          this.nowplaying = i;
        }
      }
    },
    async getList(RequestJSON) {
      const ListJSON = RequestJSON.run;
      const RunnerJSON = RequestJSON.runner;
      ListJSON.forEach((element, index) => {
        const s = new Date(element.fields.starttime);
        this.sdList.push({
          pk: element.pk,
          name: element.fields.name,
          console: element.fields.console,
          category: element.fields.category.replace('any%', 'Any%'),
          setup_time: element.fields.setup_time,
          starttime: s,
          run_time: element.fields.run_time,
          endtime: new Date(element.fields.endtime),
          runners: element.fields.deprecated_runners,
          runnersArr: element.fields.runners,
          notification: this.notification.includes(index),
          tw: this.twJSON[element.pk] || '',
          mobileExpand: false,
        });
        if (!this.dateArr.find(e => e.date.getDate() === s.getDate())) {
          this.dateArr.push({
            date: s,
            time: s.getTime(),
          });
        }
      });
      RunnerJSON.forEach((element) => {
        this.rnList[element.pk] = element.fields;
      });
      this.loading = false;
    },
    async getJSON() {
      let RequestJSON;
      if (!this.eventID || !EVENT_LIST[this.eventID]) {
        this.eventID = LATEST_EVENT;
      }
      if (this.eventID === LATEST_EVENT) {
        RequestJSON = await this.getRequest('//crs-dlbot.herokuapp.com/gdq');
      } else {
        RequestJSON = await this.getRequest(`./event/${this.eventID}.json`);
      }
      this.twJSON = await this.getRequest(`./lang/${this.eventID}.json`);
      this.getList(RequestJSON);
      this.setclock();
    },
    refresh() {
      this.loading = true;
      this.nowplaying = 0;
      this.dateArr.length = 0;
      this.sdList.length = 0;
      this.getJSON();
    },
    twitchopen() {
      if (!this.rendertwitch) {
        this.rendertwitch = true;
      }
      this.opentwitch = !this.opentwitch;
      if (this.opentwitch) {
        document.body.classList.add('scrolllock');
      } else {
        document.body.classList.remove('scrolllock');
      }
    },
    test() {
      if (this.sysNotiSupport && this.sysNoti) {
        // eslint-disable-next-line no-unused-vars
        const gameNotification = new Notification('GDQ中文節目表', {
          badge: 'https://i.imgur.com/3HF5L7V.png',
          body: '這是一則系統桌面通知測試！',
          icon: this.twJSON.logo,
        });
      }
      document.getElementById('BaoAlert').load();
      document.getElementById('BaoAlert').play();
    },
  },
  created() {
    Object.keys(EVENT_LIST).forEach((key) => {
      this.eventItem.push({
        text: EVENT_LIST[key],
        id: parseInt(key, 10),
      });
    });
    this.eventID = parseInt(window.location.hash.substr(1), 10) || LATEST_EVENT;
    this.setNotification();
    this.getJSON();
    // system notification support
    if (Notification) {
      this.sysNotiSupport = true;
      // user accept system notification
      if (Notification.permission !== 'granted') {
        this.sysNoti = false;
      }
    }
  },
};
</script>

<style lang="scss">
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
.slayout{
  &:nth-child(odd) {
    background-color: #B2DFDB;
    color:#303030;
    &.end {
      background-color: #CCCCCC !important;
      color:#303030 !important;
    }
  }
  &:nth-child(even) {
    background-color: #E0F2F1;
    color:#303030;
    &.end{
      background-color: #DDDDDD !important;
      color:#303030 !important;
    }
  }
  .stl{
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
  .sbl {
    display: flex;
    align-items: center;
    justify-content: center;
    border:#80CBC4;
    border-right-style: solid;
    border-top-style: solid;
    vertical-align: middle;
    &.justify-space-around{
      justify-content: space-around;
    }
  }
  .slast{
    border-right-style: none;
  }
  &.now{
    &.end{
      background-color: #FAFAFA !important;
    }
    background-color: #FAFAFA !important;
  }
}
.cardbg{
  background-color: #E0F2F1 !important;
}
.card__pic{
  height: 300px;
  @media (max-width:600px){
    height: auto;
    min-height: 200px;
    width: 170px;
  }
}
.card__title{
  padding:1%;
  background: rgba(80, 80, 80, 0.5);
}
.sticky{
  position: sticky;
  z-index:2;
  &--tab {
    top: 0px;
  }
  &--time {
    top: 69px;
  }
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
.twolines {
  max-height: 2.66em;
  overflow: hidden;
  font-size: 24px !important;
  font-weight: 400;
  line-height: 1.33em !important;
  letter-spacing: normal !important;
  font-family: 'Roboto', sans-serif !important;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter {
  transform: translateY(-10px);
}
</style>
