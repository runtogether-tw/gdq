<template>
  <v-layout class="slayout" wrap>
    <v-flex class="sbl" xs4 sm1>
      <slot name="startTime"></slot>
    </v-flex>
    <v-flex class="sbl" xs8 sm4
      :class="{
        'pa-1': $vuetify.breakpoint.mdAndUp,
        'pa-3': $vuetify.breakpoint.smAndDown,
      }">
      <div>
        <slot name="gameName"></slot>
      </div>
    </v-flex>
    <v-flex class="sbl justify-space-around" hidden-xs-only sm4>
      <slot name="runner"></slot>
    </v-flex>
    <v-flex class="sbl" hidden-xs-only sm1>
      <slot name="runTime"></slot>
    </v-flex>
    <v-flex class="sbl slast" hidden-xs-only sm2>
      <slot name="category"></slot>
    </v-flex>
    <v-flex class="sbl" xs4 sm1>
      <slot name="console"></slot>
    </v-flex>
    <v-flex class="sbl" xs8 sm4
      :class="{
        'pa-1': $vuetify.breakpoint.mdAndUp,
        'pa-3': $vuetify.breakpoint.smAndDown
      }">
      <slot name="tw"></slot>
    </v-flex>
    <v-flex align-center class="sbl" hidden-xs-only sm5>
      <slot name="runnerList"></slot>
    </v-flex>
    <v-flex class="sbl slast" hidden-xs-only sm2>
      <slot name="notification"></slot>
    </v-flex>
    <transition name="fade">
      <slot name="mobile"></slot>
    </transition>
  </v-layout>
</template>

<script>
export default {
  name: 'TableRow',
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
.slayout {
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
    &.end {
      background-color: #DDDDDD !important;
      color:#303030 !important;
    }
  }
  .stl {
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
    &.justify-space-around {
      justify-content: space-around;
    }
  }
  .slast {
    border-right-style: none;
  }
  &.now {
    &.end {
      background-color: #FAFAFA !important;
    }
    background-color: #FAFAFA !important;
  }
}
</style>
