<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div id="eventList">
        <ul class="item" :style="`line-height:${option.style.ulLineHeight}px;font-size:${option.style.fontSize}px;color:${option.style.color};width: ${size.width}px; height: ${size.height}px;background-color:${option.style.backgroundColor}`">
          <li>
            <span style="width: 45%;">站点名称</span>
            <span style="width: 35%;">主要污染物</span>
            <span style="width: 10%;">AQI</span>
          </li>
          <li v-for="item in lists" >
            <span style="width: 45%;">{{item.PositionName}}</span>
            <span style="width: 35%;">{{item.PrimaryPollutant}}</span>
            <span :style="`width: 10%;height: 30px;
            line-height:30px;margin-top:10px;
    border-radius: 4px;
    text-align: center;background:${item.color};color:#103256`">{{item.AQI}}</span>
          </li>

        </ul>



      </div>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import {postResultByApi} from "../api"



  export default {
    name: 'airRollList',
    components: {vueSeamlessScroll},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        lists:[],
        list:[],
        step:5
      }
    },
    methods: {
      getSize(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width:obj.clientWidth,
          height:obj.clientHeight
        };
      },

      async  query(){

        if (this.option.data.data_type == 'API') {
          let url = this.option.data.data_api
          let param = this.option.data.data_api_param

          let data = await postResultByApi(url, param).then(response => {

            return response.data;
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api + "接口调用报错"
            });
          });

          this.option.data.static_data = data;
          this.list = this.option.data.static_data;
        } else {
          this.list = this.option.data.static_data;
        }
        if(this.options.style.step!=null){
            this.step=this.options.style.step;
        }
        this.scroll();
      },
      //事件滚动效果
      scroll(){
        this.lists=[];
        if(this.list.length>=this.step){
            for(let i=0;i<this.step;i++){
              this.list.push(this.list[i]);
              this.list.shift();
            }

        }
        for(let i=0;i<this.list.length;i++) {
          if (i >= this.step) {
            break;
          }
          this.lists.push(this.list[i]);
        }

      },


    },

    computed: {
      path() {
        return getPath()
      },


    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
      });

      this.query();
      if(this.option.style.clock!=null && this.option.style.clock!=""){
        setInterval(this.query, this.option.style.clock);
      }
    },

    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      }
    },
  mounted(){
    setInterval(this.scroll, 2000);
//    $('.dowebok').liMarquee({
//      direction: 'up'
//    });

  }
  }
</script>
<style scoped>
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }

  .warp {
    overflow: hidden;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
</style>
