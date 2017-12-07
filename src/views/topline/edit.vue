<template>
  <div class="edit">
    <div id="slide-content" class="slide-content tiny" aria-hidden="true">
      <div class="tab-default pannel">
        <div class="tab" id="tab_basic">
          <div class="tabhead float-left">
            编 辑
          </div>
          <ul class="clearfix float-right">
            <li :class="{on:isBase}" @click="active('base')">基础信息</li>
            <li :class="{on:isPush}" @click="active('push')">推送</li>
            <li :class="{on:isCount}" @click="active('count')">统计</li>
          </ul>
        </div>
        <div class="modcon ">
          <div class="tab_swiper">
            <!--基础信息-->
            <div id="data_tabdefault_con1" v-show="index==1">
              <div class="row">
                <div class="large-4 small-24 column no-padding">
                  <label class="text-right">标题：</label>
                </div>
                <div class="large-20 small-16 column">
                  <input type="text" v-model="title" />
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">所属栏目：</label>
                </div>
                <div class="large-20 small-18 column end">
                  <lg-catalog></lg-catalog>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">标签：</label>
                </div>
                <div class="large-20 small-18 column">
                  <lg-tag v-model="tags" type="warning" :recTags="getValue('withIDF').split('|')">
                    <a class="tiny fa fa-plus" slot="box"></a>
                  </lg-tag>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">人名：</label>
                </div>
                <div class="large-20 small-18 column">
                  <lg-tag type="warning" v-model="nrtags" :recTags="getValue('nr').split(',')">
                    <a class="tiny fa fa-plus" slot="box"></a>
                  </lg-tag>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">地点：</label>
                </div>
                <div class="large-20 small-18 column">
                  <lg-tag type="warning" v-model="nstags" :recTags="getValue('ns').split(',')">
                    <a class="tiny fa fa-plus" slot="box"></a>
                  </lg-tag>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">机构：</label>
                </div>
                <div class="large-20 small-18 column">
                  <lg-tag type="warning" v-model="nttags" :recTags="getValue('nt').split(',')">
                    <a class="tiny fa fa-plus" slot="box"></a>
                  </lg-tag>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">作品：</label>
                </div>
                <div class="large-20 small-18 column">
                  <lg-tag type="warning" v-model="nptags" :recTags="getValue('np').split(',')">
                    <a class="tiny fa fa-plus" slot="box"></a>
                  </lg-tag>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">事件：</label>
                </div>
                <div class="large-20 small-18 column end">
                  <div class="news-tag margin-t6 margin-b">
                    <input type="text" value="" />
                  </div>
                </div>
              </div>
              <div class="row margin-b">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">时间：</label>
                </div>
                <div class="large-20 small-18 column end">
                  <div class="input">
                    {{getValue('createTime_title') }} / {{getValue('pubDate_title') }}
                  </div>
                </div>
              </div>
              <div class="row margin-b">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">评分：</label>
                </div>
                <div class="large-20 small-18 column end">
                  <div class="small-12 large-12 medium-12 end">
                    <div class="score">
                      <span class="badge" v-for="(item, index) in scores" :key="index" :class="{'bg-info' : index ===curIndex }" @click="curScore(index)">{{item}}</span>
                      <span>{{score}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="large-4 small-6 column no-padding">
                  <label class="text-right">关联文章：</label>
                </div>
                <div class="large-20 small-18 column end">
                  <div class="small-12 large-12 medium-12 end">
                    <a class="bg-warning button no-margin-b tiny radius margin-b" data-open="rel-article" @click="relArticle"><i class="fa fa-plus" aria-hidden="true"></i>创建关联文章</a>
                  </div>
                  <!--<div class="sure_condition">-->
                    <!--<ul>-->
                      <!--<li>-->
                        <!--<a data-open="create-conditions">1.站内文章：标题:索尼的发展历程;</a>-->
                        <!--<a class="condition-close">×</a>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<a data-open="create-conditions">2.站外文章：链接:www.xxx.com;标题:索尼的发展历程;</a>-->
                        <!--<a class="condition-close">×</a>-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <!--统计-->
            <div id="data_tabdefault_con2" v-show="index==2">
            </div>
            <!--推送-->
            <div id="data_tabdefault_con3" v-show="index==3">
              <div class="screening-conditions">
                <label class="title">当前推送对象的条件列表:<a class="bg-warning button no-margin-b tiny radius margin-l10" data-open="create-conditions"  @click="createConditions">
                  <i class="fa fa-plus" aria-hidden="true"></i>添加推送人群</a>
                </label>
                <div class="sure_condition">
                  <ul>
                    <li>
                      <a data-open="create-conditions">1.青少年：城市:福建省福州市;年龄:16-18;性别:不限;</a>
                      <a class="condition-close">×</a>
                    </li>
                    <li>
                      <a data-open="create-conditions">2.老年人：城市:福建省福州市;年龄:16-18;性别:不限;</a>
                      <a class="condition-close">×</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reveal-footer clearfix">
        <div class="row">
          <div class="small-24 columns text-center padding-t">
            <a class="button hollow radius secondary small"> 取 消 </a>
            <lg-button :loading="submiting" class="small button radius" @click="commit"> 提 交 </lg-button>
          </div>
        </div>
      </div>
      <!--<a class="close-slide-content" aria-label="Close" title="关闭">&#215;</a>-->
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import LgCatalog from '../../components/catelogSelect'
  import LgTag from '@/components/tag'
  import LgButton from '@/components/button'
  export default {
    data() {
      return {
        tags: [],
        rectags: ['1', '2'],
        nstags: [],
        nttags: [],
        nrtags: [],
        nptags: [],
        scores: [0, 1, 2, 3, 4, 5],
        score: 0,
        curIndex: 0,
        pubdate: "",
        submiting: false,
        title: '',
        index: '1',
        isBase: true,
        isCount: false,
        isPush: false
      }
    },
    computed: {
      ...mapState({
        article: state => state.article,
        addTag: state => state.addTag,
      })
    },
    watch: {
      article: function() {
        this.getTag()
        this.gettags()
        this.curScore(Number(this.article.manualScore))
        this.submiting = false,
        this.title = this.getValue('title')
      },
      addTag: function () {
        this.tags.push(this.addTag)
      }
    },
    methods: {
      commit() {
        this.submiting = true
        var form = {}
        form.tag = this.tags
        form.manualScore = this.score
        form.pubdate = this.pubdate
        form.title = this.title
        form.id = this.article.id
        form.npTag = this.nptags
        form.nsTag = this.nstags
        form.ntTag = this.nttags
        form.nrTag = this.nrtags
        this.$store.dispatch("UPDATE_ARTICLE", form).then((res) => {
          var resType = 'success'
          var resTitle = '提交成功'
          if(res.bodyText.indexOf('fail') != -1) {
            resType = 'error'
            resTitle = '失败'
          }
          this.$notify({
            title: resTitle,
            message: res.bodyText,
            type: resType,
          })
          this.submiting = false
        }, (res) => {
          this.$notify({
            title: '失败',
            message: res.bodyText,
            type: 'error',
            duration: 0
          })
        })
      },
      getValue(type) {
        return this.article[type] ? this.article[type] : ''
      },
      getTag() {
        this.tags = []
        if(!this.article.tag) {
          return
        }
        var tagArr = JSON.parse(this.article.tag)
        for(var tag in tagArr) {
          this.tags.push(tag + "|" + tagArr[tag])
        }
      },
      gettags() {
        this.nrtags = []
        this.nttags = []
        this.nstags = []
        this.nptags = []
        if(this.getValue("figure").length > 0)
          this.nrtags = this.getValue("figure").split(',')
        if(this.getValue("agency").length > 0)
          this.nttags = this.getValue("agency").split(',')
        if(this.getValue("location").length > 0)
          this.nstags = this.getValue("location").split(',')
        if(this.getValue("produce").length > 0)
          this.nptags = this.getValue("produce").split(',')
      },
      handleAr() {
        this.$emit('openAr', true)
      },
      curScore(index) {
        this.score = this.scores[index]
        this.curIndex = index
      },
      active (type) {
        if(type=='base'){
          this.index = 1
          this.isBase = true
          this.isCount = false
          this.isPush = false
        } else if (type=='count'){
          this.index = 2
          this.isBase = false
          this.isCount = true
          this.isPush = false
        } else if (type=='push'){
          this.index = 3
          this.isBase = false
          this.isCount = false
          this.isPush = true
        }
      },
      relArticle () {
        this.$emit('openRelArticle', true)
      },
      createConditions () {
        this.$emit('openCreateConditions', true)
      }
    },
    components: {
      LgCatalog,
      LgTag,
      LgButton
    }
  }
</script>
<style>
  .edit {
    height: calc(100vh - 64px);
    overflow-y: auto;
    width: 40%;
    float: right;
    display: inline-block;
    padding: 1rem 1rem 0 0;
  }
  .slide-content {
    background: rgba(255, 255, 255, 0.95);
  }
  .slide-content .modcon {
    height: calc(100vh - 191px);
    overflow: auto;
  }
  .tab-default .tab {
    height: 46px;
    border-bottom: 2px solid #ddd;
    margin: 0 0 0 10px;
    position: relative;
  }
  .slide-content .tab .tabhead {
    font-size: 16px;
    margin: 10px 0 0 10px;
  }
  .tab-default .tab ul {
    overflow: hidden;
    margin: 0;
    height: 46px;
    line-height: 46px;
    padding: 0 0 0 6px;
    position: absolute;
    right: 0;
  }
  .tab-default .tab li.on {
    color: #ffffff;
    background: rgba(50, 64, 87, .8);
  }
  .tab-default .tab li {
    list-style: none;
    font-size: 12px;
    padding: 0 10px;
    line-height: 30px;
    float: left;
    height: 30px;
    text-align: center;
    cursor: pointer;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px #e3e3e3;
    background-color: #e3e3e3;
    margin: 15px 10px 0 0px;
    border-radius: 4px 4px 0 0;
    transition: all .3s;
  }
  .tab-default .modcon {
    border: none;
    border-bottom: 1px solid #ddd;
  }
  .modcon {
    padding: 10px;
    background: #ffffff;
  }
  .reveal-footer {
    height: 50px;
  }
  .reveal-footer a {
    margin-bottom: 0;
  }
  .text-right {
    text-align: right;
  }
  .tabhead a {
    font-size: 14px;
    margin-left: 10px;
  }
  p {
    margin: 0 0 1rem 0;
  }
  p img {
    display: block;
  }
  .input {
    min-height: 2em;
    border: 1px solid #d2e1f9;
    border-radius: 2px;
    padding: 4px;
  }
  .white-space {
    display: inline-block;
    max-width: calc(100% - 160px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 13px;
  }
  .sure_condition ul li{
    list-style: none;
  }
</style>
