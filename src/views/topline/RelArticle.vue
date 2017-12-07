<template>
  <el-dialog
    title="相似文章推荐"
    :visible.sync="dialogVisible"
    size="small"
    @close="cancelDialog"
    class="rel-article">
    <form>
      <!--<div class="row">-->
        <!--<div class="large-4 medium-2 small-4 column">-->
          <!--<label>文章关系：</label>-->
        <!--</div>-->
        <!--<div class="large-10 medium-10 small-8 columns">-->
          <!--<select id="sel">-->
            <!--<option selected="">11</option>-->
            <!--<option>22</option>-->
            <!--<option>33</option>-->
            <!--<option>44</option>-->
          <!--</select>-->
        <!--</div>-->
      <!--</div>-->
      <div class="row">
        <div class="large-4 medium-2 small-4 column">
          <label>站内文章：</label>
        </div>
        <div class="large-7 medium-10 small-8 columns">
          <el-autocomplete
            class="inline-input"
            v-model="state"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入标题"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </div>
      <div class="row">
        <div class="large-4 medium-2 small-4 column">
          <label>站外文章：</label>
        </div>
        <div class="large-7 medium-10 small-8 columns">
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入标题"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="large-10 medium-10 small-8 columns">
          <el-input size="small" v-model="input" placeholder="请输入链接"></el-input>
        </div>
      </div>
    </form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="relArticleSure(state)">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        restaurants: [],
        state: '',
        state1: '',
        input: ''
      }
    },
    computed: {
    },
    props: {
      visible: Boolean,
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      }
    },
    methods: {
      cancelDialog () {
        this.$emit('closeDialog', false)
        this.state = ''
        this.state1 = ''
        this.input = ''
      },
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {
        return [
          { "value": "NBA 1/4 赛季 MVP 榜：西詹力压东詹登顶"},
          { "value": "4 届奥运 3 种身份 安贤洙或在母国谢幕"},
          { "value": "没大碍也让库里休战 勇士放弃常规赛？"},
          { "value": "NASA发现壮观日冕洞：宛如深色阴影 或与极光有关"},
          { "value": "移动支付当道 怀旧的老外把钱包粘在了手机上"},
          { "value": "索尼A7RIII工艺到底如何 有人拆解给你看"},
          { "value": "索尼的发展历程"}
        ]
      },
      handleSelect (item) {
        console.log(item)
      },
      relArticleSure (state) {
        console.log('aa', state)
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>
<style>

</style>
