<template>
  <section>
    <div :id="option.cmpId" :style="`background-image:url('http://192.168.10.11:32402/public//imglib/5ba1f4c8f63b3f003254147b.jpg');background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;width:${size.width}px;height:${size.height}px;`">
    </div>
    <!--<div :id="option.cmpId" :style="`width:${size.width}px;height:${size.height}px;`">
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
    </div>-->
  </section>
</template>
<script>
  import * as d3 from "d3";

  export default {
    name: 'floorView',
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
        selectPolygon:false,
        svgContainer: {},
        tooltipContainer: {},
        background: "",
        numbers: []
      }
    },
    methods: {
      createPolygon(points, no, company, dateEnd) {
        let $this=this;
        let polygon = this.svgContainer.append('polygon')
        .attr("points", points.join(" ")).attr("stroke", "red").attr("stroke-width", 2)
        .style("fill", "blue").style("opacity", 0.6).style("cursor", "pointer")
        .on("mouseover", function (data, index) {
          $this.selectPolygon = true;
          polygon.style("fill", "green");
          console.log("x:"+d3.event.pageX+",y:"+d3.event.pageY);
          $this.tooltipContainer.html(
            '<span class="content1">编号:' + no + '<br/>名称:' + company + '<br/>到期日期:' + dateEnd
            + '</span>')
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
          $this.tooltipContainer.transition().duration(300).style("opacity", 0.9);
        }).on('mouseleave', function () {
          $this.selectPolygon = false;
          polygon.style("fill", "blue");
          $this.tooltipContainer.transition().duration(100).style("opacity", 0);
        });
      },
      getSize() {
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return {
          width: obj.clientWidth,
          height: obj.clientHeight
        };
      },
      init() {

        let data = [{
          "no": "1",
          "companyName": "宁波商通天下电子商务有限公司",
          "location": "332,89|318,183|383,188|394,103",
          "dateEnd": "2018-07-31"
        }, {
          "no": "233",
          "companyName": "宁波中经科技发展有限公司",
          "location": "299,356|298,396|387,380|374,337",
          "dateEnd": "2018-12-31"
        }, {
          "no": "23",
          "companyName": "浙江鼎玺网络科技有限公司",
          "location": "146,277|140,351|253,354|251,286",
          "dateEnd": "2018-12-31"
        }, {
          "no": "101",
          "companyName": "宁波锐智影视文化传媒有限公司",
          "location": "451,199|448,209|497,211|497,262|626,263|622,201",
          "dateEnd": "2019-06-30"
        }, {
          "no": "1025",
          "companyName": "宁波锐智影视文化传媒有限公司",
          "location": "159,193|161,258|286,259|282,208|332,207|331,191",
          "dateEnd": "2019-06-30"
        }, {
          "no": "1202",
          "companyName": "内蒙古脑立方全脑应用训练中心有限公司上海分公司",
          "location": "186,339|146,416|220,450|260,375",
          "dateEnd": "2019-06-30"
        }, {
          "no": "1025",
          "companyName": "宁波天擎信息技术有限公司",
          "location": "400,269|398,353|577,359|573,348|615,344|615,284|619,268",
          "dateEnd": "2018-12-31"
        }, {
          "no": "10256",
          "companyName": "宁波天擎信息技术有限公司",
          "location": "277,264|280,278|296,279|299,341|394,344|397,267",
          "dateEnd": "2018-12-31"
        }];

        for (let i = 0; i < data.length; i++) {
          this.createPolygon(data[i].location.split('|'), data[i].no, data[i].companyName,
            data[i].dateEnd);
          //this.numbers.push(numStr.charAt(i));
        }
      },
      draw() {
      }

    },
    computed: {},
    created() {
      this.$nextTick(() => {
        this.size = this.getSize();
        this.svgContainer = d3.select("#" + this.option.cmpId).append("svg").attr("width", this.size.width).attr(
          "height", this.size.height);
        this.tooltipContainer = d3.select("#" + this.option.cmpId).append("div");
        this.tooltipContainer.attr("class", "tooltip").attr("style"," position: absolute;text-align: left;width: 200px;height: 80px;padding: 2px;background: lightgoldenrodyellow;border: 1px orange solid;border-radius: 8px;pointer-events: none;").style("opacity", 0);
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
        console.log(this.size);
      })
    }
  }
</script>
