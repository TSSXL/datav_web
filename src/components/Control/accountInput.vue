<template>
    <div class="input-container">
        <el-form-item class="form-item">
          <el-input type="text" v-model="value.username" placeholder="请输入账户" >
            <icon-svg slot="prefix" icon-class="user" />
          </el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-input :type="pwdType" v-model="value.password" placeholder="请输入密码">
            <icon-svg slot="prefix" icon-class="password"></icon-svg>
            <icon-svg slot="suffix" icon-class="eye" @click.native="showPwd"></icon-svg>
          </el-input>
        </el-form-item>
    </div>
</template>
<script>
export default {
  props: {
    value: { type: Object }
  },
  data() {
    return {
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    }
  }
};
</script>
<style scoped>
.input-container {
    width: 400px;
}

.input-container .form-item{
  padding-bottom: 6px;
}
</style>
