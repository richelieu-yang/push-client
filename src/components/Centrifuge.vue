<script setup lang="ts">
import {ref} from 'vue';
import {SessionStorageUtil} from "@/_internal/utils/SessionStorageUtil";

let credentialFlag = ref(SessionStorageUtil.getCentrifugeCredentialFlag()),
    token = ref(SessionStorageUtil.getCentrifugeToken()),
    secret = ref(SessionStorageUtil.getCentrifugeSecret());

let wsUrl = ref(SessionStorageUtil.getCentrifugeWsUrl());

let alternative0Type = ref(SessionStorageUtil.getCentrifugeAlternative0Type()),
    alternative0Url = ref(SessionStorageUtil.getCentrifugeAlternative0Url()),
    alternative1Type = ref(SessionStorageUtil.getCentrifugeAlternative1Type()),
    alternative1Url = ref(SessionStorageUtil.getCentrifugeAlternative1Url());

function connect(event: Event) {

}

function disconnect(event: Event) {

}
</script>

<template>
  <div>
    client credentials:
    <select v-model="credentialFlag" class="margin-left">
      <option value="secret">secret or token_hmac_secret_key</option>
      <option value="token">token</option>
    </select>
    <input v-if="credentialFlag=='secret'" v-model="secret" class="margin-left" style="width: 600px" type="text">
    <input v-else-if="credentialFlag=='token'" v-model="token" class="margin-left" style="width: 600px" type="text">
  </div>
  <br>

  <!-- 必选项（websocket） -->
  <div>
    <select disabled style="width: 100px">
      <option value="websocket">websocket</option>
    </select>
    <input v-model="wsUrl" class="margin-left" placeholder="以 ws:// 或 wss:// 开头..." style="width: 600px"
           type="text">
  </div>
  <!-- 可选项1 -->
  <div>
    <select v-model="alternative0Type" style="width: 100px">
      <option value="">null</option>
      <option value="http_stream">http_stream</option>
      <option value="sse">sse</option>
      <option value="sockjs">sse</option>
    </select>
    <input v-model="alternative0Url" class="margin-left" style="width: 600px" type="text">
  </div>
  <!-- 可选项1 -->
  <div>
    <select v-model="alternative1Type" style="width: 100px">
      <option value="">null</option>
      <option value="http_stream">http_stream</option>
      <option value="sse">sse</option>
      <option value="sockjs">sse</option>
    </select>
    <input v-model="alternative1Url" class="margin-left" style="width: 600px" type="text">
  </div>
  <br>

  <div>
    <button @click="connect($event)">Connect</button>
    <button class="margin-left" @click="disconnect($event)">Disconnect</button>
  </div>

  <!--  <div>-->
  <!--    Centrifuge url:-->
  <!--    <br>-->
  <!--    <input v-model="url" type="text" style="width: 1200px">-->
  <!--    <br>-->
  <!--    <button @click="connect($event)">Connect</button>-->
  <!--    <button class="margin-left" @click="disconnect($event)">Disconnect</button>-->
  <!--  </div>-->
</template>

<style scoped>

</style>