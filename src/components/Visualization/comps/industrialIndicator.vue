<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div :style="`background-image: url(${path}imglib/5b17750ef345e60034792336.svg);height:${size.height - 30}px;`" class="drip">
        <div :style="`height:${size.height - 80}px;vertical-align: middle;display:table-cell;text-align: center;width: ${size.width}px;`">
          <div :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{option.data.static_data.val}}</div>
          <div :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};`">{{option.style.textStyle.unit}}</div>
        </div>
        <div style="text-align: right;line-height: 50px;font-size: 26px;" :style="option.data.static_data.up ? 'color:#B55660' : 'color:#E3C234'">
          <i class="fa fa-long-arrow-up" aria-hidden="true" v-if="option.data.static_data.up"></i>
          <i class="fa fa-long-arrow-down" aria-hidden="true" v-else></i>
          {{option.data.static_data.percent}}
        </div>
      </div>
      <div :style="`height: 30px;vertical-align: bottom;display:table-cell;text-align: center;width: ${size.width}px;`">{{option.style.textStyle.name}}</div>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'industrialIndicator',
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
