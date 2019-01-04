<template>
  <section>
    <component :is="mapped[component.name]" :option="component.option" :screen="screen" @ievent = "ievent"></component>
  </section>
</template>
<script>
  import vTextTitle from '@/components/Visualization/words/vTextTitle'
  import vTable from '@/components/Visualization/vTable'
  import groupCarousel from '@/components/Visualization/comps/groupCarousel'
  import vCarousel from '@/components/Visualization/vCarousel'
  import vQuality from '@/components/Visualization/vQuality'
  import vBox from '@/components/Visualization/vBox'
  import vMonitor from '@/components/Visualization/vMonitor'
  import vChartPie from '@/components/Visualization/vChartPie'
  import mlLineBasic from '@/components/Visualization/vChartLine/mlLineBasic'
  import vChartBar from '@/components/Visualization/vChartBar'
  import vGlGlobe from '@/components/Visualization/vMap/vGlGlobe'
  import vMapBusLine from '@/components/Visualization/vMapBusLine'
  import mlScatterPlot from '@/components/Visualization/vChartScatter/mlScatterPlot'
  import mlRadarBasic from '@/components/Visualization/vChartOther/mlRadarBasic'
  import vCalendar from '@/components/Visualization/vChartOther/vCalendar'
  import dayMonitor from '@/components/Visualization/vChartBar/dayMonitor'
  import envProblems from '@/components/Visualization/vChartBar/envProblems'
  import waterEnvironment from '@/components/Visualization/vChartBar/waterEnvironment'
  import envGovernance from '@/components/Visualization/vChartBar/envGovernance'
  import waterQualityMonitor from '@/components/Visualization/vChartLine/waterQualityMonitor'
  import shRealtimeMonitor from '@/components/Visualization/vChartLine/shRealtimeMonitor'
  import envInfoRate from '@/components/Visualization/vChartLine/envInfoRate'
  import subIndexMonitor from '@/components/Visualization/vChartOther/subIndexMonitor'
  import economicIndicator from '@/components/Visualization/comps/economicIndicator'
  import industrialIndicator from '@/components/Visualization/comps/industrialIndicator'
  import macroEconomy from '@/components/Visualization/vChartPie/macroEconomy'
  import populationStat from '@/components/Visualization/comps/populationStat'
  import mlBarBasic from '@/components/Visualization/vChartBar/mlBarBasic'
  import mlBarWithLine from '@/components/Visualization/vChartBar/mlBarWithLine'
  import realAirQuality from '@/components/Visualization/comps/realAirQuality'
  import piePercent from '@/components/Visualization/vChartPie/piePercent'
  import mlPieBasic from '@/components/Visualization/vChartPie/mlPieBasic'
  import vKeyValueTable from '@/components/Visualization/vKeyValueTable'
  import digitalGrowth from '@/components/Visualization/comps/digitalGrowth'
  import mlAreaBasic from '@/components/Visualization/vChartLine/mlAreaBasic'
  import restrictedSection from '@/components/Visualization/comps/restrictedSection'
  import pieMultiPercent from '@/components/Visualization/vChartPie/pieMultiPercent'
  import alarmMultiPercent from '@/components/Visualization/vChartPie/alarmMultiPercent'
  import digitalLabel from '@/components/Visualization/comps/digitalLabel'
  import vTimer from '@/components/Visualization/vChartOther/vTimer'
  import trafficMap from '@/components/Visualization/vMap/trafficMap'
  import mlGCloud from '@/components/Visualization/vChartOther/mlGCloud'
  import mainImg from '@/components/Visualization/vChartOther/mainImg'
  import utilizationRatio from '@/components/Visualization/vChartBar/utilizationRatio'
  import mlBubble from '@/components/Visualization/vChartScatter/mlBubble'
  import numberTitleFlop from '@/components/Visualization/comps/numberTitleFlop'
  import populationStructure from '@/components/Visualization/vMap/populationStructure'
  import waterLevelChange from '@/components/Visualization/vMap/waterLevelChange'
  import mlBarHoriGroup from '@/components/Visualization/vChartBar/mlBarHoriGroup'
  import gaugePie from '@/components/Visualization/vChartPie/gaugePie'
  import dashboardPiePercent from '@/components/Visualization/vChartPie/dashboardPiePercent'
  import circleState from '@/components/Visualization/comps/circleState'
  import envBrushs from '@/components/Visualization/vChartBar/envBrushs'
  import barYCategoryStack from '@/components/Visualization/vChartBar/barYCategoryStack'


  import titleValues from '@/components/Visualization/words/titleValues';
  import airRollList from '@/components/Visualization/comps/airRollList';
  import pollutionCompany from '@/components/Visualization/comps/pollutionCompany';
  import airStationList from '@/components/Visualization/comps/airStationList';
  import airAQI from '@/components/Visualization/comps/airAQI';
  import vImgLink from '@/components/Visualization/vChartOther/vImgLink';
  import airTarget from '@/components/Visualization/comps/airTarget';
  import airStationMap from '@/components/Visualization/comps/airStationMap';
  import airStationInfo from '@/components/Visualization/comps/airStationInfo';
  import baseCssLine from '@/components/Visualization/words/baseCssLine';
  import weather from '@/components/Visualization/comps/weather';
  import tab from '@/components/Visualization/comps/tab';
  import hbServerStatus from '@/components/Visualization/comps/hbServerStatus';
  import airJsRollList from '@/components/Visualization/comps/airJsRollList';
  import newDataList from '@/components/Visualization/comps/newDataList';
  import pollutionJsCompany from '@/components/Visualization/comps/pollutionJsCompany';
  import hbCompanyMap from '@/components/Visualization/vMap/hbCompanyMap';
  import hbTianDiMap from '@/components/Visualization/vMap/hbTianDiMap';
  import dongMap from '@/components/Visualization/vMap/dongMap';
  import qlzcTarget from '@/components/Visualization/comps/qlzcTarget';

  export default {
    name: 'componentContainer',
    components: {
      vTextTitle, vChartPie, mlLineBasic, vGlGlobe, vMapBusLine, vChartBar,mlScatterPlot,mlRadarBasic,
      dayMonitor,waterQualityMonitor,shRealtimeMonitor,subIndexMonitor,envGovernance,envProblems,
      waterEnvironment,envInfoRate,vTable,vCalendar,vCarousel,vMonitor,vQuality,vBox,economicIndicator,
      industrialIndicator,macroEconomy,populationStat,mlBarBasic,mlBarWithLine,realAirQuality,piePercent,
      vKeyValueTable,digitalGrowth,mlAreaBasic,restrictedSection,pieMultiPercent,digitalLabel,alarmMultiPercent,
      vTimer,trafficMap,mlPieBasic,mlGCloud,mainImg,groupCarousel,utilizationRatio,mlBubble,numberTitleFlop,
      populationStructure,mlBarHoriGroup,gaugePie,dashboardPiePercent,circleState,titleValues,envBrushs,waterLevelChange,
      airRollList,airStationList,airAQI,vImgLink,pollutionCompany,barYCategoryStack,weather,airTarget,airStationMap,airStationInfo,baseCssLine,
      tab,hbServerStatus,airJsRollList,pollutionJsCompany,hbCompanyMap,hbTianDiMap,newDataList,qlzcTarget,dongMap
    },
    props: {
      component: {type: Object},
      scale: {type: Number},
      screen:{type:Object}
    },
    data() {
      return {
        mapped:{
          "main-title":"v-text-title",
          "ml-pie-basic":"ml-pie-basic",
          "ml-line-basic":"ml-line-basic",
          "bar-basic":"v-chart-bar",
          "map3d-spere":"v-gl-globe",
          "bus line":"v-map-bus-line",
          "ml-scatterplot":"ml-scatter-plot",
          "ml-radar-basic":"ml-radar-basic",
          "day-monitor":"day-monitor",
          "water-quality-monitor":"water-quality-monitor",
          "sh-realtime-monitor":"sh-realtime-monitor",
          "sub-index-monitor":"sub-index-monitor",
          "env-governance":"env-governance",
          "env-problems":"env-problems",
          "env-brushs":"env-brushs",
          "bar-y-category-stack":"bar-y-category-stack",
          "water-environment":"water-environment",
          "env-info-rate":"env-info-rate",
          "waste-water-discharge":"v-table",
          "calendar":"v-calendar",
          "weather-monitor":"v-carousel",
          "air-quality":"v-monitor",
          "quality-platform-monitor":"v-quality",
          "v-box":"v-box",
          "economic-indicator":"economic-indicator",
          "industrial-indicator":"industrial-indicator",
          "macro-economy":"macro-economy",
          "population-stat":"population-stat",
          "ml-bar-basic":"ml-bar-basic",
          "ml-bar-with-line":"ml-bar-with-line",
          "real-air-quality":"real-air-quality",
          "pie-percent":"pie-percent",
          "key-value-table":"v-key-value-table",
          "digital-growth":"digital-growth",
          "ml-area-basic":"ml-area-basic",
          "restricted-section":"restricted-section",
          "pie-multi-percent":"pie-multi-percent",
          "alarm-multi-percent":"alarm-multi-percent",
          "digital-label":"digital-label",
          "timer":"v-timer",
          "traffic-map":"traffic-map",
          "ml-g-cloud":"ml-g-cloud",
          "main-img":"main-img",
          "group-carousel":"group-carousel",
          "utilization-ratio":"utilization-ratio",
          "ml-bubble":"ml-bubble",
          "number-title-flop":"number-title-flop",
          "population-structure":"population-structure",
          "water-level-change":"water-level-change",
          "ml-bar-hori-group":"ml-bar-hori-group",
          "gauge-pie":"gauge-pie",
          "dashboard-pie-percent":"dashboard-pie-percent",
          "circle-state":"circle-state",
          "title-values":"title-values",
          "air-Roll-List":"air-Roll-List",
          "air-Station-List":"air-Station-List",
          "air-AQI":"air-AQI",
          "v-Img-Link":"v-Img-Link",
          "pollution-company":"pollution-company",
          "weather":"weather",
          "tab":"tab",
          "air-Target":"air-Target",
          "air-Station-Map":"air-Station-Map",
          "air-Station-Info":"air-Station-Info",
          "base-Css-Line":"base-Css-Line",
          "hb-Server-Status":"hb-Server-Status",
          "air-Js-Roll-List":"air-Js-Roll-List",
          "pollution-Js-Company":"pollution-Js-Company",
          "hb-Company-Map":"hb-Company-Map",
          "hb-Tian-Di-Map":"hb-Tian-Di-Map",
          "new-Data-List":"new-Data-List",
          "qlzc-Target":"qlzc-Target",
          "dong-Map":"dong-Map"

        }
      }
    },
    methods: {
      ievent(data){

        //this.screen.components[1].option.newData = data;
        //this.screen.components[2].option.newData = data;
        this.setNewData(data,0);
        this.$emit("notifyUpdate");

      },
      setNewData(newData,i){
          if(i>=this.screen.components.length){
              return ;
          }
        this.screen.components[i].option.newData=newData;
        this.setNewData(newData,i+1);
      }
    },

    computed: {},
    created() {
    }
  }
</script>
