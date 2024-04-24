<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {SessionStorageUtil} from "@/_internal/utils/SessionStorageUtil";
import {Console} from "@/_internal/utils/Console";
import {CentrifugeClient} from "@/_internal/centrifuge/CentrifugeClient";

let initialUrl = SessionStorageUtil.getSseUrl();
let url = ref(initialUrl);

onMounted(() => {
  Console.println(`[SSE] initial url: ${initialUrl}`);
});

function connect(event: Event) {
  CentrifugeClient.connect(url.value);
}

function disconnect(event: Event) {
  CentrifugeClient.disconnect();
}
</script>

<template>
  <div>
    client credentials
    <select class="margin-left">
      <option value="1">token</option>
      <option value="2">secret</option>
    </select>
    <input class="margin-left" type="text">
  </div>

  <div>
    Centrifuge url:
    <br>
    <input v-model="url" type="text" style="width: 1200px" placeholder="以 http:// 或 https:// 开头...">
    <br>
    <button @click="connect($event)">Connect</button>
    <button @click="disconnect($event)" style="margin-left: 10px">Disconnect</button>
  </div>
</template>

<style scoped>

</style>