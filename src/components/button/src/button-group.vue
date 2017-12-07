<template>
  <div class="button-group" 
  	:class="type ? type : ''"	
  >
    <slot></slot>
  </div>
</template>
<script>
  /**
   * button
   * @module components/basic/menu
   * @desc 用于按钮组
   * @param {string} label - 名称
   */
  export default {
    name: 'LgButtonGroup',
    
    props: {
    	type: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped>
	.button-group .button{border-radius: 0;}
	.button-group .button:nth-child(1){border-radius: 4px 0 0 4px;}
	.button-group .button:last-child{border-radius:0 4px 4px 0;}
	.stacked.button-group .button{border-radius: 0;}
	@media only screen and (max-width: 768px) {
		.stacked-for-small.button-group .button,
		.stacked-for-medium.button-group .button{
			border-radius: 0;
		}
	}
</style>
