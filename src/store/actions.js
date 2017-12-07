import {
	fetch,
	fetchArDetail,
	arUpdate,
	arCatalogRec,
	arDelete,
	arUpdateAll,
	getArDetail,
	updateWord,
  getwordSpeech
} from '../api'

export default {
	// ensure data for rendering given list type
	FETCH_LIST_DATA: ({commit,state}, param) => {
		fetch(param).then(function(res) {
			var data = res.result.articleList
			var treeData = res.catalogTree.filter(o => o.value !== '2017061019000001')
			var sourceData = res.result.facetModelList.splice(1, res.result.facetModelList.length)
			var page = res.result.page
			var currUrl = res.result.currFilterUrl
			var filters = res.result.filterParamMap
			commit('SET_ITEMS', {	data })
			commit('SET_TREEDATA', {
				treeData
			})
			commit('SET_SOURCEDATA', {
				sourceData
			})
			commit('SET_PAGE', {
				page
			})
			commit('SET_CURRURL', currUrl)
			commit('SET_FILTERS', filters)
		})
	},
    //获取文章详情
	ENSURE_ARTICLE: ({commit,state}, article) => {
		commit("SET_RECCATAGORY", [])
		fetchArDetail({bizCode:article.bizCode,id:article.id}).then(function(res) {
			article.tag = res.tag
			article.manualScore = res.manualScore
			article.score = res.score
			article.createTime_title = res.createTime_title
			article.pubDate_title = res.pubDate_title
      article.nr=res.nr
      article.ns=res.ns
      article.nt=res.nt
      article.np=res.np
      article.agency=res.agency
      article.produce=res.produce
      article.location=res.location
      article.figure=res.figure
      article.TextRank=res.TextRank
      article.withIDF=res.withIDF
      article.TFIDF=res.TFIDF
      article.withTFIDF=res.withTFIDF
			commit('SET_ARTICLE', article)
			arCatalogRec(res.text).then((res1) => {
				commit("SET_RECCATAGORY", res1)
			})
		})

	},
	DATA_ISLOADED: ({commit,state}, flags) => {
		commit('SET_FLAGS', flags)
	},
	UPDATE_ARTICLE: ({commit,state}, form) => {
		form.catagory = state.articleForm.catagory[0].caName
		form.caId = state.articleForm.catagory[0].caId
		if(state.siteId == '190019')
			form.bizCode = 'govheadlines'
			else form.bizCode='headlines'
		return arUpdate(form).then((res) => {
			return res
		})
	},
	AUTO_CLASSIFY: ({commit, state}, content) => {
		arCatalogRec(content).then((res) => {
			commit("SET_RECCATAGORY", res)
		})
	},
    //删除文章
	DELETE_ARTICLE: ({ commit, state }, iid) => {
		var bizCode ='headlines'
		if(state.siteId == '190019')
			bizCode = 'govheadlines'
			else bizCode='headlines'
		return arDelete({bizCode:bizCode,iid:iid}).then((res) => {
			return res
		})
	},
	UPDATE_ALL_ARTICLE_CATAGORY: ({commit,state}, params) => {
		if(state.siteId == '190019')
			params.bizCode = 'govheadlines'
			else params.bizCode='headlines'
		return arUpdateAll(params).then((res) => {
			return res
		})
	},
    //获取文章内容
	ENSURE_DETAIL: ({commit,state}, param) => {
		if(param.id != null){
			if(state.siteId == '190019')
				param.bizCode = 'govheadlines'
			else param.bizCode='headlines'
			getArDetail(param).then((res) => {
				commit('SET_DETAIL_ARTICLE', res.body)
        return res
		})
    }
    commit('SET_DETAILSTATE', param.open)
	},
	UPDATE_WORD: ({commit,state}, form) => {
		if(form.word == null)
			return false
	    if(form.speech == null || form.speech.length ==0)
	    	form.speech="null"
	    return updateWord(form).then((res) => {
	    	return res
	    })
	},
  GET_WORDSPEECH: ({commit,state}, participles) => {
    if(participles == null)
      return false
    if(participles == null || participles.length ==0)
      participles="null"
      return getwordSpeech(participles).then((res) => {
    if(res.body==null){
      return null
      }
      return res.body.partspeech;
    })
  },
  ADD_TAG: ({commit,state}, participles) => {
	  commit('ADD_TAG',participles)
  },
  SHOULD_SPLIT_ARTICLE: ({commit,state}, split) => {
	  commit('SHOULD_SPLIT_ARTICLE',split)
  }

}
