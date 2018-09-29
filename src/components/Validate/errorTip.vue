<template>
    <div>
        <i v-show="errs.has(name)" class="el-icon-warning validate is-danger"></i>
        <span v-show="errs.has(name)" class="validate is-danger">{{ errs.first(name) }}</span>        
    </div>
</template>
<script>
export default {
  props: {
    errs: { type: Object },
    name: { type: String }
  }
};
</script>