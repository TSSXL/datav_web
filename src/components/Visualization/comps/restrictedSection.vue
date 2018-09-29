<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;border:${option.style.border.width}px ${option.style.border.color} ${option.style.border.type};`">
      <div :style="`float:left;height: ${size.height}px;width: 20%;padding-top:${size.height/2-(option.style.imgSize/2)}px;`">
        <i :class="option.style.img.fontIcon.className" :style="`font-size: ${option.style.imgSize}px;color:${option.style.textStyle.color}`" v-if="option.style.img.type == 'fontIcon'"></i>
        <img :src="path + option.style.img.images[0].url" :width="option.style.imgSize" :style="`color:${option.style.textStyle.color}`" v-else-if="option.style.img.type == 'image' && option.style.img.images.length > 0" />
      </div>
      <div :style="`float:left;height: ${size.height}px;width: 60%;padding-top:${size.height/2-30}px`">
        <div :style="`line-height:30px;`">
          <div :style="`float:left;width:80%;font-family: ${option.style.textStyle.fontFamily};color:${option.style.textStyle.color};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{option.data.static_data.name}}</div>
          <div :style="`float:right;width:20%;`"><el-tag size="small" :color="option.style.tagStyle.bgColor" :style="`font-family: ${option.style.textStyle.fontFamily};color:${option.style.tagStyle.color};font-size: ${option.style.tagStyle.fontSize}px;font-weight: ${option.style.tagStyle.fontWeight};`">{{option.data.static_data.tag}}</el-tag></div>
        </div>
        <div :style="`line-height:30px;font-family: ${option.style.textStyle.fontFamily};color:${option.style.timeStyle.color};font-size: ${option.style.timeStyle.fontSize}px;font-weight: ${option.style.timeStyle.fontWeight};`">时段:{{option.data.static_data.date}}&nbsp;{{option.data.static_data.timeSlot}}</div>
      </div>
      <div :style="`float:left;height: ${size.height}px;width: 20%;padding-top:${size.height/2-16}px`">
        <i class="fa fa-map-marker" aria-hidden="true" :style="`font-size: 32px;color:${option.style.border.color}`"></i>
      </div>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'restrictedSection',
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
