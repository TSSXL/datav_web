<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="regForm" :rules="regRules" ref="regForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title"><img src="../../assets/logo32X96.png" width="124" height="32" alt="" class="logoPng"/> 账号注册
      </h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="regForm.username" autoComplete="on" placeholder="身份证/手机号/邮箱注册/统一信用代码"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password"></icon-svg>
        </span>
        <el-input name="password" :type="regForm.pwdType" v-model="regForm.password"
                  autoComplete="on"
                  placeholder="请输入密码"></el-input>
        <span class='show-pwd' @click='showPwd1'><icon-svg icon-class="eye"/></span>
      </el-form-item>
      <el-form-item prop="checkPass">
        <span class="svg-container">
          <icon-svg icon-class="password"></icon-svg>
        </span>
        <el-input name="checkPass" :type="regForm.pwdType2" v-model="regForm.checkPass"
                  autoComplete="on"
                  placeholder="请确认密码"></el-input>
        <span class='show-pwd' @click='showPwd2'><icon-svg icon-class="eye"/></span>
      </el-form-item>
      <div style="margin:10px;">
        <el-checkbox v-model="regForm.isCheck">我已经阅读并同意《CityOS注册协议》</el-checkbox>
      </div>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleReg">
              立即注册
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="info" style="width:100%;" :loading="loading" @click="handleLogin">
              已有账号登录
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {addItem} from "@/views/sm/account/api";

  export default {
    name: 'reg',
    data() {
//    const validateUsername = (rule, value, callback) => {
//      if (!isvalidUsername(value)) {
//        callback(new Error('请输入正确的用户名'))
//      } else {
//        callback()
//      }
//    }

      const validateUsername = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        regForm:{
          username: '',
          password: '',
          pwdType: 'password',
          checkPass: '',
          pwdType2: 'password',
          isCheck:true
        },
        regRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          checkPass: [{required: true, trigger: 'blur', validator: validatePass2}]
        },
        loading: false,
      }
    },
    methods: {
      showPwd1() {
        if (this.regForm.pwdType === 'password') {
          this.regForm.pwdType = ''
        } else {
          this.regForm.pwdType = 'password'
        }
      },
      showPwd2() {
        if (this.regForm.pwdType2 === 'password') {
          this.regForm.pwdType2 = ''
        } else {
          this.regForm.pwdType2 = 'password'
        }
      },
      handleLogin(){
        this.$router.push({ path: "/login" });
      },
      handleReg() {
        this.$refs.regForm.validate(valid => {
          if (valid) {
            this.loading = true

            addItem({
              username:this.regForm.username,
              password:this.regForm.password,
              level:1
            }).then(response => {
              this.$notify({
                title: '成功',
                message: '账号注册成功',
                type: 'success',
                duration: 2000
              });
              this.loading = false;
              this.$router.push({ path: "/login" });
            });
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
  @include relative;
    height: 100vh;
    background-color: $bg;
    background-image: url(../../assets/main-bg.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  &_login {
     font-size: 20px;
   }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button{
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  }
</style>
