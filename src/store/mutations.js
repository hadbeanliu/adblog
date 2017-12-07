export default {
  SET_PAGE: (state, { page }) => {
    state.page = page
  },
  SET_CURRURL: (state, currUrl) => {
    state.currUrl = currUrl
  },
  SET_FILTERS: (state, filters) => {
    state.filterParamMap = filters
  },
  SET_ITEMS: (state, items) => {
    state.items = items.data
    state.flags = true
  },
  SET_TREEDATA: (state, items) => {
    state.treeData = items.treeData
  },
  SET_SOURCEDATA: (state, items) => {
    state.sourceData = items.sourceData
  },
  SET_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_DETAIL_ARTICLE: (state, article) => {
    state.detaliArticle = article
  },
  SET_FLAGS: (state, flags) => {
    state.flags = flags
  },
  SET_CATAGORY: (state, catagory) => {
    state.articleForm.catagory = catagory
  },
  SET_RECCATAGORY: (state, catagory) => {
    state.recCatagory = catagory
  },
  SET_DETAILSTATE: (state, detailState) => {
    state.detailState = detailState
  },
  ADD_TAG: (state, tag) =>{
    state.addTag = tag
  },
  SHOULD_SPLIT_ARTICLE: (state, split) =>{
    state.split = split
  },
  ENSURE_SITE_ID:(state, siteId) =>{
    state.siteId = siteId
  }
  // SET_SORT_WORD:(state, items) => {
  //   state.sortWord = items.tags
  // },
}
