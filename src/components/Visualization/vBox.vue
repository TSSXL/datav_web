<template>
  <section>
    <div :id="option.cmpId" :style="divStyle">
      <el-row :style="option.data.borderImages[option.style.borderIndex].textMargin" v-if="option.style.textStyle.show">
        <el-col :span="24"  :style="`text-align: ${option.style.textStyle.textAlign};`">
          <span :style="`font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;color: ${option.style.textStyle.color};font-weight: ${option.style.textStyle.fontWeight};`">{{option.style.textStyle.title}}</span>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'vBox',
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
      },
      divStyle:function(){
        let s=`width: ${this.size.width}px; height: ${this.size.height}px;border-width:${this.option.data.borderImages[this.option.style.borderIndex].borderWidth}; border-style: solid; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial `;
        if(this.option.style.borderIndex>0){
            s+=`; border-image-source: url("${this.path}${this.option.data.borderImages[this.option.style.borderIndex].url}"); border-image-slice:${this.option.data.borderImages[this.option.style.borderIndex].borderImageSlice}; `
        }
        if(this.option.style.divCss!=null){
            s+=`;${this.option.style.divCss}`;
        }else{
            s+=`;background:none`
        }
        if(this.option.style.backgroundImg!=null){
            s+=`;background-image:url("${this.path}${this.option.style.backgroundImg}")`
        }

        return s;
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
