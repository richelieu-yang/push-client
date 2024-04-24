<script setup lang="ts">
import {ref, watch} from 'vue';
import {Console} from "@/_internal/utils/Console";
import WebSocket from "@/WebSocket.vue";
import {SessionStorageUtil} from "@/_internal/utils/SessionStorageUtil";
import SSE from "@/SSE.vue";
import Centrifuge from "@/Centrifuge.vue";
import {Key} from "@/_internal/consts/key";

/* Console */
let output = ref("");
Console.initialize(output);

function clear(event: Event) {
  Console.clear();
}

let connectionType = ref(SessionStorageUtil.getConnectionType());
watch(connectionType, (newVal, oldVal) => {
  Console.println(`${Key.ConnectionType} is changed: ${oldVal} -> ${newVal}`);
  SessionStorageUtil.setConnectionType(newVal);
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
    <textarea v-model="output" style="width: 1200px; height: 420px"></textarea>
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
