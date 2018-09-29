<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <i :class="option.style.img.fontIcon.className" :style="`font-size: ${size.height}px;color:${option.style.textStyle.color}`" v-if="option.style.img.type == 'fontIcon'"></i>
      <img :src="path + option.style.img.images[0].url" :width="size.height" :style="`color:${option.style.textStyle.color}`" v-else-if="option.style.img.type == 'image' && option.style.img.images.length > 0" />
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'mainImg',
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
