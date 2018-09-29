<template>
  <section>
    <el-form-item label="系列值">
      <el-input style="width: 96px;" v-model="series.value"></el-input>
    </el-form-item>
    <el-form-item label="系列名">
      <el-input style="width: 96px;" v-model="series.name"></el-input>
    </el-form-item>
    <el-form-item label-width="0px">折线</el-form-item>
    <el-form-item label="颜色" style="margin-left: 20px;">
      <el-color-picker v-model="series.lineStyle.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="样式" style="margin-left: 20px;">
      <el-radio-group v-model="series.lineStyle.type">
        <el-radio-button label="solid">实线</el-radio-button>
        <el-radio-button label="dashed">虚线</el-radio-button>
        <el-radio-button label="dotted">点线</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="粗细" style="margin-left: 20px;">
      <el-input-number v-model="series.lineStyle.width" controls-position="right" :min="1"
                       :max="8"></el-input-number>
    </el-form-item>
    <el-form-item label="平滑曲线" style="margin-left: 20px;">
      <el-switch
        v-model="series.smooth">
      </el-switch>
    </el-form-item>
    <el-form-item label-width="0px">圆点</el-form-item>
    <el-form-item label="显示" style="margin-left: 20px;">
      <el-switch
        v-model="series.showSymbol">
      </el-switch>
    </el-form-item>
    <el-form-item label="颜色" style="margin-left: 20px;">
      <el-color-picker v-model="series.itemStyle.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="半径" style="margin-left: 20px;">
      <el-input-number v-model="series.symbolSize" controls-position="right" :min="1"
                       :max="64"></el-input-number>
    </el-form-item>
    <el-form-item label-width="0px">区域</el-form-item>
    <el-form-item label="颜色" style="margin-left: 20px;">
      <el-color-picker v-model="series.areaStyle.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="透明度" style="margin-left: 20px;">
      <el-input-number v-model="series.areaStyle.opacity" :min="0"
                       :max="1" :step="0.1"></el-input-number>
    </el-form-item>
    <el-form-item label-width="0px">标签</el-form-item>
    <el-form-item label="显示" style="margin-left: 20px;">
      <el-switch
        v-model="series.label.show">
      </el-switch>
    </el-form-item>
    <el-form-item label="字号" style="margin-left: 20px;">
      <el-input-number v-model="series.label.fontSize" controls-position="right" :min="1"
                       :max="128"></el-input-number>
    </el-form-item>
    <el-form-item label="颜色" style="margin-left: 20px;">
      <el-color-picker v-model="series.label.color"></el-color-picker>
    </el-form-item>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import {getItem as getOptions} from '@/views/dev/option/api'

  export default {
    name: 'cSeriesLineSetting',
    components: {
      errorTip,
    },
    props: {
      series: {type: Object}
    },
    data() {
      return {}
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
