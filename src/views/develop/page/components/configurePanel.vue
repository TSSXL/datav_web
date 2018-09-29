<template>
  <section>
    <el-form-item label="标题">
      <el-input v-model="formItem.label" name="name" placeholder="请输入标题" />
    </el-form-item>
    <data-fields-select :model="model" :formItem="formItem" v-if="formItem.hasOwnProperty('dataField')"></data-fields-select>
    <component :is="controlName" :formItem="formItem"></component>
    <el-form-item label="是否禁用" v-if="formItem.hasOwnProperty('disabled')">
      <el-switch v-model="formItem.disabled" />
    </el-form-item>
    <el-form-item label="只读" v-if="formItem.hasOwnProperty('readonly')">
      <el-switch v-model="formItem.readonly" />
    </el-form-item>
  </section>
</template>

<script>
  import textConfigure from './configures/textConfigure'
  import tagsConfigure from './configures/tagsConfigure'
  import progressConfigure from './configures/progressConfigure'
  import stepsConfigure from './configures/stepsConfigure'
  import carouselConfigure from './configures/carouselConfigure'

  import inputConfigure from './configures/inputConfigure'
  import textareaConfigure from './configures/textareaConfigure'
  import tinymceConfigure from './configures/tinymceConfigure'
  import passwordConfigure from './configures/passwordConfigure'
  import mobileConfigure from './configures/mobileConfigure'
  import emailConfigure from './configures/emailConfigure'
  import ipConfigure from './configures/ipConfigure'
  import switchConfigure from './configures/switchConfigure'
  import inputNumberConfigure from './configures/inputNumberConfigure'
  import sliderConfigure from './configures/sliderConfigure'
  import tagsInputConfigure from './configures/tagsInputConfigure'

  import radioConfigure from './configures/radioConfigure'
  import radioButtonConfigure from './configures/radioButtonConfigure'
  import checkboxConfigure from './configures/checkboxConfigure'
  import checkboxButtonConfigure from './configures/checkboxButtonConfigure'
  import selectConfigure from './configures/selectConfigure'
  import transferConfigure from './configures/transferConfigure'
  import cascaderConfigure from './configures/cascaderConfigure'
  import rateConfigure from './configures/rateConfigure'
  import mapConfigure from './configures/mapConfigure'

  import timeSelectConfigure from './configures/timeSelectConfigure'
  import timePickerConfigure from './configures/timePickerConfigure'
  import timeSelectRangeConfigure from './configures/timeSelectRangeConfigure'
  import timePickerRangeConfigure from './configures/timePickerRangeConfigure'
  import datePickerConfigure from './configures/datePickerConfigure'
  import datesPickerConfigure from './configures/datesPickerConfigure'
  import datePickerRangeConfigure from './configures/datePickerRangeConfigure'
  import dateTimePickerConfigure from './configures/dateTimePickerConfigure'
  import dateTimePickerRangeConfigure from './configures/dateTimePickerRangeConfigure'

  import tableConfigure from './configures/tableConfigure'
  import paginationConfigure from './configures/paginationConfigure'

  import areaChartConfigure from './configures/areaChartConfigure'
  import barChartConfigure from './configures/barChartConfigure'
  import lineChartConfigure from './configures/lineChartConfigure'
  import pieChartConfigure from './configures/pieChartConfigure'

  import uploadConfigure from './configures/uploadConfigure'

  import dataFieldsSelect from '@/views/develop/dataField/dataFieldsSelect'

  export default {
    props: {
      model: { type: String },
      controlName: { type: String },
      formItem: { type: Object }
    },
    components: {
      textConfigure, tagsConfigure, progressConfigure, stepsConfigure, carouselConfigure,
      inputConfigure, textareaConfigure, passwordConfigure, switchConfigure, inputNumberConfigure, sliderConfigure, tagsInputConfigure, tinymceConfigure,
      radioConfigure, radioButtonConfigure, checkboxConfigure, checkboxButtonConfigure, transferConfigure, cascaderConfigure, selectConfigure,
      rateConfigure, mapConfigure,
      mobileConfigure, emailConfigure, ipConfigure, areaChartConfigure, barChartConfigure, lineChartConfigure, pieChartConfigure,
      timeSelectConfigure, timePickerConfigure, timeSelectRangeConfigure, timePickerRangeConfigure,
      datePickerConfigure, datesPickerConfigure, datePickerRangeConfigure, dateTimePickerConfigure, dateTimePickerRangeConfigure,
      tableConfigure, paginationConfigure,
      uploadConfigure,
      dataFieldsSelect
    },
    data() {
      return {
      }
    },
    methods: {

    }
  }
</script>
