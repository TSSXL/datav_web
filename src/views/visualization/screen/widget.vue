<template>
  <section>
    <span :style="style">{{title}}</span>
  </section>
</template>
<script>

  export default {
    name: 'vTextTitle',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      title: function () {
        var data = this.option.data.static_data
        //var gettype = Object.prototype.toString
        //var prototype = gettype.call(data)
        //if(prototype == '[object Array]'){
          return data[0].value
        //}else{
        //  return JSON.parse(data)[0].value
        //}
      },
      style: function(){
        return 'font-size: ' + this.option.style.text.fontSize + 'px; color: ' + this.option.style.text.color + '; font-family: ' + this.option.style.text.fontFamily
      }
    },
    created() {
    }
  }
</script>
<style scoped>
</style>
