import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue'

import { createI18n } from 'vue-i18n';

const messages = {
  en: require('./locales/en.json'),
  ru: require('./locales/ru.json')
};

const i18n = createI18n({
  locale: 'en', // set locale
  legacy: false, // for latest vuei18n with compo API
  messages: messages
});


const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

createApp(App).use(router).use(i18n).mount('#app')
