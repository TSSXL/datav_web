<template>
  <section>
    <el-form label-width="80px" size="mini" v-if="active=='style'">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="文本样式" name="style">
          <el-form-item label="字体">
            <el-select v-model="option.style.text.fontFamily" placeholder="请选择">
              <el-option v-if="fontOptions && fontOptions.length > 0"
                         v-for="item in fontOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字号">
            <el-input-number v-model="option.style.text.fontSize" controls-position="right" :min="1"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="option.style.text.color"></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="图例" name="legend">
          <el-form-item label="显示">
            <el-switch
              v-model="option.style.legend.show">
            </el-switch>
          </el-form-item>
          <el-form-item label="字号">
            <el-input-number v-model="option.style.legend.textStyle.fontSize" controls-position="right" :min="1"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="字体颜色">
            <el-color-picker v-model="option.style.legend.textStyle.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="图例间距">
            <el-input-number style="width: 96px;" v-model="option.style.legend.itemGap"
                             controls-position="right" :min="1"
                             :max="128"></el-input-number>
          </el-form-item>
          <el-form-item label="布局">
            <el-radio-group v-model="option.style.legend.orient" v-if="orientOptions && orientOptions.length > 0">
              <el-radio-button v-for="item in orientOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="水平位置">
            <el-radio-group v-model="option.style.legend.left" v-if="horizontalAlignOptions && horizontalAlignOptions.length > 0">
              <el-radio-button v-for="item in horizontalAlignOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item  label="垂直位置">
            <el-radio-group v-model="option.style.legend.top" v-if="verticalAlignOptions  && verticalAlignOptions.length > 0">
              <el-radio-button v-for="item in verticalAlignOptions" :label="item.value" :key="item.value">
                {{item.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="圆心和半径" name="center_radius">
          <el-form-item label="圆心坐标">
            <el-row>
              <el-col :span="12">
                <el-input style="width: 96px;" v-model="option.style.center_radius.center[0]"></el-input>
              </el-col>
              <el-col :span="12">
                <el-input style="width: 96px;" v-model="option.style.center_radius.center[1]"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="半径">
            <el-row>
              <el-col :span="12">
                <el-input style="width: 96px;" v-model="option.style.center_radius.radius[0]"></el-input>
              </el-col>
              <el-col :span="12">
                <el-input style="width: 96px;" v-model="option.style.center_radius.radius[1]"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="尺寸和位置" name="size_location">
          <el-form-item label="尺寸">
            <el-row>
              <el-col :span="12">
                <li class="fa fa-arrows-h"/>
                <el-input-number style="width: 96px;" v-model="option.style.size_location.width"
                                 controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
              <el-col :span="12">
                <li class="fa fa-arrows-v"/>
                <el-input-number style="width: 96px;" v-model="option.style.size_location.height"
                                 controls-position="right" :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="位置">
            <el-row>
              <el-col :span="12">
                x
                <el-input-number style="width: 96px;" v-model="option.style.size_location.x" controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
              <el-col :span="12">
                y
                <el-input-number style="width: 96px;" v-model="option.style.size_location.y" controls-position="right"
                                 :min="1"
                                 :max="32800"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-form label-width="80px" size="mini" v-if="active=='data'">
      <el-collapse v-model="dataActiveNames">
        <el-collapse-item title="数据接口" name="interface">
          <el-table
            :data="option.data.fields" size="mini"
            style="width: 100%;">
            <el-table-column
              prop="name"
              row-style="background-color: #1b1b1b; color: #333333;"
              label="字段"
              width="60">
            </el-table-column>
            <el-table-column
              prop="map"
              label="映射"
              width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.map" placeholder="可映射" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明">
            </el-table-column>
          </el-table>
          <el-form label-width="80px" size="mini" style="margin-top: 12px;">
            <el-form-item label="数据源类型">
              <el-select v-model="option.data.data_type" placeholder="请选择">
                <el-option v-if="datasourceOptions && datasourceOptions.length > 0"
                           v-for="item in datasourceOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <json-editor v-model="option.data.static_data" style="font-size: 11px;"></json-editor>

            <el-form-item label="自动更新">
              <el-checkbox v-model="option.data.auto_refresh"></el-checkbox>
              <el-input-number v-model="option.data.interval" controls-position="right" :min="1" :max="1200"
                               v-if="option.data.auto_refresh"></el-input-number>
              <span v-if="option.data.auto_refresh">秒一次</span>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import {getItem as getOptions} from '@/views/dev/option/api'
  import ElFooter from "element-ui/packages/footer/src/main";
  import jsonEditor from '@/components/jsonEditor'
  import ElFormItem from "element-ui/packages/form/src/form-item";

  export default {
    name: 'pieSetting',
    components: {
      ElFormItem,
      ElFooter,
      errorTip,
      jsonEditor
    },
    props: {
      option: {type: Object},
      active: {type: String}
    },
    data() {
      return {
        activeNames: ['style', 'legend', 'center_radius', 'size_location'],
        dataActiveNames: ['interface'],
        fontOptions: [],
        datasourceOptions: [],
        horizontalAlignOptions: [],
        verticalAlignOptions: [],
        orientOptions: []
      }
    },
    methods: {
      fetchOptions() {
        getOptions('font').then(response => {
          this.fontOptions = response.data.options
        })
        getOptions('horizontalAlign').then(response => {
          this.horizontalAlignOptions = response.data.options
        })
        getOptions('verticalAlign').then(response => {
          this.verticalAlignOptions = response.data.options
        })
        getOptions('visualizationDatasource').then(response => {
          this.datasourceOptions = response.data.options
        })
        getOptions('orient').then(response => {
          this.orientOptions = response.data.options
        })
      }
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

      this.fetchOptions()
    }
  }
</script>
<style scoped>
  .el-tabs--card > .el-tabs__header {
    border-bottom: 0px !important;
  }

  .el-tabs__header {
    margin: 0 !important;
  }
</style>
