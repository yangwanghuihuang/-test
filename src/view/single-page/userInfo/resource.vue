<template>
  <div class="resource">
    <div class="ResourceTitle">
      <h2>政策查询</h2>
      <div style="margin-top: 5px; font-size: 15px">人事档案、薪酬管理、社保管理、招聘门户管理、纪律管理，助力提高处理任务效率</div>
    </div>
    <div class="resourceContent">
      <div class="nav-list">
        <div class="nav-list-item" :class="{navChangeStyle: navSelectStyle === 'data1'}">
          <div>
            <img src="../../../assets/images/navTitle1.png" class="nav-list-img" />
          </div>
          <p
            style="cursor: pointer"
            @click="getDataByType('data1')"
            v-on:mouseover="navChangeActive($event)"
            v-on:mouseout="navRemoveActive($event)"
          >人事档案管理</p>
        </div>
        <div class="nav-list-item" :class="{navChangeStyle: navSelectStyle === 'data2'}">
          <div>
            <img src="../../../assets/images/navTitle2.png" class="nav-list-img" />
          </div>
          <p
            style="cursor: pointer"
            @click="getDataByType('data2')"
            v-on:mouseover="navChangeActive($event)"
            v-on:mouseout="navRemoveActive($event)"
          >薪酬管理</p>
        </div>
        <div class="nav-list-item" :class="{navChangeStyle: navSelectStyle === 'data3'}">
          <div>
            <img src="../../../assets/images/navTitle3.png" class="nav-list-img" />
          </div>
          <p
            style="cursor: pointer"
            @click="getDataByType('data3')"
            v-on:mouseover="navChangeActive($event)"
            v-on:mouseout="navRemoveActive($event)"
          >社保管理</p>
        </div>
        <div class="nav-list-item" :class="{navChangeStyle: navSelectStyle === 'data4'}">
          <div>
            <img src="../../../assets/images/navTitle4.png" class="nav-list-img" />
          </div>
          <p
            style="cursor: pointer"
            @click="getDataByType('data4')"
            v-on:mouseover="navChangeActive($event)"
            v-on:mouseout="navRemoveActive($event)"
          >招聘门户管理</p>
        </div>
      </div>
      <div class="nav-main">
        <div class="nav-main-sider">
          <div class="nav-main-sider-item" v-for="item in list" :key="item.id">
            <h5
              style="cursor: pointer;font-size:16px"
              @click="getDataByItem(item)"
              v-on:mouseover="siderChangeActive($event)"
              v-on:mouseout="siderRemoveActive($event)"
            >{{item.title}}</h5>
            <p style="font-size: 10px; margin-top: 10px">{{item.main}}</p>
          </div>
        </div>
        <div class="nav-main-content">
          <div class="nav-main-content-item" v-for="leftItem in childrenLeft" :key="leftItem.id">
            <p style="font-size: 15px; cursor: pointer">{{leftItem.title}}</p>
            <p style="font-size: 10px; margin-top: 10px">{{leftItem.main}}</p>
          </div>
        </div>
        <div class="nav-main-content">
          <div class="nav-main-content-item" v-for="rightItem in childrenRight" :key="rightItem.id">
            <p style="font-size: 15px; cursor: pointer">{{rightItem.title}}</p>
            <p style="font-size: 10px; margin-top: 10px">{{rightItem.main}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resourceData from './resourceData'
export default {
  name: 'resource',
  data () {
    return {
      navSelectStyle: '',
      list: [],
      childrenLeft: [],
      childrenRight: []
    }
  },
  components: {},
  watch: {},
  mounted () {
    this.getDataByType('data1')
  },
  methods: {
    getDataByType (type) {
      this.navSelectStyle = type
      this.list = resourceData[type]
      this.childrenLeft = resourceData[type][0].childrenLeft // 默认获取第一个左边部分数据
      this.childrenRight = resourceData[type][0].childrenRight // 默认获取第一个右边部分数据
    },
    getDataByItem (item) {
      this.childrenLeft = item.childrenLeft // 通过sider，拿到对应的左边部分数据
      this.childrenRight = item.childrenRight // 通过sider，拿到对应的右边部分数据
    },
    navChangeActive ($event) {
      $event.currentTarget.className = 'navAddTitle'
    },
    navRemoveActive ($event) {
      $event.currentTarget.className = 'navRemoveTitle'
    },
    siderChangeActive ($event) {
      $event.currentTarget.className = 'siderAddTitle'
    },
    siderRemoveActive ($event) {
      $event.currentTarget.className = 'siderRemoveTitle'
    }
  }
}
</script>

<style scoped lang="less">
.resource {
  width: 100%;
  height: 100%;
  .ResourceTitle {
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    margin-bottom: 10px;
  }
  .nav-list {
    height: 100px;
    width: 100%;
    display: flex;
    background: #fff;
    justify-content: space-around;
    .nav-list-item {
      width: 12%;
      display: flex;
      margin-right: 6rem;
      margin-left: 6rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      font-size: 15px;
      color: #000000;
      .nav-list-img {
        height: 4rem;
      }
      .navAddTitle {
        font-size: 17px;
      }
      .navRemoveTitle {
        font-size: 15px;
      }
    }
    .navChangeStyle {
      border-bottom: 1px solid #000;
    }
  }
  .nav-main {
    height: 600px;
    width: 100%;
    background: #e8eaea;
    display: flex;
    .nav-main-sider {
      width: 15%;
      margin-left: 8rem;
      display: flex;
      flex-direction: column;
      .nav-main-sider-item {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        margin-bottom: 15px;
        color: #666666;
      }
      .siderAddTitle {
        color: #2d8cf0;
      }
      .siderRemoveTitle {
        color: #666666;
      }
    }
    .nav-main-content {
      width: 20%;
      margin-left: 10rem;
      display: flex;
      flex-direction: column;
      .nav-main-content-item {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
