<template>
  <div class="cateLog">
    <div class="selected">
      <span v-for="(item, index) in getArCatalog()" :key="index" class="lg-tag">{{item.caName}}<i @click="deleteCaId(index)">×</i></span>
      <span class="clear" title="清空" @click="clear">×</span>
    </div>
    <div class="row">
      <div class="large-12 columns">
        <div class="recommend">所有栏目</div>
      </div>
      <div class="large-12 columns">
        <div class="recommend">推荐栏目
          <a class="button tiny success float-right no-margin" @click="autoClassify">推荐</a>
        </div>
      </div>
    </div>
    <div class="row margin-t">
      <div class="large-12 columns">
        <lg-checkbox-group class="catelogList" v-model="sIds">
          <lg-tree :data="catalogTree" :props="props"></lg-tree>
        </lg-checkbox-group>
      </div>
      <div class="large-12 columns">
        <div class="recCon catelogList">
          <span class="lg-tag" v-for="(item, index) in recCatagory" @click="recCatagorySelect(item)">{{item.caName +','+ item.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import LgTree from '@/components/Tree'
  import LgCheckboxGroup from '@/components/checkbox-group'
  import { fetchCatalog } from '../../api'
  export default {
    data () {
      return {
        props: {
          id: 'caId',
          label: 'caName',
          children: 'children',
          showCheckbox: true,
        },
        catagory:"",
        sIds: [],
        mapCatalogs: {},
        catalogTree: []
      }
    },
    computed: {
      ...mapState({
        article: state => state.article,
        recCatagory: state => state.recCatagory,
        siteId: state =>state.siteId
      })
    },
    mounted () {
      this.$nextTick(function () {
        this.getCatalog()
      })
    },
    methods: {

      autoClassify () {
        var content = this.article.text
        this.$store.dispatch("AUTO_CLASSIFY", content)
      },
      recCatagorySelect ( item ){
      
        this.sIds.push( item.caId )

      },
      selectIds () {
        var arr = []
        var currCatalog = this.article ? this.article.caId: ""
        arr.push(currCatalog)
        this.sIds = arr

      },
      getCatalog () {
        fetchCatalog().then((res) => {
          this.mapCatalogs = res.mapCatalogs
          this.catalogTree = res.catalogTree
        })
      },
      getArCatalog () {
        var arr = []
        for (let d of this.sIds) {
          arr.push(this.mapCatalogs[d])
        }
        this.$store.commit('SET_CATAGORY', arr)

        return arr
      },
      deleteCaId (i) {
        this.sIds.splice(i, 1)
      },
      clear () {
        this.sIds = []
      }
    },
    watch: {
      siteId: function () {
        fetchCatalog(this.siteId).then((res) => {
          this.mapCatalogs = res.mapCatalogs
          this.catalogTree = res.catalogTree
        })
      },
      article: function () {
        this.selectIds()
      },
      sIds: function () {
        this.getArCatalog()
      }
    },
    components: {
      LgTree,
      LgCheckboxGroup
    }
  }
</script>
<style>
  .selected{
    margin-bottom: 1rem;
    min-height: 26px;
    border: 1px solid #dfdfe1;
    border-radius: 3px;
    padding-bottom: 4px;
    position: relative;
  }
  .selected .clear{position: absolute;right: 6px;top: 3px;cursor: pointer;}
  .lg-tag {
    background-color: #e4e8f1;
    display: inline-block;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    white-space: nowrap;
    margin: 5px 0px 0px 6px;
  }
  .lg-tag i{font-style: normal; cursor: pointer;}
  .catelogList{
    height: 200px;
    margin-bottom: 1rem;
    overflow: auto;
  }
  .recommend{border-bottom: 1px solid #ddd;}
</style>
