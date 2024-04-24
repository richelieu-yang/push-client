<script setup lang="ts">
import {ref} from 'vue';

let credentialFlag = ref("secret"),
    token = ref(""),
    secret = ref(""),
    fallback = ref("false");

function connect(event: Event) {

}

function disconnect(event: Event) {

}
</script>

<template>
  <div>
    client credentials:
    <select v-model="credentialFlag" class="margin-left">
      <option value="secret">secret</option>
      <option value="token">token</option>
    </select>
    <input v-if="credentialFlag=='secret'" v-model="secret" class="margin-left" style="width: 600px" type="text">
    <input v-else-if="credentialFlag=='token'" v-model="token" class="margin-left" style="width: 600px" type="text">
  </div>
  <div>
    <select disabled style="width: 100px">
      <option value="websocket">websocket</option>
    </select>
    <input class="margin-left" placeholder="以 ws:// 或 wss:// 开头..." style="width: 600px" type="text">
  </div>
  <br>

  <div>
    fallback
    <select v-model="fallback" class="margin-left">
      <option value="false">false</option>
      <option value="true">true</option>
    </select>
    <div v-if="fallback=='true'">
      <div>
        <select style="width: 100px">
          <option value="">null</option>
          <option value="http_stream">http_stream</option>
          <option value="sse">sse</option>
        </select>
        <input class="margin-left" style="width: 600px" type="text">
      </div>
      <div>
        <select style="width: 100px">
          <option value="">null</option>
          <option value="http_stream">http_stream</option>
          <option value="sse">sse</option>
        </select>
        <input class="margin-left" style="width: 600px" type="text">
      </div>
    </div>
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