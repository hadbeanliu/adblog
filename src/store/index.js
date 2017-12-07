import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      flags: false,
      page: {},
      currUrl: '',
      filterParamMap: {},
      treeData: [],
      sourceData: [],
      catalog: null,
      article: {},
      detaliArticle: {},
      recCatagory:[],
      items: {},
      articleForm: {
        catagory: '',
        tag: [],
        manualScore: 0.0,
        id: ''
      },
      addTag: '',
      detailState: false,
      split: true,
      showVote: false,
      siteId: '190014'
    },
    actions,
    mutations,
    getters
  })
}
