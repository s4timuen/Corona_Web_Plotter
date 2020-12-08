import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    jsonData: {},
    countries: []
  },
  mutations: {
    setJsonData(state, data) {
      state.jsonData = data;
    },
    addCountry(state, entry) {
        state.countries.push(entry);
    }
  },
  getters: {
      jsonData: state => state.jsonData,
      countries: state => state.countries
  }
});

export default store;
