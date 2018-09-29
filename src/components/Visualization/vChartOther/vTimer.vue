<template>
  <section>
    <div :id="option.cmpId" :style="`width:${size.width}px;height:${size.height}px;border:${option.style.border.width}px ${option.style.border.type} ${option.style.border.color};border-radius: 50%;${background}`">
      <div :style="`line-height:${(size.height - 10*2)/5}px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{curDate.year}}</div>
      <div :style="`line-height:${(size.height - 10*2)/5}px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{curDate.date}}</div>
      <div :style="`line-height:${((size.height - 10*2)/5)*2}px;color:${option.style.timeStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.timeStyle.fontSize}px;font-weight: ${option.style.timeStyle.fontWeight};`">{{curDate.time}}</div>
      <div :style="`line-height:${(size.height - 10*2)/5}px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};`">{{curDate.week}}</div>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'vTimer',
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
        curDate:{
          year:"",
          date:"",
          time:""
        },
        weekday:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        background:""
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
      prefixIntrger(num,length){
        return (Array(length).join('0')+num).slice(-length);
      },
      initDataTime(){
        let d = new Date();
        this.curDate.year = `${d.getFullYear()}年`;
        this.curDate.date = `${this.prefixIntrger(d.getMonth() + 1,2)}.${this.prefixIntrger(d.getDate(),2)}`;
        this.curDate.time = `${this.prefixIntrger(d.getHours(),2)}:${this.prefixIntrger(d.getMinutes(),2)}:${this.prefixIntrger(d.getSeconds(),2)}`;
        this.curDate.week = this.weekday[d.getDay()];
        if(this.option.style.background.isBgColor){
          if(this.option.style.background.isGradient)
            this.background = `background:radial-gradient(${this.option.style.background.color1}, ${this.option.style.background.color2}, ${this.option.style.background.color3});`;
          else
            this.background = `background:${this.option.style.background.bgColor};`;
        }else{
          this.background = "";
        }
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
        setInterval(this.initDataTime, 1000);

      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
          this.initDataTime();
        },
        deep: true
      }
    }
  }
</script>
