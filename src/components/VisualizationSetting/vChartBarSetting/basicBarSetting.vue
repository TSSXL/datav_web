<template>
  <section>
    <el-form label-width="80px" size="mini" v-if="active=='style'" label-position="left">
      <div class="collapse">
        <div class="title" @click="collapse.globalStyle = !collapse.globalStyle">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.globalStyle"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="22">全局样式</el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.globalStyle">
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">字体</el-col>
            <el-col :span="13">
              <el-select v-model="option.style.textStyle.fontFamily" placeholder="请选择" size="mini">
                <el-option v-if="setting.fontOptions && setting.fontOptions.length > 0"
                           v-for="item in setting.fontOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="22">柱子样式</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">柱子内间距</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-slider v-model="option.style.series[0].barCategoryGap" :step="10" size="mini"></el-slider></div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">柱子宽度</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-slider v-model="option.style.series[0].barWidth" :step="10" size="mini"></el-slider></div>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="22">边距</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">上边距</el-col>
            <el-col :span="13">
              <el-input-number size="mini" v-model="option.style.grid.top"></el-input-number>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">下边距</el-col>
            <el-col :span="13">
              <el-input-number size="mini" v-model="option.style.grid.bottom"></el-input-number>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">左边距</el-col>
            <el-col :span="13">
              <el-input-number size="mini" v-model="option.style.grid.left"></el-input-number>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">右边距</el-col>
            <el-col :span="13">
              <el-input-number size="mini" v-model="option.style.grid.right"></el-input-number>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="17">值标签</el-col>
            <el-col :span="4"><el-checkbox v-model="option.style.series[0].label.show">显示</el-checkbox></el-col>
          </el-row>
          <div v-show="option.style.series[0].label.show">
            <el-row class="title">
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="22">文本样式</el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">字号</el-col>
              <el-col :span="13">
                <el-input-number size="mini" v-model="option.style.series[0].label.fontSize"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">颜色</el-col>
              <el-col :span="13">
                <div style="height:40px;"><el-color-picker v-model="option.style.series[0].label.color" size="small"></el-color-picker></div>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">字体粗细</el-col>
              <el-col :span="13">
                <el-select v-model="option.style.series[0].label.fontWeight" placeholder="请选择" size="mini">
                  <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">y方向偏移</el-col>
              <el-col :span="13">
                <el-input-number v-model="option.style.series[0].label.offset[1]" size="mini"></el-input-number>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">x方向偏移</el-col>
              <el-col :span="13">
                <el-input-number v-model="option.style.series[0].label.offset[0]" size="mini"></el-input-number>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="collapse">
        <div class="title" @click="collapse.xStyle = !collapse.xStyle">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.xStyle"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="17">x轴</el-col>
            <el-col :span="5"><el-checkbox v-model="option.style.xAxis.show">显示</el-checkbox></el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.xStyle">
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="22">文本样式</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">颜色</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-color-picker v-model="option.style.xAxis.axisLabel.color" size="small"></el-color-picker></div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">字号</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-slider v-model="option.style.xAxis.axisLabel.fontSize" :step="0.5" :min="10" :max="100" size="mini"></el-slider></div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">字体粗细</el-col>
            <el-col :span="13">
              <el-select v-model="option.style.xAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">指标点长度</el-col>
            <el-col :span="13"><div style="height:40px;"><el-slider v-model="option.style.xAxis.axisTick.length" :step="0.5" :min="0" :max="40" size="mini"></el-slider></div></el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">文字距辅助线距离</el-col>
            <el-col :span="13"><div style="height:40px;"><el-slider v-model="option.style.xAxis.axisLabel.margin" ::step="0.5" :min="-40" :max="40" size="mini"></el-slider></div></el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">辅助线</el-col>
            <el-col :span="13"><el-checkbox v-model="option.style.xAxis.axisLine.show"></el-checkbox></el-col>
          </el-row>
        </div>
      </div>
      <div class="collapse">
        <div class="title" @click="collapse.yStyle = !collapse.yStyle">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.yStyle"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="17">y轴</el-col>
            <el-col :span="5"><el-checkbox v-model="option.style.yAxis.show">显示</el-checkbox></el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.yStyle">
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="22">文本样式</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">颜色</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-color-picker v-model="option.style.yAxis.axisLabel.color" size="small"></el-color-picker></div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">字号</el-col>
            <el-col :span="13">
              <div style="height:40px;"><el-slider v-model="option.style.yAxis.axisLabel.fontSize" :step="0.5" :min="10" :max="100" size="mini"></el-slider></div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="8">字体粗细</el-col>
            <el-col :span="13">
              <el-select v-model="option.style.yAxis.axisLabel.fontWeight" placeholder="请选择" size="mini">
                <el-option v-for="item in fontWeights" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">最大值</el-col>
            <el-col :span="3"><el-button type="text" size="mini" @click="option.style.yAxis.max = null">自动</el-button></el-col>
            <el-col :span="13">
              <el-input v-model="option.style.yAxis.max" size="mini"></el-input>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">最小值</el-col>
            <el-col :span="3"><el-button type="text" size="mini" @click="option.style.yAxis.min = null">自动</el-button></el-col>
            <el-col :span="13">
              <el-input v-model="option.style.yAxis.min" size="mini"></el-input>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">坐标轴分割段数</el-col>
            <el-col :span="13"><el-input-number size="mini" v-model="option.style.yAxis.splitNumber"></el-input-number></el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">指标点长度</el-col>
            <el-col :span="13"><div style="height:40px;"><el-slider v-model="option.style.yAxis.axisTick.length" :step="0.5" :min="0" :max="40" size="mini"></el-slider></div></el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">文字距辅助线距离</el-col>
            <el-col :span="13"><div style="height:40px;"><el-slider v-model="option.style.yAxis.axisLabel.margin" ::step="0.5" :min="-40" :max="40" size="mini"></el-slider></div></el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="9">辅助线</el-col>
            <el-col :span="13"><el-checkbox v-model="option.style.yAxis.axisLine.show"></el-checkbox></el-col>
          </el-row>
        </div>
      </div>
      <div class="collapse">
        <div class="title" @click="collapse.dataStyle = !collapse.dataStyle">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.dataStyle"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="22">数据系列</el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.dataStyle">
          <div style="text-align: right">
            <el-button type="text" size="mini" @click="addData"><i class="fa fa-plus" aria-hidden="true" style="color: #00c1de;"></i> 添加</el-button>
          </div>
          <div v-for="(item,index) in option.style.color">
            <el-row class="title">
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">系列{{index+1}} <el-button type="text" size="mini" @click="removeData(index)" v-show="option.style.color.length > 1"><i class="fa fa-trash-o" aria-hidden="true" style="color: #00c1de;"></i> 删除</el-button></el-col>
              <el-col :span="13">
                <div style="height:40px;"><el-color-picker v-model="option.style.color[index]" size="small"></el-color-picker></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="collapse">
        <div class="title" @click="collapse.sizeStyle = !collapse.sizeStyle">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.sizeStyle"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="22">图表尺寸位置</el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.sizeStyle">
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">图表尺寸</el-col>
            <el-col :span="8" style="text-align: center">宽度</el-col>
            <el-col :span="8" style="text-align: center">长度</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">
              <el-input-number size="mini" v-model="option.style.size_location.width" controls-position="right" style="width: 90px;" :min="1" :max="32800"></el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input-number size="mini" v-model="option.style.size_location.height" controls-position="right" style="width: 90px;" :min="1" :max="32800"></el-input-number>
            </el-col>
          </el-row>
          <el-row class="title">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">图表位置</el-col>
            <el-col :span="8" style="text-align: center">横坐标</el-col>
            <el-col :span="8" style="text-align: center">纵坐标</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">
              <el-input-number size="mini" v-model="option.style.size_location.x" controls-position="right" style="width: 90px;" :min="1" :max="32800"></el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input-number size="mini" v-model="option.style.size_location.y" controls-position="right" style="width: 90px;" :min="1" :max="32800"></el-input-number>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-button @click="optionDialogVisible=true">显示json</el-button>
    </el-form>
    <el-dialog
      title="JSON"
      :visible.sync="optionDialogVisible">
      <cm-json-editor v-model="optionStr" style="font-size: 10px;" @close="optionDialogVisible=false"></cm-json-editor>
    </el-dialog>

    <el-form label-width="80px" size="mini" v-if="active=='data'">
      <div class="collapse">
        <div class="title" @click="collapse.dataFace = !collapse.dataFace">
          <el-row :gutter="15">
            <el-col :span="1"><i class="fa fa-minus-circle" v-if="collapse.dataFace"></i><i class="fa fa-plus-circle" v-else></i></el-col>
            <el-col :span="22">数据接口</el-col>
          </el-row>
        </div>
        <div class="content" v-show="collapse.dataFace" style="background: #fff">
          <el-table
            :data="Object.values(dataMaps)" size="mini" style="width: 100%;">
            <el-table-column
              prop="name"
              label="字段"
              width="60">
            </el-table-column>
            <el-table-column
              prop="map"
              label="映射"
              width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.map" placeholder="可自定义" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明">
            </el-table-column>
          </el-table>
          <el-row class="title" style="margin-top: 10px;">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">数据源类型</el-col>
            <el-col :span="17">
              <el-select v-model="option.dataType" placeholder="请选择" size="mini">
                <el-option v-if="setting.dataSourceOptions && setting.dataSourceOptions.length > 0"
                           v-for="item in setting.dataSourceOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </section>
