<template>
  <div class="vue-treeselect__value-wrapper">
    <div class="vue-treeselect__single-value">
      <template v-for="(node,index) in instance.visibleValue">
        <span @mousedown="handleMouseDownOnValue" :key="'value-' + node.id">
          <span v-if="index>0">,</span>{{ node.label }}
        </span>
      </template>
    </div>
    <placeholder v-if="!instance.hasValue && !instance.searchQuery" key="placeholer" />
    <search-input key="input" ref="input" />
  </div>
</template>

<script>
  import valueMixin from '../mixins/valueMixin'
  import Placeholder from './Placeholder'
  import SearchInput from './SearchInput'

  export default {
    name: 'vue-treeselect--multi-value',
    components: { Placeholder, SearchInput },
    mixins: [ valueMixin ],
    inject: [ 'instance' ],
  }
</script>
