<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <div style="height:90px;">
        <div>
          <i :class="option.style.img.fontIcon.className" :style="`font-size: 64px;color:${option.style.textStyle.color}`" v-if="option.style.img.type == 'fontIcon'"></i>
          <img :src="path + option.style.img.images[0].url" :width="64" :style="`color:${option.style.textStyle.color}`" v-else-if="option.style.img.type == 'image' && option.style.img.images.length > 0" />
        </div>
        <div :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};`">{{option.style.textStyle.name}}</div>
      </div>
      <div :style="`line-height: ${size.height-120}px;`">
        <span :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{option.data.static_data.val}}</span>
        <span>{{option.style.textStyle.unit}}</span>
      </div>
      <div style="height:30px;" :style="option.data.static_data.up ? 'color:#CE4053' : 'color:#1FAB32'">
        <i class="fa fa-arrow-up" aria-hidden="true" v-if="option.data.static_data.up"></i>
        <i class="fa fa-arrow-down" aria-hidden="true" v-else></i>
        {{option.data.static_data.percent}}
      </div>

    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'economicIndicator',
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
