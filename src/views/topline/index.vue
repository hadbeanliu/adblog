<template>
	<div class="">
		<lg-header></lg-header>
		<search-level></search-level>
		<edit @openRelArticle="openArticle" @openCreateConditions="openCreateConditions"></edit>
		<list-view></list-view>
		<detail></detail>
    <rel-article :visible="articleShow"></rel-article>
    <create-conditions :visible="ConditionsShow"></create-conditions>
	</div>
</template>
<script>
	import LgHeader from '@/components/header'
	import searchLevel from './searchLevel'
	import listView from './listView'
	import Edit from './edit'
	import Detail from './detail'
  import RelArticle from './RelArticle'
  import CreateConditions from './CreateConditions'
	export default {
		data () {
			return {
				open: false,
        dialogVisible: false,
        articleShow: false,
        ConditionsShow: false
			}
		},
		components: {
			LgHeader,
			searchLevel,
			listView,
			Edit,
			Detail,
      RelArticle,
      CreateConditions
		},
		methods: {
			searchShow () {
			},
      openArticle (type) {
        this.articleShow = type
      },
      openCreateConditions (type) {
        this.ConditionsShow = type
      }
		}
	}
</script>
<style>
	.search {
		height: calc(100vh - 60px);
		overflow-y: auto;
	}

	.search {
		width: 15%;
		float: left;
		display: inline-block;
		background: rgba(50, 64, 87, .8);
		z-index: 1;
		position: relative;
		/*left: -192px;*/
	}

	.list-view {
		width: 45%;
		float: right;
		display: inline-block;
		position: relative;
	}

	.smallView {
		width: 20% !important;
	}
	/*.detail {
		width: 30%;
		float: left;
		display: inline-block;
	}

	.edit {
		width: 30%;
		float: left;
		display: inline-block;
	}*/
</style>
