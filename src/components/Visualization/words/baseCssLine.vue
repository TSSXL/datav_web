<template>
  <section>
    <div :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
        <polyline :points="`${option.data.static_data[0].points}`" :style="`${option.data.static_data[0].style}`" />
      </svg>
    </div>
  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'



  export default {
    name: 'baseCssLine',
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
      },


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
    },
  }
</script>
<style scoped>
  .drip{
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
  }

  tr{
    border:1px solid #ffffff;
  }
  td{
    border:1px solid #ffffff;
  }

  table{
    border:1px solid #ffffff;

  }
</style>
