<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <template v-for="(item,index) in seriesItems">
        <div :style="`line-height:${circleSize}px;float:left;`">
          <span :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.textStyle.fontWeight};font-size: ${option.style.textStyle.fontSize}px;`">{{item.text}}:</span>
          <span :style="`color:${option.style.numberStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.numberStyle.fontWeight};font-size: ${option.style.numberStyle.fontSize}px;`">&nbsp;{{item.value}}&nbsp;</span>
          <span v-if="item.unit != ''" :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.textStyle.fontWeight};font-size: ${option.style.textStyle.fontSize}px;`">{{item.unit}}</span>
        </div>
        <div v-if="index < seriesItems.length -1" :style="`float:left;width:${option.style.spacing}px;`">&nbsp;</div>
      </template>
      <div style="clear:both"></div>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'titleValues',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size:{
          width:400,
          height:150
        },
        seriesItems:[],
        circleSize:0
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
      init(){
        this.size = this.getSize();
        this.seriesItems = [];
        this.circleSize = this.size.width > this.size.height ? this.size.height: this.size.width;
        for(let i = 0;i< this.option.style.seriesItems.length;i++){
          let value = 0;
          if(i < this.option.data.static_data.length)
            value = this.option.data.static_data[i].value;
          else
            value = 0;
          this.seriesItems.push({
            text: this.option.style.seriesItems[i].text,
            unit: this.option.style.seriesItems[i].unit,
            value:value
          });
        }
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.init();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.init();
        },
        deep: true
      }
    }
  }
</script>
