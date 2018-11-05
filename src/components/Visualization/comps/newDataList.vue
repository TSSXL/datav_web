<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div :style="`width: 100%; height: 100%;`">
        <table :style="option.style.tableStyle" @mouseover="hoverList" @mouseout="outList">
          <tr :style="option.style.trStyle">
            <td :style="`width:20%;${option.style.tdStyle};`">名称</td>
            <td :style="`width:50%;${option.style.tdStyle};`">描述</td>
            <td :style="`width:20%;${option.style.tdStyle};`">最后日期</td>
          </tr>
          <template v-for="item of lists">
            <tr :style="option.style.trStyle">
                <td :style="`width:20%;${option.style.tdStyle};`">{{item.name}}</td>
                <td :style="`width:50%;${option.style.tdStyle};`">{{item.desc}}</td>
                <td :style="`width:20%;${option.style.tdStyle};`">{{item.date}}</td>
            </tr>
          </template>

        </table>
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
        step:5,
        interval:null
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

      query(){
          this.list=this.option.data.static_data;
        this.scroll();
      },
      scroll(){
        this.lists=[];
        if(this.list.length>=this.step){
          for(let i=0;i<this.step;i++){
            this.list.push(this.list[i]);
            //当前次数为最后一次时，根据步数切割数组
            if(i==(this.step-1)){
              this.list.splice(0,this.step);
            }

          }

        }
        for(let i=0;i<this.list.length;i++) {
          if (i >= this.step) {
            break;
          }
          this.lists.push(this.list[i]);
        }


      },
      hoverList(){
        clearInterval(this.interval);//停止

      },
      outList(){
        this.interval=setInterval(this.scroll, 3000); //重新启动即可
      }

    },

    computed: {
      path() {
        return getPath()
      },
      classOption: function () {
        return {
          step: 1,
          limitMoveNum: 5
        }
      }
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
    this.interval=setInterval(this.scroll, 2000);
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
