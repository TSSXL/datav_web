<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <el-carousel :interval="4000" type="card" :height="size.height+'px'" indicator-position="none">
        <el-carousel-item v-for="item in option.data.static_data.length" :key="item">
          <div style="padding-top:5px;padding-left:5px;padding-right: 5px;height: 50px;font-size: 20px;">
            <div style="float:left"><span><i class="fa fa-envelope-open-o" aria-hidden="true"></i> 项目管理系统</span></div>
            <div style="float:right">
              <span style="color:#43A12B">告警:</span><el-badge class="mark" :value="option.data.static_data[item-1].emergency" />
              <span style="color:#D98D1C">请求:</span><el-badge class="mark" :value="option.data.static_data[item-1].req" />
              <span style="color:#A4341F">变更:</span><el-badge class="mark" :value="option.data.static_data[item-1].change" />
            </div>
          </div>
          <div style="height:60%;margin-left:20px;">
            <div :style="`border-radius:${size.height*0.5/2}px; width:${size.height*0.5}px; height:${size.height*0.5}px;line-height:${size.height*0.5-20}px; border:20px solid #4F9D3E;float:left`">
              <span style="color:#43A12B;font-size: 35px;">正常</span>
            </div>
            <div style="float:left;margin-left:10%; text-align: left;font-size: 25px;">
              <div :style="`line-height:${size.height*0.6/4}px;`"><i class="fa fa-user-circle" aria-hidden="true" style="color:#B39654"></i> 用户数:{{option.data.static_data[item-1].userCount}}</div>
              <div :style="`line-height:${size.height*0.6/4}px;`"><i class="fa fa-cubes" aria-hidden="true" style="color:#324E75"></i> 应用层资源:{{option.data.static_data[item-1].appCount1}}</div>
              <div :style="`line-height:${size.height*0.6/4}px;`"><i class="fa fa-tasks" aria-hidden="true" style="color:#ADF37C"></i> 基础应用层资源:{{option.data.static_data[item-1].appCount2}}</div>
              <div :style="`line-height:${size.height*0.6/4}px;`"><i class="fa fa-cog" aria-hidden="true" style="color:#C19C68"></i> 基础设施层资源:{{option.data.static_data[item-1].appCount3}}</div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div style="margin-top:20px;margin-left:20%;text-align: left;height: 30px;font-size: 25px;">
            <div>健康度:<span style="color:#BC875B">{{option.data.static_data[item-1].health}}</span></div>
            <div>可用性:<span style="color:#3E7434">{{option.data.static_data[item-1].use}}%</span></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'groupCarousel',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:150
        }
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
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #000D2F;
    border:2px #627A95 solid;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #000D2F;
    border:2px #627A95 solid;
  }
</style>
