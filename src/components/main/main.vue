<template>
  <Layout class="layout">
    <Header>
      <HeaderBar></HeaderBar>
    </Header>
    <Layout>
      <Sider :style="{overflow: 'auto'}">
        <Menu
          theme="dark"
          width="auto"
          ref="menu"
          @on-select="handleSelect"
          :active-name="activeName"
          :open-names="openName"
          accordion
        >
          <div v-for="item in menu_list" :key="item.menu_url" v-if="ifExist">
            <MenuItem v-if="!item.children_list" :name="item.menu_url">{{item.menu_name}}</MenuItem>
            <menuItem v-if="item.children_list" :itemData="item"></menuItem>
            <!--<Submenu v-if="item.children_list" :name="item.menu_id">-->
            <!--<template slot="title">-->
            <!--<Icon :type="item.menu_icon" />-->
            <!--{{item.menu_name}}-->
            <!--</template>-->
            <!--<div v-for="(item_child) in item.children_list" :key="item_child.menu_url">-->
            <!--<MenuItem v-if="!item_child.children_list" :name="item_child.menu_url"> {{item_child.menu_name}}</MenuItem>-->
            <!--<Submenu v-if="item_child.children_list" :name="item_child.menu_id">-->
            <!--<template slot="title">-->
            <!--<Icon :type="item_child.menu_icon" />-->
            <!--{{item_child.menu_name}}-->
            <!--</template>-->
            <!--<MenuItem :name="item_child_child.menu_url" v-for="(item_child_child) in item_child.children_list" :key="item_child_child.menu_url"> {{item_child_child.menu_name}}</MenuItem>-->
            <!--</Submenu>-->
            <!--</div>-->
            <!--</Submenu>-->
          </div>
          <div v-for="item in menu_list2" :key="item.menu_url" v-if="ifShow">
            <MenuItem v-if="!item.children_list" :name="item.menu_url">{{item.menu_name}}</MenuItem>
            <menuItem v-if="item.children_list" :itemData="item"></menuItem>
            <!--<Submenu v-if="item.children_list" :name="item.menu_id">-->
            <!--<template slot="title">-->
            <!--<Icon :type="item.menu_icon" />-->
            <!--{{item.menu_name}}-->
            <!--</template>-->
            <!--<div v-for="(item_child) in item.children_list" :key="item_child.menu_url">-->
            <!--<MenuItem v-if="!item_child.children_list" :name="item_child.menu_url"> {{item_child.menu_name}}</MenuItem>-->
            <!--<Submenu v-if="item_child.children_list" :name="item_child.menu_id">-->
            <!--<template slot="title">-->
            <!--<Icon :type="item_child.menu_icon" />-->
            <!--{{item_child.menu_name}}-->
            <!--</template>-->
            <!--<MenuItem :name="item_child_child.menu_url" v-for="(item_child_child) in item_child.children_list" :key="item_child_child.menu_url"> {{item_child_child.menu_name}}</MenuItem>-->
            <!--</Submenu>-->
            <!--</div>-->
            <!--</Submenu>-->
          </div>
        </Menu>
      </Sider>
      <Content class="content">
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import HeaderBar from './components/header'
import menuItem from './components/menuItem'
import Menu from './menu'
import Menu2 from './menu2'
export default {
  name: 'Main',
  components: {
    HeaderBar,
    menuItem
  },
  data () {
    return {
      ifShow: false,
      ifExist: true,
      type: 'main',
      activeName: '',
      openName: [],
      headerHeight: 5 + 'rem',
      siderHeight: (document.documentElement.clientHeight + 50) + 'px',
      siderWidth: (document.documentElement.clientWidth * (4 / 30)) + 'px',
      foooterHeight: (document.documentElement.clientHeight * (3 / 10)) + 'px'
    }
  },
  computed: {
    menu_list () {
      this.$store.commit('menu/setSiderMenuMap', Menu)
      return Menu
    },
    menu_list2 () {
      this.$store.commit('menu/setSiderMenuMap', Menu2)

      return Menu2
    }
  },
  watch: {
    '$route' (newRoute) {
      this.activeName = newRoute.name
      let SiderMenuMap = this.$store.state.menu.siderMenuMa
      if (SiderMenuMap.has(newRoute.name) && SiderMenuMap.get(newRoute.name).parent_menu_id) {
        if (this.openName.indexOf(SiderMenuMap.get(newRoute.name).parent_menu_id) === -1) {
          this.openName.push(SiderMenuMap.get(newRoute.name).parent_menu_id)
        }
      } else {
        this.openName = []
      }
      this.$nextTick(() => this.$refs.menu.updateOpened())
    }
  },
  created () {
    if (this.$route.params.flag === 0) {
      this.ifShow = false
      this.ifExist = true
      this.activeName = this.menu_list[0].menu_url
    }
    if (this.$route.params.flag === 1) {
      this.ifExist = false
      this.ifShow = true
      this.activeName = this.menu_list2[0].menu_url
    }
  },
  mounted () {
    console.dir(this.$route.params)
    if (this.$route.params) {
      if (this.$route.params.flag === 0) {
        console.dir('lllll')
        this.ifShow = false
        this.ifExist = true
      }
      if (this.$route.params.flag === 1) {
        this.ifExist = false
        this.ifShow = true
        localStorage.setItem('menu2_sel', JSON.stringify(Menu2))
        localStorage.setItem('userWorkid', this.$route.params.userId)
      }
    }
    // 为了解决刷新浏览器，菜单改变问题
    console.dir(this.$route.params.flag)
    if (this.$route.params.flag === undefined) {
      this.Menu2 = localStorage.getItem('menu2_sel')
      if (this.Menu2) {
        this.ifExist = false
        this.ifShow = true
      }
      if (!this.Menu2) {
        this.ifShow = false
        this.ifExist = true
      }
      console.dir(this.Menu2)
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang="less">
.layout {
  height: 100%;
  width: 100%;
  .ivu-layout-header {
    background: #0c6395;
    padding: 0;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    padding-left: 43px;
  }
  .ivu-menu {
    font-size: 1rem !important;
  }
  .ivu-menu-item {
    font-size: 1rem !important;
  }
  .content {
    padding: 20px;
  }
}
</style>
