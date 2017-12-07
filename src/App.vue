<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="less">
#app{height: 100vh;overflow: auto;}
@import url('../static/less/themes.less');
@import url('./assets/element/theme/index.css');
</style>
