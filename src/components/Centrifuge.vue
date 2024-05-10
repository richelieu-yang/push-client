<script setup lang="ts">
import _ from "lodash";
import {ref, watch} from 'vue';
import {LocalStorageUtil} from "@/_internal/utils/LocalStorageUtil";
import type {TransportEndpoint, TransportName} from "centrifuge";
import {CentrifugeClient} from "@/_internal/centrifuge/CentrifugeClient";
import {CentrifugeKit} from "@/_chimera/longConnection/CentrifugeKit";
import {UuidKit} from "@/_chimera/id/UuidKit";
import {Console} from "@/_internal/utils/Console";

let protocol = ref(LocalStorageUtil.getCentrifugeProtocol()),
    secret = ref(LocalStorageUtil.getCentrifugeSecret());
let alternative0Type = ref(LocalStorageUtil.getCentrifugeAlternative0Type()),
    alternative0Url = ref(LocalStorageUtil.getCentrifugeAlternative0Url()),
    alternative1Type = ref(LocalStorageUtil.getCentrifugeAlternative1Type()),
    alternative1Url = ref(LocalStorageUtil.getCentrifugeAlternative1Url()),
    alternative2Type = ref(LocalStorageUtil.getCentrifugeAlternative2Type()),
    alternative2Url = ref(LocalStorageUtil.getCentrifugeAlternative2Url());

watch(protocol, (newVal, oldVal) => {
  CentrifugeClient.disconnect(false);
  Console.clear();

  LocalStorageUtil.setCentrifugeProtocol(newVal);
});
watch(alternative0Type, (newVal, oldVal) => {
  CentrifugeClient.disconnect(false);
  Console.clear();

  LocalStorageUtil.setCentrifugeAlternative0Type(newVal);
});
watch(alternative1Type, (newVal, oldVal) => {
  CentrifugeClient.disconnect(false);
  Console.clear();

  LocalStorageUtil.setCentrifugeAlternative1Type(newVal);
});
watch(alternative2Type, (newVal, oldVal) => {
  CentrifugeClient.disconnect(false);
  Console.clear();
  
  LocalStorageUtil.setCentrifugeAlternative2Type(newVal);
});

function secretBlur() {
  LocalStorageUtil.setCentrifugeSecret(secret.value);
}

function alternative0UrlBlur() {
  LocalStorageUtil.setCentrifugeAlternative0Url(alternative0Url.value);
}

function alternative1UrlBlur() {
  LocalStorageUtil.setCentrifugeAlternative1Url(alternative1Url.value);
}

function alternative2UrlBlur() {
  LocalStorageUtil.setCentrifugeAlternative2Url(alternative2Url.value);
}

async function connect(event: Event) {
  let endpoints: TransportEndpoint[] = [];

  /* alternative 0 */
  if (!_.isEmpty(alternative0Type.value) && !_.isEmpty(alternative0Url.value)) {
    if (!CentrifugeClient.checkUrl(alternative0Url.value)) {
      alert(`invalid alternative0Url: ${alternative0Url.value}`);
      return;
    }
    endpoints.push({
      transport: alternative0Type.value as TransportName,
      endpoint: alternative0Url.value
    });
  }
  /* alternative 1 */
  if (!_.isEmpty(alternative1Type.value) && !_.isEmpty(alternative1Url.value)) {
    if (!CentrifugeClient.checkUrl(alternative1Url.value)) {
      alert(`invalid alternative1Url: ${alternative1Url.value}`);
      return;
    }
    endpoints.push({
      transport: alternative1Type.value as TransportName,
      endpoint: alternative1Url.value
    });
  }
  /* alternative 2 */
  if (!_.isEmpty(alternative2Type.value) && !_.isEmpty(alternative2Url.value)) {
    if (!CentrifugeClient.checkUrl(alternative2Url.value)) {
      alert(`invalid alternative2Url: ${alternative2Url.value}`);
      return;
    }
    endpoints.push({
      transport: alternative2Type.value as TransportName,
      endpoint: alternative2Url.value
    });
  }
  if (_.isEmpty(endpoints)) {
    alert(`You need at least one valid TransportEndpoint!`);
    return;
  }

  let user = UuidKit.v4();
  let token = await CentrifugeKit.genToken({}, "HS256", secret.value, "24h", user);
  let subToken = await CentrifugeKit.genSubToken({}, "HS256", secret.value, "24h", user, CentrifugeClient.defChannel);
  CentrifugeClient.connect(protocol.value, endpoints, user, token, subToken);
}

function disconnect(event: Event) {
  CentrifugeClient.disconnect();
}

function sendRpc(event: Event) {
  CentrifugeClient.rpc("my.method.name", {
    "input": "hello"
  });
}
</script>

<template>
  <div>
    protocol:
    <select v-model="protocol" class="margin-left">
      <option value="json">JSON</option>
      <option value="protobuf">Protobuf binary</option>
    </select>
    <br>
    client credentials:
    <select class="margin-left" disabled>
      <option value="secret">token_hmac_secret_key</option>
    </select>
    <input v-model="secret" class="margin-left" style="width: 600px" type="text" @blur="secretBlur">
  </div>
  <br>

  <div>
    TransportEndpoints(default endpoint of Bidirectional WebSocket: ws://localhost:8000/connection/websocket):
    <br>
    <!-- 可选项0 -->
    <div>
      <select v-model="alternative0Type" style="width: 140px">
        <option value="">null</option>
        <option value="websocket">websocket</option>
        <option value="sse">sse</option>
        <option value="http_stream">http_stream</option>
      </select>
      <input v-model="alternative0Url" class="margin-left" style="width: 600px" type="text" @blur="alternative0UrlBlur">
    </div>
    <!-- 可选项1 -->
    <div>
      <select v-model="alternative1Type" style="width: 140px">
        <option value="">null</option>
        <option value="websocket">websocket</option>
        <option value="sse">sse</option>
        <option value="http_stream">http_stream</option>
      </select>
      <input v-model="alternative1Url" class="margin-left" style="width: 600px" type="text" @blur="alternative1UrlBlur">
    </div>
    <!-- 可选项2 -->
    <div>
      <select v-model="alternative2Type" style="width: 140px">
        <option value="">null</option>
        <option value="websocket">websocket</option>
        <option value="sse">sse</option>
        <option value="http_stream">http_stream</option>
      </select>
      <input v-model="alternative2Url" class="margin-left" style="width: 600px" type="text" @blur="alternative2UrlBlur">
    </div>
  </div>
  <br>

  <div>
    <button @click="connect($event)">Connect</button>
    <button class="margin-left" @click="disconnect($event)">Disconnect</button>
  </div>
  <br>

  <div>
    <!--    method:-->
    <!--    <br>-->
    <!--    <input style="width: 600px" type="text">-->
    <!--    <br>-->
    <!--    data:-->
    <!--    <br>-->
    <!--    <input style="width: 600px" type="text">-->
    <!--    <br>-->
    <button @click="sendRpc($event)">send rpc</button>
  </div>
  <br>
</template>

<style scoped>

</style>