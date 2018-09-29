<template>
  <div>
   <span v-if="value.type=='fontIcon'" :class="value.fontIcon.className"
         :style="'color: #999999; font-size: ' + width + 'px'"></span>
    <img v-if="value.type=='image' && value.images.length > 0"
         :src="path + value.images[0].url" :width="width"/>
    <img v-if="value.type=='upload' && value.uploads.length > 0"
         :src="value.uploads[0].url"
         :width="width"/>
  </div>
</template>
<script>
  import store from '@/store'
  export default {
    props: {
      value: {type: Object},
      width: {type: Number, default: 64}
    },
    components: {},
    data() {
      return {};
    },
    computed: {
      path() {
        return store.getters.urls.attachment_lib_path
      }
    },
    methods: {}
  };
</script>
<style scoped>
</style>
