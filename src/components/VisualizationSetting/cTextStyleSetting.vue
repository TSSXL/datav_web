<template>
  <section>
    <el-form-item label="字体">
      <el-select v-model="textStyle.fontFamily" placeholder="请选择">
        <el-option v-if="fontOptions && fontOptions.length > 0"
                   v-for="item in fontOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字号">
      <el-input-number v-model="textStyle.fontSize" controls-position="right" :min="1"
                       :max="128"></el-input-number>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker v-model="textStyle.color"></el-color-picker>
    </el-form-item>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import {getItem as getOptions} from '@/views/dev/option/api'

  export default {
    name: 'cTextStyleSetting',
    components: {
      errorTip,
    },
    props: {
      textStyle: { type: Object }
    },
    data() {
      return {
        basicTextStyle: {
          color: '#fff',
          fontFamily: 'sans-serif',
          contSize: 12
        },
        fontOptions: []
      }
    },
    methods: {
      fetchFontOptions() {
        getOptions('font').then(response => {
          this.fontOptions = response.data.options
        })
      },
    },
    created() {
      validateBus.$on('validate', target => {
        this.$validator.validateAll().then(result => {
          if (result) {
            return
          }
          validateBus.$emit('errors-changed', this.errors.items)
        })
      })

      this.fetchFontOptions()
    }
  }
</script>
<style scoped>
</style>
