<template>
  <div>
    <Submenu v-if="itemData.children_list" :name="itemData.menu_id">
      <template slot="title">{{itemData.menu_name}}</template>
      <div v-for="(item_child) in itemData.children_list" :key="item_child.menu_url">
        <MenuItem
          v-if="!item_child.children_list"
          :name="item_child.menu_url"
        >{{item_child.menu_name}}</MenuItem>
        <menu-item v-if="item_child.children_list" :itemData="item_child"></menu-item>
      </div>
    </Submenu>
  </div>
</template>
<script>
export default {
  name: 'menuItem',
  props: {
    itemData: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {},
  mounted () { },
  methods: {
  }
}
</script>
<style lang="less">
// .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
//      padding-left: 56px!important;
// }
.ivu-menu-item {
  padding-left: 66px !important;
}
</style>
