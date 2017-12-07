<template>
	<li v-if="item">
		<!--<div class="score"></div>-->
		<div class="arList" :class="{padding_r35:!detailState}" @click="fetchArticle(item)">
			<div class="title">
        <i title="自动投递" :class="{autoFlag:item.isVote[0].value === '1',fa:item.isVote[0].value === '1', 'fa-adn':item.isVote[0].value === '1'}" aria-hidden="true"></i>
        <a :class="{no_padding:detailState}" target="_blank" :title="item.title[0].value" v-html="item.title[0].value"></a>
      </div>
			<div class="meta margin-t4">
				<span class="warning-color">{{item.curCatalog[0].convertedValue}}</span>
				<span class="author primary-color" :class="{hide:detailState}">{{ item.author[0].value }}</span>
				<span class="ogSite info-color" :class="{hide:detailState}">{{item.source[0].value}}</span>
				<span class="time" :class="{hide:detailState}">{{ item.pubDate[0].value | dateTime }}</span>
			</div>
			<div class="tags margin-t4" :class="{hide:detailState}">
				<i class="fa fa-tags"></i>
				<span class="tag" v-for="(item, key, i) in item.SM_tags" :key="i">{{key}}:{{item.value}}</span>
			</div>
			<div class="listTools" :class="{hide:detailState}">
				<lg-checkbox :label="item.id[0].convertedValue">{{''}}</lg-checkbox>
				<a class="font-s14 details" @click="handleAr(item)">详情</a>
				<a class="font-s14 soure info-color" :href="item.S_redirectUrl[0].value" target="_blank">链接</a>
			</div>
			<div class="slistTools" :class="{hide:!detailState}">
				<lg-checkbox :label="item.id[0].convertedValue">{{''}}</lg-checkbox>
				<a class="font-s14 ssoure info-color" :href="item.S_redirectUrl[0].value" target="_blank">链接</a>
			</div>
		</div>
	</li>
</template>
<script>
	import LgCheckbox from '../../components/checkbox'
	import { dateTime } from '../../utils/filters'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				checked: false
			}
		},
		computed: {
			...mapState({
				detailState: state => state.detailState,
				split: state => state.split,
				siteId: state => state.siteId
			})
		},
		props: {
			item: {}
		},
		methods: {
			fetchArticle(item) {
				var article = {}
				 article.bizCode= 'headlines'
				if(this.siteId == '190014')
				   article.bizCode= 'headlines'
				   else if(this.siteId == '190019')
				   article.bizCode = 'govheadlines'
				article.id = item.id[0].value
				article.author = item.author[0].value
				article.source = item.source[0].value
				article.title = item.title[0].value
				article.caId = item.curCatalog[0].value
				article.catagory = item.curCatalog[0].convertedValue
				article.caName = item.curCatalog[0].convertedValue
                this.$store.state.showVote = item.isVote[0].value === '1'
				this.$store.dispatch('ENSURE_ARTICLE', article)
				if(this.detailState)
				   this.$store.dispatch('ENSURE_DETAIL', {
					open: true,
					id: item.id[0].value,
					split:this.split
				})
			},
			handleAr(item) {
				var param = {}
				this.$store.dispatch('ENSURE_DETAIL', {
					open: true,
					id: item.id[0].value,
					split:true
				}).then((res) => {
//					console.log('handleAr', param)
				})
			}
		},
		components: {
			LgCheckbox,
			dateTime
		}
	}
</script>
<style>
	.news-list {
		height: calc(100vh - 95px);
		overflow-y: auto;
		padding: 10px;
		background: #fff;
		min-height: calc(100vh - 95px);
	}

	.news-list ul {
		margin: 0;
		padding: 0;
	}

	.news-list ul li {
		background-color: #fff;
		padding: 10px 10px 10px 10px;
		border-bottom: 1px solid #eee;
		position: relative;
		line-height: 20px;
		list-style: none;
		transition: background .6s;
	}

	.news-list ul li.isActive,
	.news-list ul li:hover {
		background: #eee;
	}
	/*.news-list ul li.isActive .list-tools,
	.news-list ul li:hover .list-tools {
		display: block;
	}*/

	.news-list .lg-checkbox {
		position: absolute;
		bottom: 9px;
		right: 0px;
	}

	.details {
		position: absolute;
		right: 10px;
		bottom: 34px;
		color: #1f2d3d;
	}
	.sdetails{
		position: absolute;
		right: 40px;
    bottom: 6px;
		border: 1px solid silver;
		border-radius: 3px;
		padding: 0px 2px;
	}
	.soure {
		position: absolute;
		right: 10px;
		bottom: 64px;
		border: 1px solid silver;
		border-radius: 3px;
		padding: 1px 2px;
	}
	.ssoure{
		position: absolute;
		right: 42px;
    bottom: 10px;
		border: 1px solid silver;
		border-radius: 3px;
		padding: 0px 2px;
	}
	.details:hover,
	.soure:hover {
		border-color: #1f2d3d;
	}

	.news-list .score {
		color: #828d95;
		font-size: 1.1em;
		font-weight: 700;
		position: absolute;
		top: 6px;
		left: 10px;
		height: 2rem;
		width: 2rem;
		line-height: 2rem;
		text-align: center;
		border: 2px solid #828d95;
		border-radius: 50%;
	}

	.news-list .title a {
		text-overflow: ellipsis;
		overflow: hidden;
		margin: 0;
		/*display: inline-block;*/
		font-weight: 600;
		padding-right: 11px;
	}

	.news-list .title a.details {
		font-weight: 1;
	}

	.listTools {
		/*position: absolute;*/
		/*display: block;*/
		right: 0px;
		bottom: 10px;
		border-radius: 3px;
	}
	.slistTools{
		display: inline-block;
	}
	.ogSite {
		margin-right: 10px;
		font-size: 0.875rem;
	}

  .meta{
    display: inline-block;
  }

	.meta span {
		color: rgba(0, 0, 0, 0.54118);
		font-size: 0.875rem;
		margin-right: 10px;
	}
	.margin-t4.tags{
		word-wrap:break-word;
	}
	.tags .tag {
		font-size: 12px;
		/*margin-right: 10px;*/
	}
  .no_padding {
    padding: 0px !important;
  }
  .autoFlag {
    display: inline-block;
    color:rgb(247, 186, 42);
  }
</style>
