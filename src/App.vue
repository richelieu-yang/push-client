<script setup lang="ts">
import {ref, watch} from 'vue';
import {Console} from "@/_internal/utils/Console";
import WebSocket from "@/components/WebSocket.vue";
import {LocalStorageUtil} from "@/_internal/utils/LocalStorageUtil";
import SSE from "@/components/SSE.vue";
import Centrifuge from "@/components/Centrifuge.vue";
import {Key} from "@/_internal/consts/key";
import {CentrifugeClient} from "@/_internal/centrifuge/CentrifugeClient";
import {WebSocketClient} from "@/_internal/ws/WebSocketClient";
import {SseClient} from "@/_internal/sse/SseClient";

/* Console */
let output = ref("");
Console.initialize(output);

function clear(event: Event) {
  Console.clear();
}

let connectionType = ref(LocalStorageUtil.getConnectionType());
watch(connectionType, (newVal, oldVal) => {
  CentrifugeClient.disconnect(false);
  WebSocketClient.disconnect();
  SseClient.disconnect();

  Console.clear();

  Console.println(`${Key.ConnectionType} is changed: ${oldVal} -> ${newVal}`);
  LocalStorageUtil.setConnectionType(newVal);
});
</script>

<template>
  <div>
    type of long connection:
    <select v-model="connectionType">
      <option value="0">WebSocket</option>
      <option value="1">SSE</option>
      <option value="2">Centrifuge</option>
    </select>
  </div>
  <div>
    output:
    <br>
    <textarea v-model="output" style="width: 1600px; height: 380px"></textarea>
    <br>
    <button @click="clear($event)">Clear</button>
  </div>
  <br>

  <div>
    <WebSocket v-if="connectionType==0"/>
    <SSE v-else-if="connectionType==1"/>
    <Centrifuge v-else-if="connectionType==2"/>
    <h1 v-else>
      invalid connection type: {{ connectionType }}
    </h1>
  </div>
</template>

<style scoped>

</style>
