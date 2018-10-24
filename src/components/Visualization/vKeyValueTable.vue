<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;border:${option.style.table.lineWidth}px ${option.style.table.lineColor} solid;font-family: ${option.style.table.fontFamily};`">
      <div v-show="option.style.tableHead.show" :style="`color:${option.style.tableHead.color};font-size: ${option.style.tableHead.fontSize}px;font-weight: ${option.style.tableHead.fontWeight};background-color: ${option.style.tableHead.backgroundColor};line-height: ${option.style.tableHead.height}px;`">
        <div class="key" :style="`width: ${option.style.column.firstColumnWidth}%;border-right:${option.style.column.splitLine.lineWidth}px ${option.style.column.splitLine.lineColor} solid;text-align: ${option.style.column.firstColumn.textAlign};padding-left:${option.style.tableCell.paddingLeft}px;padding-right:${option.style.tableCell.paddingRight}px;`">{{option.data.static_data[0].label}}</div>
        <div class="val" :style="`width: ${100 - option.style.column.firstColumnWidth}%;text-align: ${option.style.column.secondColumn.textAlign};padding-left:${option.style.tableCell.paddingLeft}px;padding-right:${option.style.tableCell.paddingRight}px;`">{{option.data.static_data[0].value}}</div>
        <div class="clear"></div>
      </div>
      <div v-for="(item,index) in keyList" :style="`line-height: ${rowHeight}px;border-bottom:${index < keyList.length - 1 ? option.style.tableRow.splitLine.lineWidth : 0 }px ${option.style.tableRow.splitLine.lineColor} solid;`">
        <div class="key" :style="`width: ${option.style.column.firstColumnWidth}%;border-right:${option.style.column.splitLine.lineWidth}px ${option.style.column.splitLine.lineColor} solid;color:${option.style.column.firstColumn.color};font-size: ${option.style.column.firstColumn.fontSize}px;font-weight: ${option.style.column.firstColumn.fontWeight};background-color: ${getBgColor(index,'key')};text-align: ${option.style.column.firstColumn.textAlign};padding-left:${option.style.tableCell.paddingLeft}px;padding-right:${option.style.tableCell.paddingRight}px;`" ><span style="cursor:pointer;" @click="changeArea(item)">{{item}}</span></div>
        <div class="val" :style="`width: ${100 - option.style.column.firstColumnWidth}%;color:${option.style.column.secondColumn.color};font-size: ${option.style.column.secondColumn.fontSize}px;font-weight: ${option.style.column.secondColumn.fontWeight};background-color: ${getBgColor(index,'val')};text-align: ${option.style.column.secondColumn.textAlign};padding-left:${option.style.tableCell.paddingLeft}px;padding-right:${option.style.tableCell.paddingRight}px;`">{{option.data.static_data[1][item]}}</div>
        <div class="clear"></div>
      </div>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  import {postResultByApi} from "./api"
  export default {
    name: 'vKeyValueTable',
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
        keyList:[],
        rowHeight:30
      }
    },
    methods: {
      getBgColor(index,type){
        if(this.option.style.tableRow.ifOddEven){
          if(index%2 != 1){
            return this.option.style.tableRow.oddBgColor;
          }else if(index%2 != 0){
            return this.option.style.tableRow.evenBgColor;
          }
        }else{
          if(type == "key"){
            return this.option.style.column.firstColumn.backgroundColor;
          }else if(type == "val"){
            return this.option.style.column.secondColumn.backgroundColor;
          }
        }
      },
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
        if(this.option.data.data_type=='API'){
          let url=this.option.data.data_api
          let param=this.option.data.data_api_json

          postResultByApi(url,param).then(async response=>{

            this.option.data.static_data[1]=response.data;
            this.keyList = Object.keys(this.option.data.static_data[1]);
            if(this.option.style.table.isResponsive){
              if(this.option.style.tableHead.show)
                this.rowHeight = (this.size.height - this.option.style.tableHead.height - this.option.style.tableRow.splitLine.lineWidth * (this.keyList.length - 1) ) / this.keyList.length;
              else
                this.rowHeight = (this.size.height - this.option.style.tableRow.splitLine.lineWidth * (this.keyList.length - 1) ) / this.keyList.length;
            }
            else
              this.rowHeight = 30;
          }).catch(e => {
            this.$message({
              type: 'error',
              message: this.option.data.data_api+"接口调用报错"
            });
          });


        }else{
          this.keyList = Object.keys(this.option.data.static_data[1]);
          if(this.option.style.table.isResponsive){
            if(this.option.style.tableHead.show)
              this.rowHeight = (this.size.height - this.option.style.tableHead.height - this.option.style.tableRow.splitLine.lineWidth * (this.keyList.length - 1) ) / this.keyList.length;
            else
              this.rowHeight = (this.size.height - this.option.style.tableRow.splitLine.lineWidth * (this.keyList.length - 1) ) / this.keyList.length;
          }
          else
            this.rowHeight = 30;
        }


      },
      changeArea(item){
        this.$emit('ievent',{"areaName":item});
      },
    },
    computed: {
      path() {
        return getPath()
      }
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
  .key{
    float: left;
  }
  .val{
    float: left;
  }

  .clear{ clear:both}
</style>
