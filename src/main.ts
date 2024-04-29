import './assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';
import {UuidKit} from "@/_chimera/id/UuidKit";

createApp(App).mount('#app');

console.log(UuidKit.v4());
console.log(UuidKit.simpleV4());
