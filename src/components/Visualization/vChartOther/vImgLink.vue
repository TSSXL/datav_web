<template>
  <section >
    <div  :id="option.cmpId" :style="`width: ${size.width}px; height: ${size.height}px;`">

      <img :src="bImg" :style="`width: 100%; height: 100%;`" />

    </div>

  </section>
</template>
<script>
  import {getPath} from '@/views/dev/attachment/api'
  export default {
    name: 'vImgLink',
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
      },


    },
    computed: {
      path() {
        return getPath()
      },
      bImg(){
          console.log(this.option.data);
       return this.path+this.option.data.static_data[0].value;
      }


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
  span{
    display: block;
  }
</style>