</template>
<script>
  import errorTip from '@/components/Validate/errorTip'
  import ElFooter from "element-ui/packages/footer/src/main";
  import jsonEditor from '@/components/jsonEditor'
  import cmJsonEditor from '@/components/jsonEditor/cmJsonEditor'
  import ElFormItem from "element-ui/packages/form/src/form-item";
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    name: 'basicBarSetting',
    components: {
      ElButton,
      ElFormItem,
      ElFooter,
      errorTip,
      jsonEditor,
      cmJsonEditor
    },
    props: {
      option: {type: Object},
      active: {type: String},
      setting: { type: Object }
    },
    data() {
      return {
        activeNames: ['text'],
        dataActiveNames: ['interface'],
        staticData: '',
        optionStr:"",
        optionDialogVisible:false,
        dynamicData: '',
        exampleData: '',
        collapse:{
          globalStyle:true,
          xStyle:true,
          yStyle:true,
          dataStyle:true,
          sizeStyle:true,
          dataFace:true
        },
        fontWeights:["normal","bold","bolder","lighter","100","200"],
        dataMaps:{
          x:{name:"x",map:"",desc:"类目"},
          y:{name:"y",map:"",desc:"值"},
          s:{name:"s",map:"",desc:"系列(可选)"},
        }
      }
    },
    methods: {
      addData(){
        this.option.style.color.push(this.option.style.color[this.option.style.color.length - 1]);
      },
      removeData(index){
        this.option.style.color.splice(index, 1);
      }
    },
    watch: {

    },
    created() {
        this.optionStr=JSON.stringify(this.option, null, 4);
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

  .collapse{
    border-top: 1px solid #dcdee3;
  }

  .collapse .title{
    line-height: 30px;
    height: 30px;
    color: #2d2f33;
    font-size: 13px;
    cursor: pointer;
  }
  .collapse .title i{
    color: #666;
    font-size: 13px;
  }
  .collapse .content{
    background: #f7f8fa;
    padding-left:5px;
    padding-right: 5px;
  }
  .collapse .content .title{
    color: #2d2f33;
    line-height: 40px;
    height: 40px;
    font-size: 12px;
  }
  .collapse .content .row{
    color: #666;
    line-height: 40px;
    height: 40px;
    font-size: 12px;
  }
</style>
