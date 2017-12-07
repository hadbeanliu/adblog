import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const Api = {
	databaseUrl: '/api/',
	searchUrl: '/api/wSuggest.sp?code=utf-8&act=index',
	catalogUrl: '/hdds/item/catalogTree/',
	argetUrl: '/hdds/item/get?',
	arupdateUrl: '/hdds/item/update',
	arCatalogRecUrl: '/hdds/taste/classify?biz_code=headlines&ss_code=user-analys',
	arDeleteUrl: 'hdds/item/delete?biz_code=',
	arUpdateAll: 'hdds/item//updateAll?',
	arDetailUrl: 'hdds/item//getDetail?',
	updateWord: 'hdds/resource/speechpart?',
	getwordSpeech:'hdds/resource/getWord?word='
}

export function fetch(param) {
	param = param + '&rows=50&flimit=200'
	var url = Api.databaseUrl + param
	return Vue.http.get(url).then(function(res) {
		return res.body
	})
}

export function updateWord(param) {
	var url = Api.updateWord + "word=" + param.word + "&speech=" + param.speech + "&type=" + param.del
	return Vue.http.get(url).then(function(res) {
		return res
	})
}

export function getwordSpeech(param) {
  var url = Api.getwordSpeech + param
  return Vue.http.get(url).then(function(res) {
    return res
  })
}

export function fetchSearch(param) {
	var url = Api.searchUrl
	return Vue.http.get(url, param).then(function(res) {
		return res.body
	})
}

export function fetchCatalog(site) {
	var url = Api.catalogUrl
	if(site ==null)
		url = url + '190014'
	  else url = url+site
	  console.log(url)
	return Vue.http.get(url).then(function(res) {
		return res.body
	})
}

export function fetchArDetail(param) {
	var uri = Api.argetUrl + 'biz_code='+param.bizCode+'&iid='+param.id

	return Vue.http.get(uri).then(function(res) {
		return res.body
	})
}

export function arUpdate(param) {
	var uri = Api.arupdateUrl
	return Vue.http.post(uri, param).then(function(res) {
		return res
	})
}

export function arCatalogRec(param) {
	var uri = Api.arCatalogRecUrl
	return Vue.http.post(uri, param).then(function(res) {
		return res.body
	})
}
// 删除文章
export function arDelete(param) {
	var uri = Api.arDeleteUrl+param.bizCode
	return Vue.http.post(uri, param.iid).then(function(res) {
		return res
	})
}
export function arUpdateAll(param) {
	var uri = Api.arUpdateAll+'biz_code='+ param.bizCode +'&caId=' + param.catagory
	return Vue.http.post(uri, param.ids).then(function(res) {
		return res
	})
}

export function getArDetail(param) {
	var uri = Api.arDetailUrl+'biz_code='+ param.bizCode +'&iid='  + param.id + "&split=" + param.split
	return Vue.http.get(uri).then(function(res) {
		return res
	})
}
