<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <template v-for="(item,index) in seriesItems">
        <div :style="`background-color:${item.color}; width:${circleSize }px; height:${circleSize}px;`" class="circleState">
          <div :style="`color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.textStyle.fontWeight};font-size: ${option.style.textStyle.fontSize}px;padding-top:${option.style.textStyle.top}%`">{{item.name}}</div>
          <div :style="`color:${option.style.numberStyle.color};font-family: ${option.style.textStyle.fontFamily};font-weight: ${option.style.numberStyle.fontWeight};font-size: ${option.style.numberStyle.fontSize}px;`">{{item.value}}</div>
        </div>
        <div v-if="index < seriesItems.length -1" :style="`line-height:${circleSize}px;float:left;width:${option.style.spacing}px;`">&nbsp;<i v-if="option.style.arrow.show" :style="`color:${option.style.arrow.color};font-size: ${option.style.arrow.fontSize}px;`" class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
      </template>
      <div style="clear:both"></div>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'circleState',
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
            name: this.option.style.seriesItems[i].name,
            color: this.option.style.seriesItems[i].color,
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
<style scoped>
.circleState{border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;float:left}
</style>
