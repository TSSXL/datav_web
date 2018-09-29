<template>
  <section>
    <component :is="element.name + 'Control'" :element="element"></component>
  </section>
</template>

<script>
  import textControl from './controls/textControl'
  import tagsControl from './controls/tagsControl'
  import progressControl from './controls/progressControl'
  import stepsControl from './controls/stepsControl'
  import carouselControl from './controls/carouselControl'

  import inputControl from './controls/inputControl'
  import textareaControl from './controls/textareaControl'
  import tinymceControl from './controls/tinymceControl'
  import passwordControl from './controls/passwordControl'
  import mobileControl from './controls/mobileControl'
  import emailControl from './controls/emailControl'
  import ipControl from './controls/ipControl'
  import switchControl from './controls/switchControl'
  import inputNumberControl from './controls/inputNumberControl'
  import sliderControl from './controls/sliderControl'
  import tagsInputControl from './controls/tagsInputControl'

  import radioControl from './controls/radioControl'
  import radioButtonControl from './controls/radioButtonControl'
  import checkboxControl from './controls/checkboxControl'
  import checkboxButtonControl from './controls/checkboxButtonControl'
  import selectControl from './controls/selectControl'
  import transferControl from './controls/transferControl'
  import cascaderControl from './controls/cascaderControl'
  import rateControl from './controls/rateControl'
  import mapControl from './controls/mapControl'

  import timeSelectControl from './controls/timeSelectControl'
  import timePickerControl from './controls/timePickerControl'
  import timeSelectRangeControl from './controls/timeSelectRangeControl'
  import timePickerRangeControl from './controls/timePickerRangeControl'
  import datePickerControl from './controls/datePickerControl'
  import datesPickerControl from './controls/datesPickerControl'
  import datePickerRangeControl from './controls/datePickerRangeControl'
  import dateTimePickerControl from './controls/dateTimePickerControl'
  import dateTimePickerRangeControl from './controls/dateTimePickerRangeControl'

  import tableControl from './controls/tableControl'
  import paginationControl from './controls/paginationControl'

  import areaChartControl from './controls/areaChartControl'
  import barChartControl from './controls/barChartControl'
  import pieChartControl from './controls/pieChartControl'
  import lineChartControl from './controls/lineChartControl'

  import uploadControl from './controls/uploadControl'

  export default {
    props: {
      element: { type: Object }
    },
    components: {
      textControl, tagsControl, progressControl, stepsControl, carouselControl,
      inputControl, textareaControl, passwordControl, mobileControl, emailControl, ipControl,
      switchControl, inputNumberControl, sliderControl, tagsInputControl, tinymceControl,
      radioControl, radioButtonControl, checkboxControl, checkboxButtonControl, transferControl, selectControl, cascaderControl, rateControl, mapControl,
      timeSelectControl, timePickerControl, timeSelectRangeControl, timePickerRangeControl,
      datePickerControl, datesPickerControl, datePickerRangeControl, dateTimePickerControl, dateTimePickerRangeControl,
      tableControl, paginationControl,
      areaChartControl, barChartControl, pieChartControl, lineChartControl,
      uploadControl
    }
  }
</script>
