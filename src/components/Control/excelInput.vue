<template>
  <div class="fileinput-button" >
    <el-button @click="input"  type="primary" icon="plus" style="margin-right: 10px;" size="mini">导入</el-button>
    <a href="javascript:;" class="file">
      <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    </a>
  </div>
</template>

<script>
  import axios from 'axios'
  import XLSX from'xlsx';
  import Blob from '@/excel/Blob.js'
  import Export2Excel from '@/excel/Export2Excel.js'
  export default {

    props:['msg'],
    data() {
      return {
      };
    },

    methods: {
        //手动触发上传事件
        input(){
          document.getElementById("upload").click();
        },

      importfxx(obj) {
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }

            if(rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西

            this.da = [...outdata]

            let arr = []
            this.da.map(v => {
              let obj = {}
              obj.id = v.id
              obj.status = v.status
              console.log(v);
              arr.push(obj)
            })
            console.log(arr)
            let para = {
              //withList: JSON.stringify(this.da)
              withList: arr
            }
            _this.$message({
              message: '请耐心等待导入成功',
              type: 'success'
            });
//            withImport(para).then(res => {
//              window.location.reload()
//            })

          }
          reader.readAsArrayBuffer(f);
        }
        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },

      export2Excel(excelData,Header,filter,outName) {
        var that = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/excel/Export2Excel'); //这里必须使用绝对路径
          const tHeader = Header; // 导出的表头名
          const filterVal = filter; // 导出的表头字段名
          const list = excelData;
          const data = that.formatJson(filterVal, list);

          export_json_to_excel(tHeader, data, outName);// 导出的表格名称，根据需要自己命名
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }

    }
  };
</script>

<style scoped>

  .fileinput-button {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .fileinput-button input{
    position: absolute;
    width: 0px;
  }
</style>
