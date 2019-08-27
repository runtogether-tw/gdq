<template>
  <v-layout row justify-center>
    <v-dialog v-model="updateExists" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">發現更新</v-card-title>
        <v-card-text>
            網頁已更新，請點擊下方按鈕或使用ctrl+F5來清除暫存資料。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" @click="refreshApp">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'UpdateModal',
  data() {
    return {
      registration: null,
      updateExists: false,
    };
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      this.registration.waiting.postMessage('skipWaiting');
    },
  },
  created() {
    document.addEventListener(
      'swUpdated', this.showRefreshUI, { once: true },
    );
    navigator.serviceWorker.addEventListener(
      'controllerchange', () => {
        window.location.reload(true);
      },
    );
  },
};
</script>

<style scoped lang="scss">

</style>
