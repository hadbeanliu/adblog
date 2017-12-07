<template>
	<div class="search">
		<div class="row" v-show="isShow">
			<div class="large-24 column">
				<div class="title">过滤条件
          <span class="float-right" @click="searchInput" style="cursor: pointer;">搜索</span>
          <span class="float-right" style="cursor: pointer;">&nbsp;&nbsp</span>
					<span class="float-right" @click="clearSelect" style="cursor: pointer;">清空</span>
				</div>
				<ul class="act">
          <li  v-for="(item, index) in searchPanel" v-if="item['searchable']" ><input type="text" v-model="searchParam[item['fieldName']]" :id="item['fieldName']" :placeholder="item['alias']" ></li>
					<li v-for="(item, key, index) in filters" v-if='key !== "sort" && key !== "site"' @click="deleteFilter(item, item[0].paramName)">
						{{item[0].convertedValue}} <span aria-hidden="true">×</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="row catalog">
			<div class="large-24 columns">
				<div class="title">站点</div>
				<div class="tree">
					<ul>
						<li :style="filters['site'] && filters['site'][0].value === '190014' ? 'background-color: #999' : ''" @click="search({url: 'wNewsRecommend.sp?act=search&site=190014'}, 'site')">新闻</li>
						<li :style="filters['site'] && filters['site'][0].value === '190019' ? 'background-color: #999' : ''" @click="search({url: 'wNewsRecommend.sp?act=search&site=190019'}, 'site')">政务</li>
            <li :style="filters['site'] && filters['site'][0].value === '190020' ? 'background-color: #999' : ''" @click="search({url: 'wNewsRecommend.sp?act=search&site=190020'}, 'site')">职业</li>
            <li :style="filters['site'] && filters['site'][0].value === '190021' ? 'background-color: #999' : ''" @click="search({url: 'wNewsRecommend.sp?act=search&site=190021'}, 'site')">地方</li>

          </ul>
				</div>
			</div>
		</div>
		<div class="row catalog">
			<div class="large-24 columns">
				<div class="title">栏目</div>
				<lg-tree :data="treeData" :props="props" v-show="opens.open"></lg-tree>
			</div>
		</div>
		<div class="row sourceTree" v-for="(items, index) in sourceData" v-if="items.paramName != 'agency'&& items.paramName != 'location'&& items.paramName != 'produce'&& items.paramName != 'figure'">
			<div class="large-24 columns">
				<div class="title">{{items.facetTitle}}
					<div class="float-right" v-show="isBlock[items.paramName]" v-if="items.facetFieldList.length>=5">
						<span v-show="expand[items.paramName]" @click.prevent.stop="loadMore(items.facetFieldList, items.paramName)">展开</span>
						<span v-show="!expand[items.paramName]" @click.prevent.stop="slide(items.paramName)">收起</span>
					</div>
				</div>
				<div class="tree">
					<ul v-show="opens.open1">
						<li v-for="(item, index) in list(items.facetFieldList, items.paramName)" :key="index" @click="search(item, items.paramName)">{{item.convertedValue}}（{{item.hit}}）</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import LgTree from '../../components/Tree'
	export default {
		data() {
			return {
			  searchPanel: {
          figure: {searchable:true,fieldName:'figure', alias:'人物' },
          agency: {searchable:true,fieldName:'agency', alias:'机构' },
          location: {searchable:true,fieldName:'location', alias:'地点' }
        },
        searchParam: {
          figure: '',
          agency: '',
          location: ''
        },
				opens: {
					open: true,
					open1: true
				},
				expand: {
					'author': true,
					'source': true,
					'time': true
				},
				isBlock: {
					'author': true,
					'source': true,
					'time': true
				},
				isShow: false,
				limitNum: 5,
				limitNumauthor: 5,
				limitNumsource: 5,
				limitNumtime: 5,
				props: {
					id: 'value',
					label: 'convertedValue',
					children: 'children',
					Fun: (item) => {
						var param = item.url
						this.$store.dispatch('FETCH_LIST_DATA', param)
					},
					hit: true
				},
				props1: {
					id: 'value',
					label: 'convertedValue',
					children: 'children'
				}
			}
		},
		methods: {
			toggle(open) {
				this.open = !this.open
			},
			slide(type) {
				this['limitNum' + type] = this.limitNum
				this.expand[type] = !this.expand[type]
			},
			loadMore(items, type) {
				this['limitNum' + type] = items.length
				this.expand[type] = !this.expand[type]
			},
			deleteFilter(item, type) {
				var param = item[0].url
				this.$store.dispatch('FETCH_LIST_DATA', param).then(() => {
					this.isBlock[type] = true
				})
			},
			list(items, type) {
				var num = this['limitNum' + type] || this.limitNum

				if(!this['limitNum' + type]) {
					this['limitNum' + type] = this.limitNum
				}
				return items.slice(0, num)
			},
			search(item, type) {
				var param = item.url
				this.$store.dispatch('FETCH_LIST_DATA', param).then(() => {
					this.isBlock[type] = false
				})
				if(type == 'site'){
				  this.$store.commit('ENSURE_SITE_ID', param.substring(param.length-6))
				}
			},
			clearSelect() {
				var param = 'wNewsRecommend.sp?act=search'
				this.$store.dispatch('FETCH_LIST_DATA', param).then(() => {
					this.isBlock['source'] = true
					this.isBlock['author'] = true
					this.isBlock['time'] = true
          for(var item in this.searchParam){
            this.searchParam[item] = ''
          }
				})
			},
      searchInput() {
        var param = 'wNewsRecommend.sp?act=search'+"&site="+this.siteId
			  for ( var item in this.searchParam){
			    var value = this.searchParam[item]
          if(value.length > 0)
            param = param +'&'+item +'=' +value
        }
        this.search({url:param} ,'')
      }
		},
		computed: {
			...mapState({
				treeData: state => state.treeData,
				sourceData: state => state.sourceData,
				filters: state => state.filterParamMap,
        siteId: state => state.siteId
			})
		},
		watch: {
			filters: function() {
				if(Object.keys(this.filters).length > 1) {
					this.isShow = true
				} else {
					this.isShow = false
				}
			}
		},
		components: {
			LgTree
		}
	}
</script>
<style>
	.search .title {
		font-size: 1rem;
		color: #F0F0F0;
		padding: 10px 10px 4px 10px;
		border-bottom: 2px solid #fff;
		margin-bottom: 10px;
	}

	.search .catalog .tree {
		max-height: 170px;
		overflow: auto;
	}

	.search .tree li,
	.search .tree li a {
		color: #fff;
	}

	.act {
		margin-left: 1rem;
	}

	.act li {
		color: #fff;
		cursor: pointer;
	}

	.sourceTree .tree li {
		padding-left: 1rem;
	}

	.sourceTree .title span {
		cursor: pointer;
	}
</style>
