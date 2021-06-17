<template>
  <fragment>
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
    <v-layout v-if="rendertwitch" class="twitchlayout" :class="{twitchshow: opentwitch}">
      <v-flex class="twitchvideo">
        <iframe id="twitchvideo" width="100%" height="100%" frameborder="0" framespacing="0" src="https://player.twitch.tv/?channel=gamesdonequick&autoplay=false&parent=runtogether-tw.github.io">
        </iframe>
      </v-flex>
      <v-flex class="twitchchat">
        <iframe id="twitchchat" frameborder="0" scrolling="no" src="https://www.twitch.tv/embed/tetristhegrandmaster3/chat?darkpopout&parent=runtogether-tw.github.io" height="100%" width="340px">
        </iframe>
      </v-flex>
    </v-layout>
  </fragment>
</template>

<script>
export default {
  name: 'TwitchPlayer',
  props: {
    searchKeyword: String,
  },
  data() {
    return {
      rendertwitch: false,
      opentwitch: false,
    };
  },
  methods: {
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
  },
};
</script>

<style scoped lang="scss">
  .twitchbtn {
    position:fixed !important;
    top:0px;
    right:0px;
    z-index: 30;
  }
  .twitchshow {
    z-index:25 !important;
  }
  .twitchlayout {
    z-index:-1;
    position:fixed;
    width:100%;
    height:100%;
  }
  .twitchvideo {
    height:100%;
    width: 100%;
  }
  #twitchvideo {
    height:100%;
    width:100%;
  }
  .twitchchat, #twitchchat {
    height:100%;
    width: 340px;
    flex-shrink: 1;
  }
</style>
