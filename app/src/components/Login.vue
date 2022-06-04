<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!--头像-->
        <img src="../assets/images/avatar.png" alt="这个是您的头像">
      </div>

      <!--登录表单（使用Eelement UI元素标签）-->
      <!--label-width:设置左侧文字所占大小-->
      <!--v-model=""：双向数据绑定-->
      <!--v-bind:rules="rules"：绑定表单验证规则-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--<el-form-item label="用户名">-->
        <!--prop：指定表单项的验证规则-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!--</el-form-item>-->

        <el-form-item prop="password">
          <!--先导入字体样式基础：iconfont，再导入图标名称-->
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-tianchongxing-"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <!--登录预验证-->
          <el-button @click="login" type="primary" round>登录</el-button>
          <!--重置表单数据-->
          <el-button @click="resetLoginForm" type="info" round>重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
// JavaScript代码抛出的默认对象：
export default {
  data() {
    return {
      // 登录表单的数据绑定对象：
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则对象：
      loginFormRules: {
        // 验证用户名是否合法：
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码是否合法：
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    };
  }, methods: {
    // 重置表单元素函数：
    resetLoginForm() {
      // loginFormRef：表单的引用对象：
      this.$refs.loginFormRef.resetFields();
    },
    // 结合表单验证规则，对表单数据进行数据验证：
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // 获取http请求的响应结果：
        // const result = await this.$http.post('login', this.loginForm);
        // 服务返回的数据中，date属性中才是最重要的响应数据信息，所以我们直接抽取出来
        const {data: res} = await this.$http.post('login', this.loginForm);
        console.log(res);
        // 登录校验提示：
        if (res.meta.status !== 200) return this.$message.error("登录失败！");
        this.$message.success("登录成功！");

        /**
         * 1.登录成功之后的 token，保存到客户端的sessionStorage中。项目中除了登录之外的其他API接口必须在登录之后才能访问
         * 2.token只应该在当前网站打开期间生效，所以token保存在sessionStorage中。(token在访问有权限的页面时，提供一个身份认证)
         * 3.通过编程式导航跳转到后台主页，路由 /home
         */

        // 保存后台响应的token字符串：
        window.sessionStorage.setItem("token", res.data.token);
        // 登录成功之后发生页面跳转：
        this.$router.push("/home")

      })
    }
  }
};

</script>

<!--识别less语法需要安装两个依赖：less、less-loader-->
<style lang="less" scoped>
.login_container {
  background-color: #789;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;

  // 设置元素页面位置（绝对位置）：
  position: absolute;
  left: 50%;
  top: 50%;
  // 设置元素的偏移位置：
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 2px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  // 设置元素的偏移位置：
  transform: translate(-50%, -50%);
  background-color: #fff;

  // 宽高设置为100%默认撑满父元素盒子：
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  // 给表单设置绝对定位
  position: absolute;
  // 定位（底部对齐，把元素移到父元素最底部）
  bottom: 0;
  width: 100%;
  padding: 0 20px;

  // 设置盒子模型模式：
  box-sizing: border-box;
}

.btns {
  // 设置元素浮动：
  display: flex;
  // 设置向浮动到最后：
  justify-content: flex-end;
}
</style>