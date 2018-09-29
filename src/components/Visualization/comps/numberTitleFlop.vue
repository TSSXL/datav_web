<template>
  <section>
    <div :id="option.cmpId" :style="`width:${size.width}px;height:${size.height}px;`">
      <div v-if="option.style.titleStyle.show" :style="`text-align:${option.style.titleStyle.align};color:${option.style.titleStyle.color};font-family: ${option.style.titleStyle.fontFamily};font-size: ${option.style.titleStyle.fontSize}px;font-weight: ${option.style.titleStyle.fontWeight};`">{{option.style.titleStyle.name}}</div>
      <div :style="`position: relative;float: left;left:${option.style.numberStyle.left}%;top:${option.style.numberStyle.top}%;`">
        <div v-if="option.style.textStyle.prefix != ''" :style="`float:left;line-height:${option.style.numberStyle.height}px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};margin-right:10px;`">{{option.style.textStyle.prefix}}</div>
        <template v-for="item in numbers">
          <div :style="`float:left;width:${option.style.numberStyle.width}px;height:${option.style.numberStyle.height}px;margin-right:10px;border:${option.style.border.width}px ${option.style.border.type} ${option.style.border.color};border-radius: 5%;${background}`">
            <div :style="`line-height:${option.style.numberStyle.height}px;color:${option.style.numberStyle.color};font-family: ${option.style.numberStyle.fontFamily};font-size: ${option.style.numberStyle.fontSize}px;font-weight: ${option.style.numberStyle.fontWeight};`">{{item}}</div>
          </div>
        </template>
        <div v-if="option.style.textStyle.suffix != ''" :style="`float:left;line-height:${option.style.numberStyle.height}px;color:${option.style.textStyle.color};font-family: ${option.style.textStyle.fontFamily};font-size: ${option.style.textStyle.fontSize}px;font-weight: ${option.style.textStyle.fontWeight};margin-let:10px;`">{{option.style.textStyle.suffix}}</div>
      </div>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'numberTitleFlop',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        size: {
          width: 400,
          height: 200
        },
        background: "",
        numbers: []
      }
    },
    methods: {
      getSize() {
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width: obj.clientWidth,
          height: obj.clientHeight
        };
      },
      init() {
        if (this.option.style.background.isBgColor) {
          if (this.option.style.background.isGradient)
            this.background = `background:radial-gradient(${this.option.style.background.color1}, ${this.option.style.background.color2}, ${this.option.style.background.color3});`;
          else
            this.background = `background:${this.option.style.background.bgColor};`;
        } else {
          this.background = "";
        }

        let numStr = this.option.data.static_data.value.toString();
        this.numbers = [];
        for (let i = 0; i < numStr.length; i++) {
          this.numbers.push(numStr.charAt(i));
        }
      },
      draw(){
      }
    },
    computed: {},
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
        this.init();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.size = this.getSize();
          this.init();
        },
        deep: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          let val = this.numbers.join('');
          val = parseInt(val) + Math.ceil(Math.random() * 5);
          let numStr = val.toString();
          for (let i = 0; i < numStr.length; i++) {
            this.numbers[i] = (numStr.charAt(i));
          }
          this.$forceUpdate();
        }, 2000);
      })
    }
  }
</script>
