<template>
  <section style="height: calc(100vh - 50px);">
    <component v-if="settingMapped[component.name]!=null" :is="settingMapped[component.name]"  :component="component" :setting="configs"></component>
    <el-tabs v-model="active" type="border-card" v-else>
      <el-tab-pane label="样式" name="style" style="height: calc(100vh - 140px);">
        <el-scrollbar class='page-component__scroll' tag="div">
          <div style="height: 30px;">
            <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
          </div>
          <basic-bar-setting v-if="component.name == 'bar-basic'" :option="component.option" :setting="configs" active="style"></basic-bar-setting>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data" style="height: calc(100vh - 140px);">
        <el-scrollbar class='page-component__scroll' tag="div">
          <div style="height: 30px;">
            <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
          </div>
          <basic-bar-setting v-if="component.name == 'bar-basic'" :option="component.option" active="data" :setting="configs" style="padding: 4px;"></basic-bar-setting>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="交互" name="action" style="height: calc(100vh - 140px);">
        <div style="height: 30px;">
          <span>{{component.label}}</span> <span style="font-size:12px;color:#666">v{{component.version}}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import vTextTitleSetting from '@/components/VisualizationSetting/wordsSetting/vTextTitleSetting'
  import vChartPieSetting from '@/components/VisualizationSetting/vChartPieSetting'
  import mlLineBasicSetting from '@/components/VisualizationSetting/vChartLineSetting/mlLineBasicSetting'
  import basicBarSetting from '@/components/VisualizationSetting/vChartBarSetting/basicBarSetting'
  import dayMonitorSetting from '@/components/VisualizationSetting/vChartBarSetting/dayMonitorSetting'
  import vGlGlobeSetting from '@/components/VisualizationSetting/vMapSetting/vGlGlobeSetting'
  import mlScatterPlotSetting from '@/components/VisualizationSetting/vChartScatterSetting/mlScatterPlotSetting'
  import mlRadarBasicSetting from '@/components/VisualizationSetting/vChartOtherSetting/mlRadarBasicSetting'
  import economicIndicatorSetting from '@/components/VisualizationSetting/compsSetting/economicIndicatorSetting'
  import vBoxSetting from '@/components/VisualizationSetting/vBoxSetting'
  import macroEconomySetting from '@/components/VisualizationSetting/vChartPieSetting/macroEconomySetting'
  import populationStatSetting from '@/components/VisualizationSetting/compsSetting/populationStatSetting'
  import mlBarBasicSetting from '@/components/VisualizationSetting/vChartBarSetting/mlBarBasicSetting'
  import mlBarWithLineSetting from '@/components/VisualizationSetting/vChartBarSetting/mlBarWithLineSetting'
  import realAirQualitySetting from '@/components/VisualizationSetting/compsSetting/realAirQualitySetting'
  import piePercentSetting from '@/components/VisualizationSetting/vChartPieSetting/piePercentSetting'
  import vKeyValueTableSetting from '@/components/VisualizationSetting/vKeyValueTableSetting'
  import digitalGrowthSetting from '@/components/VisualizationSetting/compsSetting/digitalGrowthSetting'
  import mlAreaBasicSetting from '@/components/VisualizationSetting/vChartLineSetting/mlAreaBasicSetting'
  import restrictedSectionSetting from '@/components/VisualizationSetting/compsSetting/restrictedSectionSetting'
  import mlPieBasicSetting from '@/components/VisualizationSetting/vChartPieSetting/mlPieBasicSetting'
  import pieMultiPercentSetting from '@/components/VisualizationSetting/vChartPieSetting/pieMultiPercentSetting'
  import alarmMultiPercentSetting from '@/components/VisualizationSetting/vChartPieSetting/alarmMultiPercentSetting'
  import digitalLabelSetting from '@/components/VisualizationSetting/compsSetting/digitalLabelSetting'
  import vTimerSetting from '@/components/VisualizationSetting/vChartOtherSetting/vTimerSetting'
  import trafficMapSetting from '@/components/VisualizationSetting/vMapSetting/trafficMapSetting'
  import mlGCloudSetting from '@/components/VisualizationSetting/vChartOtherSetting/mlGCloudSetting'
  import mainImgSetting from '@/components/VisualizationSetting/vChartOtherSetting/mainImgSetting'
  import mlBubbleSetting from '@/components/VisualizationSetting/vChartScatterSetting/mlBubbleSetting'
  import numberTitleFlopSetting from '@/components/VisualizationSetting/compsSetting/numberTitleFlopSetting'
  import populationStructureSetting from '@/components/VisualizationSetting/vMapSetting/populationStructureSetting'
  import mlBarHoriGroupSetting from '@/components/VisualizationSetting/vChartBarSetting/mlBarHoriGroupSetting'
  import gaugePieSetting from '@/components/VisualizationSetting/vChartPieSetting/gaugePieSetting'
  import dashboardPiePercentSetting from '@/components/VisualizationSetting/vChartPieSetting/dashboardPiePercentSetting'
  import circleStateSetting from '@/components/VisualizationSetting/compsSetting/circleStateSetting'
  import titleValuesSetting from '@/components/VisualizationSetting/wordsSetting/titleValuesSetting'
  import airRollListSetting from '@/components/VisualizationSetting/compsSetting/airRollListSetting'
  import airStationListSetting from '@/components/VisualizationSetting/compsSetting/airStationListSetting'
  import airAqiSetting from '@/components/VisualizationSetting/compsSetting/airAqiSetting'
  import vImgLinkSetting from '@/components/VisualizationSetting/vChartOtherSetting/vImgLinkSetting'
  import weatherSetting from '@/components/VisualizationSetting/compsSetting/weatherSetting'

  export default {
    name: 'settingContainer',
    components: {
      errorTip, vTextTitleSetting, vChartPieSetting, mlLineBasicSetting, basicBarSetting, vGlGlobeSetting,
      mlScatterPlotSetting, mlRadarBasicSetting, dayMonitorSetting,vBoxSetting,economicIndicatorSetting,
      macroEconomySetting,populationStatSetting,mlBarBasicSetting,mlBarWithLineSetting,realAirQualitySetting,
      piePercentSetting,vKeyValueTableSetting,digitalGrowthSetting,mlAreaBasicSetting,restrictedSectionSetting,
      pieMultiPercentSetting,digitalLabelSetting,alarmMultiPercentSetting,vTimerSetting,trafficMapSetting,
      mlPieBasicSetting,mlGCloudSetting,mainImgSetting,mlBubbleSetting,numberTitleFlopSetting,populationStructureSetting,
      mlBarHoriGroupSetting,gaugePieSetting,dashboardPiePercentSetting,circleStateSetting,titleValuesSetting,
      airRollListSetting,airStationListSetting,airAqiSetting,vImgLinkSetting,weatherSetting
    },
    props: {
      component: { type: Object },
      configs: { type: Object }
    },
    data() {
      return {
        active: 'style',
        settingMapped:{
          "ml-scatterplot":"ml-scatter-plot-setting",
          "ml-radar-basic":"ml-radar-basic-setting",
          "ml-pie-basic":"ml-pie-basic-setting",
          "day-monitor":"day-monitor-setting",
          "water-quality-monitor":"day-monitor-setting",
          "sh-realtime-monitor":"day-monitor-setting",
          "sub-index-monitor":"day-monitor-setting",
          "env-governance":"day-monitor-setting",
          "utilization-ratio":"day-monitor-setting",
          "env-problems":"day-monitor-setting",
          "env-brushs":"day-monitor-setting",
          "bar-y-category-stack":"day-monitor-setting",
          "water-environment":"day-monitor-setting",
          "env-info-rate":"day-monitor-setting",
          "waste-water-discharge":"day-monitor-setting",
          "calendar":"day-monitor-setting",
          "weather-monitor":"day-monitor-setting",
          "group-carousel":"day-monitor-setting",
          "air-quality":"day-monitor-setting",
          "quality-platform-monitor":"day-monitor-setting",
          "v-box":"v-box-setting",
          "economic-indicator":"economic-indicator-setting",
          "industrial-indicator":"economic-indicator-setting",
          "macro-economy":"macro-economy-setting",
          "population-stat":"population-stat-setting",
          "ml-bar-basic":"ml-bar-basic-setting",
          "ml-bar-with-line":"ml-bar-with-line-setting",
          "real-air-quality":"real-air-quality-setting",
          "pollution-company":"air-Roll-List-Setting",
          "pie-percent":"pie-percent-setting",
          "key-value-table":"v-key-value-table-setting",
          "digital-growth":"digital-growth-setting",
          "ml-area-basic":"ml-area-basic-setting",
          "restricted-section":"restricted-section-setting",
          "pie-multi-percent":"pie-multi-percent-setting",
          "alarm-multi-percent":"alarm-multi-percent-setting",
          "digital-label":"digital-label-setting",
          "timer":"v-timer-setting",
          "traffic-map":"traffic-map-setting",
          "ml-g-cloud":"ml-g-cloud-setting",
          "main-img":"main-img-setting",
          "ml-line-basic":"ml-line-basic-setting",
          "ml-bubble":"ml-bubble-setting",
          "number-title-flop":"number-title-flop-setting",
          "population-structure":"population-structure-setting",
          "water-level-change":"population-structure-setting",
          "ml-bar-hori-group":"ml-bar-hori-group-setting",
          "gauge-pie":"gauge-pie-setting",
          "dashboard-pie-percent":"dashboard-pie-percent-setting",
          "circle-state":"circle-state-setting",
          "title-values":"title-values-setting",
          "map3d-spere":"v-gl-globe-setting",
          "main-title":"v-text-title-setting",
          "air-Roll-List":"air-Roll-List-Setting",
          "air-Station-List":"air-Station-List-Setting",
          "air-AQI":"air-Aqi-Setting",
          "v-Img-Link":"v-Img-Link-Setting",
          "weather":"weatherSetting"
        }
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
    },




  }
</script>
<style scoped>
  .el-tabs__header {
    margin: 0 !important;
  }
  .page-component__scroll {
    height: calc(100vh - 110px);
    margin-top: 0px;
  }
</style>
