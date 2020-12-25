<!--
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-24 17:23:43
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-25 10:42:37
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-22 17:06:03
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-24 17:19:41
-->

<template>
  <div class="login_container">
    <h1>首页</h1>
    <el-form>
      <el-form-item>
        <el-button @click="logout">
          退出
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b5b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
