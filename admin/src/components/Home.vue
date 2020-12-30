<!--
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-24 17:23:43
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-29 16:12:56
-->

<template>
  <!-- <div class="home_container"> -->
  <el-container class="home_container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '66px' : '200px'">
      <div class="home_title">
        <i class="el-icon-menu"> </i>
        <span slot="title">
          {{ isCollapse ? "" : "统计管理中心" }}
        </span>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        router
        :default-active="avtivePath"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-submenu
          v-for="item in menuList"
          :key="item.id"
          :index="item.id + ''"
        >
          <!-- template 是一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconsObj[item.id]"> </i>
            <!-- 文本 -->
            <span slot="title">
              {{ item.authName }}
            </span>
          </template>
          <!-- 在一级菜单嵌套二级菜单 -->
          <el-menu-item
            v-for="submenuItem in item.children"
            :key="submenuItem.id"
            :index="'/' + submenuItem.path"
            @click="saveNavState('/' + submenuItem.path)"
          >
            {{ submenuItem.authName }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <i
          style="font-size: 24px"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="toggleCollapse"
        />
        <el-button @click="logout">
          退出
        </el-button>
      </el-header>
      <!-- 主体结构 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
export default {
  created() {
    // 在created阶段请求左侧菜单数据
    this.getMenuList();
    this.avtivePath = window.sessionStorage.getItem("avtivePath");
    // console.log("create")
  },
  data() {
    return {
      // 左侧菜单栏
      menuList: null,
      /* 是否为折叠 */
      isCollapse: false,
      // 侧边栏菜单图标
      iconsObj: {
        "125": "el-icon-user",
        "103": "el-icon-setting",
        "101": "el-icon-goods",
        "102": "el-icon-printer",
        "145": "el-icon-data-analysis"
      },
      /* 被激活的链接地址 */
      avtivePath: ""
    };
  },

  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    /* 点击按钮，切换菜单的折叠与展开 */
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
    },
    /* 获取所有的菜单 */
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
      // console.log("res===", res);
      return this.menuList;
    },
    /* 保存链接的激活状态 */
    saveNavState(avtivePath) {
      window.sessionStorage.setItem("avtivePath", avtivePath);
      this.avtivePath = avtivePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.home_title {
  height: 50px;
  color: rgb(86, 147, 226);
  font-size: 20px;
  line-height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  // text-align: justify;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
