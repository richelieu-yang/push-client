<script setup lang="ts">
import {ref, watch} from 'vue';
import {LocalStorageUtil} from "@/_internal/utils/LocalStorageUtil";

let credentialType = ref(LocalStorageUtil.getCentrifugeCredentialType()),
    token = ref(LocalStorageUtil.getCentrifugeToken()),
    secret = ref(LocalStorageUtil.getCentrifugeSecret());

let wsUrl = ref(LocalStorageUtil.getCentrifugeWsUrl());

let alternative0Type = ref(LocalStorageUtil.getCentrifugeAlternative0Type()),
    alternative0Url = ref(LocalStorageUtil.getCentrifugeAlternative0Url()),
    alternative1Type = ref(LocalStorageUtil.getCentrifugeAlternative1Type()),
    alternative1Url = ref(LocalStorageUtil.getCentrifugeAlternative1Url());

watch(credentialType, (newVal, oldVal) => {
  LocalStorageUtil.setCentrifugeCredentialType(newVal);
});
watch(alternative0Type, (newVal, oldVal) => {
  LocalStorageUtil.setCentrifugeAlternative0Type(newVal);
});
watch(alternative1Type, (newVal, oldVal) => {
  LocalStorageUtil.setCentrifugeAlternative1Type(newVal);
});

function tokenBlur() {
  LocalStorageUtil.setCentrifugeToken(token.value);
}

function secretBlur() {
  LocalStorageUtil.setCentrifugeSecret(secret.value);
}

function wsUrlBlur() {
  LocalStorageUtil.setCentrifugeWsUrl(wsUrl.value);
}

function alternative0UrlBlur() {
  LocalStorageUtil.setCentrifugeAlternative0Url(alternative0Url.value);
}

function alternative1UrlBlur() {
  LocalStorageUtil.setCentrifugeAlternative1Url(alternative1Url.value);
}

function connect(event: Event) {

}

function disconnect(event: Event) {

}
</script>

<template>
  <div>
    client credentials:
    <select v-model="credentialType" class="margin-left">
      <option value="secret">secret or token_hmac_secret_key</option>
      <option value="token">token</option>
    </select>
    <input v-if="credentialType=='secret'" v-model="secret" class="margin-left" style="width: 600px" type="text"
           @blur="secretBlur">
    <input v-else-if="credentialType=='token'" v-model="token" class="margin-left" style="width: 600px"
           type="text"
           @blur="tokenBlur">
  </div>
  <br>

  <!-- 必选项（websocket） -->
  <div>
    <select disabled style="width: 100px">
      <option value="websocket">websocket</option>
    </select>
    <input v-model="wsUrl" class="margin-left" placeholder="以 ws:// 或 wss:// 开头..." style="width: 600px"
           @blur="wsUrlBlur"
           type="text">
  </div>
  <!-- 可选项0 -->
  <div>
    <select v-model="alternative0Type" style="width: 100px">
      <option value="">null</option>
      <option value="http_stream">http_stream</option>
      <option value="sse">sse</option>
      <option value="sockjs">sockjs</option>
    </select>
    <input v-model="alternative0Url" class="margin-left" style="width: 600px" type="text" @blur="alternative0UrlBlur">
  </div>
  <!-- 可选项1 -->
  <div>
    <select v-model="alternative1Type" style="width: 100px">
      <option value="">null</option>
      <option value="http_stream">http_stream</option>
      <option value="sse">sse</option>
      <option value="sockjs">sockjs</option>
    </select>
    <input v-model="alternative1Url" class="margin-left" style="width: 600px" type="text" @blur="alternative1UrlBlur">
  </div>
  <br>

  <div>
    <button @click="connect($event)">Connect</button>
    <button class="margin-left" @click="disconnect($event)">Disconnect</button>
  </div>
</template>

<style scoped>

</style>