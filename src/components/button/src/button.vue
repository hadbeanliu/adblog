<template>
  <a :disabled="disabled" class="button"
    @click="handleClick"
    :autofocus="autofocus"
    :class="[
      type ?  type : '',
      size ?  size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading
      }
    ]"
  >
    <i class="fa fa-spinner fa-pulse fa-spin" v-if="loading"></i>
    <i :class="'fa fa-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </a>
</template>
<script>
  export default {
    name: 'LgButton',

    props: {
      type: {
        type: String,
        default: ''
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      loading: Boolean,
      disabled: Boolean,
      autofocus: Boolean
    },

    methods: {
      handleClick (evt) {
        this.$emit('click', evt)
      }
    }
  }
</script>
