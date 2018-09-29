<template>
    <div class="input-container">
      <el-form-item label="placeholder" >
        <el-input v-model="data.attributes.placeholderAccount" name="placeholder" style="padding-bottom:6px;">
        </el-input>
        <el-input v-model="data.attributes.placeholderPassword" name="placeholder">
        </el-input>
      </el-form-item>
      
      <section>
        <el-form-item label="值">
          <el-form-item class="form-item">
            <el-input type="text" autoComplete="on" :placeholder="data.attributes.placeholderAccount" >
              <icon-svg slot="prefix" icon-class="user" />
            </el-input>
          </el-form-item>
          <el-form-item class="form-item"> 
            <el-input :type="pwdType" autoComplete="on" :placeholder="data.attributes.placeholderPassword">
              <icon-svg slot="prefix" icon-class="password"></icon-svg>
              <icon-svg slot="suffix" icon-class="eye" @click.native="showPwd"></icon-svg>
            </el-input>
          </el-form-item>
        </el-form-item>
      </section>
    </div>
</template>
<script>
export default {
  props: {
    data: { type: Object }
  },
  data() {
    return {
      pwdType: 'password',
    };
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