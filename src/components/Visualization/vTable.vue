<template>
  <section>
    <span style="line-height: 60px;font-size: 20px;">{{option.style.title}}</span>

    <div class="table">
      <template v-for="rows of tableDatas">
        <el-row class="row">
          <template v-for="item of rows">
            <el-col :span="24/rows.length" class="col">{{item}}</el-col>
          </template>
        </el-row>
      </template>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'vTable',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
      }
    },
    methods: {},
    computed: {
      tableDatas() {
        let list = [];
        let diss =  this.option.data.static_data.map(item => item.dis);
        let eps = Array.from(new Set(this.option.data.static_data.map(item => item.ep))) ;
        list.push(["排名"].concat(Array.from(new Set(diss))));
        for(let e of eps){
          list.push([e].concat(this.option.data.static_data.filter((item)=>item.ep== e).map(item => item.val)));
        }
        return list;
      }
    },
    created() {
    }
  }
</script>
<style scoped>
  .table{
    height: 100%;width:100%;border-left:1px #fff solid;border-top:1px #fff solid;
  }
  .table .row{
    border-bottom:1px #fff solid;line-height: 30px;
  }

  .table .row .col{
    border-right:1px #fff solid;
  }
</style>
