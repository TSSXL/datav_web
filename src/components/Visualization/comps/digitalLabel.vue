<template>
  <section>
    <div :id="option.cmpId" :style="``">
      <el-row :style="`line-height:${height/2 - 1}px;font-family: ${option.style.textStyle.fontFamily};color:${option.style.labelStyle.color};font-size: ${option.style.labelStyle.fontSize}px;font-weight: ${option.style.labelStyle.fontWeight};`">
        {{option.data.static_data.label}}
      </el-row>
      <template v-if="option.style.border.show">
        <el-row :style="`line-height:${height/2 - option.style.border.width - 1}px;border:${option.style.border.width}px ${option.style.border.color} ${option.style.border.type};background: ${option.style.border.bgColor};font-family: ${option.style.textStyle.fontFamily};color:${option.style.valStyle.color};font-size: ${option.style.valStyle.fontSize}px;font-weight: ${option.style.valStyle.fontWeight};`">
          {{option.data.static_data.val}}
        </el-row>
      </template>
      <template v-else>
        <el-row :style="`line-height:${height/2 - option.style.border.width - 1}px;font-family: ${option.style.textStyle.fontFamily};color:${option.style.valStyle.color};font-size: ${option.style.valStyle.fontSize}px;font-weight: ${option.style.valStyle.fontWeight};`">
          {{option.data.static_data.val}}
        </el-row>
      </template>
    </div>
  </section>
</template>
<script>

  export default {
    name: 'digitalLabel',
    components: {},
    props: {
      option: {type: Object}
    },
    data() {
      return {
        height:100
      }
    },
    methods: {
      getHeight(){
        let v = document.getElementById(this.option.cmpId);
        let obj = v.parentNode.parentNode.parentNode;
        return obj.clientHeight;
      }
    },
    computed: {
    },
    created() {
      this.$nextTick(() => {
        this.height = this.getHeight();
      });
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.height = this.getHeight();
        },
        deep: true
      }
    }
  }
</script>
