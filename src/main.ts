import './assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';
import {JwtUtil} from "@/_internal/utils/JwtUtil";

createApp(App).mount('#app');

let str = await JwtUtil.genSubToken(null, "HS256", "c27022ed-f258-46ca-b894-6d54e5db4ce7", "2h", "1073", "example");
console.log(str);
