<template>
  <div class="lg-tag-box">
  	<div>
      <span
          class="lg-tag"
          :class="[type ? 'bg' + type : '', {'is-hit': hit}]"
          :style="{backgroundColor: color}"
          v-for='(tag, index) in tags'
          :key="tag"
          @click.stop="showSpaninput(tag)"
        >
          <span v-if="!tag.inp">{{tag.val}}</span>
          <input
            class="add-new-tag"
            type="text"
            v-if="tag.inp"
            v-model="spanVal"
            @keyup.enter="changeTag(index)"
            @blur="changeTag(index)"
            ref="changeValue"
          >
          <i @click.self.stop="handleClose(tag)">×</i>
      </span>
    	<input
    	  class="add-new-tag"
    	  v-if="inputVisible"
    	  type="text"
    	  ref="saveTagInput"
    	  v-model="inputValue"
    	  @keyup.enter="handleInputConfirm"
    	  @blur="mouseLeaveActive"
    	>
    	<button v-else class="button tiny hollow" @click="showInput">+ New Tag</button>
    	<slot name="box"></slot>
  </div>
  <div class="recTags" v-if="recTags">
  		<span
          class="lg-tag"
      		:class="[type ? 'bg-' + type : '', {'is-hit': hit}]"
      		:style="{backgroundColor: color}"
      		v-for='(tag, index) in recTags'
      		:key="tag"
      		@click="addTags(tag)"
      		v-if="!currtag['curr' +index]"
      	>
      	<i class="fa fa-plus"></i> {{tag}}
    	</span>
    	<span
    		v-else
          	class="lg-tag"
      	>
      	<i class="fa fa-plus"></i> {{tag}}
      	</span>
  	</div>
  </div>
</template>
<script>
  export default {
    name: 'LgTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      closeTransition: Boolean,
      color: String,
      value: {
        type: Array,
        default: function () {
          return []
        }
      },
      recTags: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        currtag: {},
        saveTagindex: [],
        inputVisible: false,
        inputValue: '',
        spanVal: '',
        visible: [],
        resultTags: [],
        tags: []
      }
    },
    computed: {
      rectag: {
        get () {
          return this.currtag
        },
        set (rectags) {
          var length = rectags.length
          for (let i = 0; i < length; i++) {
            this.currtag['curr' + i] = false
          }
        }
      }
    },
    mounted () {
      this.initTags(this.value)
      this.rectag = this.recTags
    },
    watch: {
      value (val, old) {
        let tmpTags = this.tags.map(t => t.val)
        if (val.length !== this.tags.length || JSON.stringify(val) !== JSON.stringify(tmpTags)) {
          this.initTags(val)
          this.saveTagindex = []
          this.currtag = []
        }
      },
      saveTagindex (val) {
        var length = this.recTags.length
        for (let i = 0; i < length; i++) {
          this.currtag['curr' + i] = false
        }
        for (var v of this.saveTagindex) {
          this.currtag['curr' + v] = true
        }
      }
    },
    methods: {
      initTags (tags) {
        var a = tags
//        console.log('afsdasdfasdf')
        var b = this.recTags
        for (var i = 0; i < b.length; i++) {
          var temp = b[i].toString()
          for (var j = 0; j < a.length; j++) {
            if (temp === a[j]) {
              this.saveTagindex.push(i)
              break
            }
          }
        }
        this.tags = tags.map(t => ({val: t, inp: false}))
      },
      addTags (tag) {
        var tag = tag.toString()
        this.tags.push({
          val: tag,
          inp: false
        })
        this.compare(tag)
        this.$emit('input', this.tags.map(t => t.val))
      },
      compare (tag) {
        var len = this.recTags.length
        for (let i = 0; i < len; i++) {
          if (tag === this.recTags[i].toString()) {
            this.saveTagindex.push(i)
          }
        }
      },
      handleClose (tag) {
        this.delsameTagindex(tag.val)
        this.tags.splice(this.tags.indexOf(tag), 1)
        this.$emit('input', this.tags.map(t => t.val))
      },
      delsameTagindex (val) {
        var i = this.recTags.indexOf(val)
        var obj = this.saveTagindex
        let len = obj.length
        for (let j = 0; j < len; j++) {
          if (i === this.saveTagindex[j]) {
            this.saveTagindex.splice(j, 1)
          }
        }
      },
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.focus()
        })
      },
      showSpaninput (i) {
        i.inp = true
        this.spanVal = i.val
        this.$nextTick(_ => {
          this.$refs.changeValue[0].focus()
        })
      },
      handleInputConfirm () {
        let val = this.inputValue ? this.inputValue : ''
        if (!val) {
          this.inputVisible = false
          return
        }
        for (let i of this.tags) {
          if (i.val === val) {
            alert('已经存在了')
            this.inputValue = ''
            return
          }
        }
        this.addTags(this.inputValue)
        this.$emit('input', this.tags.map(t => t.val))
        this.inputValue = ''
      },
      mouseLeaveActive () {
        this.inputVisible = false
        this.handleInputConfirm()
      },
      changeTag (index) {
        this.tags[index].inp = false
        let val = this.spanVal ? this.spanVal : ''
        let oldval = this.tags[index].val
        console.log(oldval)
        if (!val || oldval === this.spanVal) return
        for (let i of this.tags) {
          if (i.val === val) {
            alert('已经存在了')
            return
          }
        }
        this.delsameTagindex(oldval)
        this.tags[index].val = this.spanVal
        this.$emit('input', this.tags.map(t => t.val))
      }
    }
  }
</script>
<style>
	 .lg-tag-box{
     margin-bottom: 0.5rem;
   }
   .lg-tag-box>div:first-child{
     min-height:31px;
     border: #d2e1f9 1px solid;
     line-height: 26px;
   }
   .lg-tag-box .recTags{
     margin-top: 6px;
   }
   .lg-tag{
	    background-color: #e4e8f1;
	    display: inline-block;
	    padding: 0 5px;
	    height: 20px;
	    line-height: 16px;
	    font-size: 12px;
	    border-radius: 4px;
	    box-sizing: border-box;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    margin: 5px 0 0 6px;
   }
   .lg-tag i{
     font-size: 1rem;
     cursor: pointer;
   }
   .lg-tag-box .recTags .lg-tag{
     margin: 0 6px 0 0;
     font-size: 12px;
     cursor: pointer;
   }
   .lg-tag-box .recTags .lg-tag i{
     font-size: 12px;
   }
   .lg-tag-box .button, .lg-tag-box input{
     margin:0 0 0 6px
   }
   .lg-tag-box .add-new-tag{
     width: 78px;
     vertical-align: bottom;
     height: 16px;
   }
</style>
