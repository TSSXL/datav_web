<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; line-height: ${size.height}px;`">
      <span :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.textStyle.fontWeight};font-size: ${option.style.textStyle.fontSize}px;margin-right:${option.style.spacing}px;`">{{option.data.static_data.val}}</span>
      <span>
        <i :class="icon.fontIcon.className" :style="`font-size: ${option.style.iconSize}px;color:${option.style.iconColor};`" v-if="icon.type == 'fontIcon'"></i>
        <img :src="path + icon.images[0].url" :width="option.style.iconSize" :style="`color:${option.style.iconColor}`" v-else-if="icon.type == 'image' && icon.images.length > 0" />
      </span>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'digitalGrowth',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:200
        },
        icon:{
          "type": "fontIcon",
          "fontIcon": {
            "className": "fa fa-hdd-o"
          },
          "images": []
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
        this.icon = this.option.style.icon.find((item) => item.key == this.option.data.static_data.status).value;
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
          this.icon = this.option.style.icon.find((item) => item.key == this.option.data.static_data.status).value;
        },
        deep: true
      }
    }
  }
</script>
