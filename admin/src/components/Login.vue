<!--
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-22 17:06:03
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-25 10:45:23
-->

<template>
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <h1>登录</h1>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="loginForm.username"
            type="username"
            placeholder="请输入用户名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="login('loginFormRef')"
          >
            提交
          </el-button>
          <el-button @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据绑定
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "登录名长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    login(formName) {
      this.$refs[formName].validate(async valid => {
        // console.log(this.loginForm);
        // 点击登录的时候先调用validate方法验证表单内容是否有误
        // 如果valid参数为true则验证通过
        if (!valid) return;

        // 发送请求进行登录
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("登录失败：" + res.meta.msg);
        }
        // console.log("登录失败：" + res.meta.msg);

        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg);
          // 保存token
          window.sessionStorage.setItem("token", res.data.token);
          // 导航至/home
          this.$router.push("./home");
        }
      });
    },
    // 添加表单重置方法
    resetForm() {
      // this=>当前组件对象，其中的属性$refs包含了设置的表单ref
      this.$refs.loginFormRef.resetFields();
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
.login_box {
  width: 450px;
  height: 300px;
  background-color: #b7d4dd;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: center;
}
.demo-loginForm {
  width: 80%;
}
</style>
