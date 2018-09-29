<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div :style="`line-height: 60px;padding-bottom: 20px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};text-align: ${option.style.textStyle.textAlign};`"><i class="fa fa-users" aria-hidden="true"></i> {{option.style.textStyle.name}}</div>
      <el-row>
        <el-col :span="12">
          <div :style="`background-image: url(${path}imglib/5b18d25ef46208003362afc2.svg);height:${size.height/2 - 80}px;`" class="drip"></div>
        </el-col>
        <el-col :span="12">
          <div :style="`height:${size.height/2 - 80}px;vertical-align: middle;display:table-cell;text-align: center;width: ${size.width}px;`">
            <span :style="`color:${option.style.textStyle.allColor};font-size:${option.style.textStyle.allFontSize}px;`">{{option.data.static_data.man.val + option.data.static_data.woman.val}}</span>
            <span>{{option.style.textStyle.unit}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div :style="`background-image: url(${path}imglib/5b18d25ef46208003362afc0.svg);height:${size.height/2}px;`" class="drip"></div>
            </el-col>
            <el-col :span="12">
              <div :style="`height:${size.height/2}px;vertical-align: middle;display:table-cell;text-align: center;width: ${size.width}px;`">
                <div>
                  <span :style="`color:${option.style.textStyle.manColor};font-size:${option.style.textStyle.valFontSize}px;`">{{option.data.static_data.man.val}}</span>
                  <span>{{option.style.textStyle.unit}}</span>
                </div>
                <hr :style="`border:0;background-color:${option.style.textStyle.manColor};height:1px;`">
                <div>
                  <span :style="`color:${option.style.textStyle.manColor};font-size:${option.style.textStyle.percentFontSize}px;`">{{option.data.static_data.man.percent}}</span>
                  <span>%</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <div :style="`height:${size.height/2}px;vertical-align: middle;display:table-cell;text-align: center;width: ${size.width}px;`">
                <div>
                  <span :style="`color:${option.style.textStyle.womanColor};font-size:${option.style.textStyle.valFontSize}px;`">{{option.data.static_data.woman.val}}</span>
                  <span>{{option.style.textStyle.unit}}</span>
                </div>
                <hr :style="`border:0;background-color:${option.style.textStyle.womanColor};height:1px;`">
                <div>
                  <span :style="`color:${option.style.textStyle.womanColor};font-size:${option.style.textStyle.percentFontSize}px;`">{{option.data.static_data.woman.percent}}</span>
                  <span>%</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div :style="`background-image: url(${path}imglib/5b18d25ef46208003362afc4.svg);height:${size.height/2}px;`" class="drip"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'populationStat',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
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
      path() {
        return getPath()
      }
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
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }
</style>
