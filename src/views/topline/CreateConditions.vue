<template>
  <el-dialog
    title="请选择标签项"
    :visible.sync="dialogVisible"
    size="small"
    class="rel-article">
    <div class="tag-form">
      <div class="condition-list">
        <div class="step_title">条件菜单<span class="font-s12 font-gray margin-l6">(选择条件菜单生成条件表单)</span><a class="btn_togglle"><i class="fa fa-angle-up"></i></a></div>
        <ul class="clearfix">
          <li>
            <a href="#" data-tag-id="mapPick">地域</a>
            <span class="checked"></span>
          </li>
          <li>
            <a href="#" data-tag-id="tag-age">年龄</a>
            <span class="checked"></span>
          </li>
          <li>
            <a href="#" data-tag-id="tag-sex">性别</a>
            <span class="checked"></span>
          </li>
          <li>
            <a href="#" data-tag-id="tag-work">职业</a>
            <span class="checked"></span>
          </li>
          <li>
            <a href="#" data-tag-id="tag-preference">偏好</a>
            <span class="checked"></span>
          </li>
        </ul>
      </div>
      <div class="selected_list">
        <div class="step_title">已选条件内容表单</div>
        <div class="condition-form">
          <div class="row" id="mapPick" style="display: none;">
            <div class="large-2 medium-2 small-2 column">
              <label class="text-right">地域：</label>
            </div>
            <div class="large-4 medium-4 small-4 columns">
              <select class="city-province" name="province"></select>
            </div>
            <div class="large-4 medium-4 small-4 columns">
              <select class="city-city" name="city"></select>
            </div>
            <div class="large-1 medium-2 small-2 column end">
              <label><a class="condition-close">×</a></label>
            </div>
          </div>
          <div class="row" id="tag-age" style="display: none;">
            <div class="large-2 medium-2 small-2 column">
              <label class="text-right">年龄：</label>
            </div>
            <div class="large-4 medium-4 small-4 columns input-line">
              <input type="text" class="begin-age" placeholder="请输入起始年龄" required="">
            </div>
            <div class="large-4 medium-4 small-4 columns end">
              <input type="text" class="end-age" placeholder="请输入截止年龄" required="">
            </div>
            <div class="large-1  medium-2 small-2 column">
              <label>（岁）</label>
            </div>
            <div class="large-1 medium-2 small-2 column end">
              <label><a class="condition-close">×</a></label>
            </div>
          </div>
          <div class="row" id="tag-sex" style="display: none;">
            <div class="large-2 medium-2 small-2 column">
              <label class="text-right">性别：</label>
            </div>
            <div class="large-4 medium-9 small-12 columns end">
              <label>
                <input type="radio" name="sex" value="男" id="man" /><label for="man">男</label>
                <input type="radio" name="sex" value="女" id="women" /><label for="women">女</label>
                <input type="radio" name="sex" value="不限" id="ok" checked="checked" /><label for="ok">不限</label>
              </label>
            </div>
            <div class="large-1 medium-2 small-2 column end">
              <label><a class="condition-close">×</a></label>
            </div>
          </div>
          <div class="row" id="tag-work" style="display: none;">
            <div class="large-2 medium-2 small-2 column">
              <label class="text-right">职业：</label>
            </div>
            <div class="large-4 medium-4 small-6 columns end">
              <input type="text" class="occupation" placeholder="请输入职业" required="">
            </div>
            <div class="large-1 medium-2 small-2 column end">
              <label><a class="condition-close">×</a></label>
            </div>
          </div>
          <div class="row" id="tag-preference" style="display: none;">
            <div class="large-2 medium-2 small-2 column">
              <label class="text-right">偏好：</label>
            </div>
            <div class="large-4 medium-4 small-6 columns end">
              <input type="text" class="hobby" placeholder="请输入爱好" required="">
            </div>
            <div class="large-1 medium-2 small-2 column end">
              <label><a class="condition-close">×</a></label>
            </div>
          </div>
        </div>
      </div>
      <div class="condition-name">
        <div class="step_title">创建条件的名称</div>
        <div class="row margin-t">
          <div class="large-3 medium-2 small-2 column">
            <label class="font-s12">条件名称：</label>
          </div>
          <div class="large-8 medium-4 small-6 columns end">
            <input type="text" class="occupation" value="青少年" required="">
          </div>
        </div><div class="row margin-t">
        <div class="large-3 medium-2 small-2 column">
          <label class="font-s12">推送级别：</label>
        </div>
        <div class="large-8 medium-4 small-6 columns end">
          <el-input-number size="small" v-model="num1"></el-input-number>
          <span class="font-gray font-s12">总计别为10,默认推送级别为1级</span>
        </div>
      </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        num1: 1
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
    }
  }
</script>
<style>
  .tag-form {
    /*padding: 20px;*/
  }
  .tag-form .step_title {
    font-size: 14px;
    height: 30px;
    border-bottom: 1px solid #ddd;
  }
  .btn_togglle {
    float: right;
    font-size: 16px;
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
  }
  .tag-form ul {
    margin: 0 -0.4375rem 10px;
    padding-top: 20px;
  }
  .tag-form ul li {
    float: left;
    position: relative;
    height: 30px;
    line-height: 30px;
    width: 20%;
    padding: 0 0.4375rem;
    text-align: center;
    list-style: none;
  }
  .tag-form ul li a {
    display: block;
    font-size: 12px;
    border: 1px solid #ed4040;
  }
  .tag-form .step_title {
    font-size: 14px;
    height: 30px;
    border-bottom: 1px solid #ddd;
  }
  .condition-form {
    min-height: 120px;
    padding-top: 20px;
  }
  .tag-form .condition-name .step_title {
    font-size: 14px;
    height: 30px;
    border-bottom: 1px solid #ddd;
  }
  .tag-form .condition-name label{
    color: #4d4d4d;
    display: block;
    line-height: 2.25rem;
    font-weight: normal;
    cursor: pointer;
  }
</style>
