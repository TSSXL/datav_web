<template>
  <section>
    <el-form-item label="必须项">
      <el-checkbox v-model="required" label="required"></el-checkbox>
    </el-form-item>
    <div class="sub-title"> 验证项</div>
    <el-form-item label="验证项">
      <el-radio-group v-model="rule">
        <el-radio label="">无</el-radio>
        <el-radio label="alpha">只包含英文字符</el-radio>
        <el-radio label="alpha_dash">可以包含英文、数字、下划线、破折号</el-radio>
        <el-radio label="alpha_num">可以包含英文和数字</el-radio>
        <el-radio label="date_format">合法的format格式化日期</el-radio>
        <el-radio label="numeric">只允许数字</el-radio>
        <el-radio label="decimal">数字，而且是decimals进制</el-radio>
        <el-radio label="file">文件类型</el-radio>
        <el-radio label="image">图片</el-radio>
        <el-radio label="email">email</el-radio>
        <el-radio label="ip">ipv4地址</el-radio>
        <el-radio label="url"> (指定域名的)url</el-radio>
      </el-radio-group>
    </el-form-item>

    <section v-if="rule == 'alpha' || rule == 'alpha_dash' || rule == 'alpha_num'">
      <div class="sub-title"> 文本限制</div>
      <el-form-item label="最大长度">
        <el-input-number v-model="max" :min="min"></el-input-number>
      </el-form-item>
      <el-form-item label="最小长度">
        <el-input-number v-model="min" :max="max"></el-input-number>
      </el-form-item>
    </section>

    <section v-if="rule == 'numeric' || rule == 'decimal'">
      <div class="sub-title"> 数字限制</div>
      <el-form-item label="固定长度">
        <el-input-number v-model="digits"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input-number v-model="max_value" :min="min_value"></el-input-number>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input-number v-model="min_value" :max="max_value"></el-input-number>
      </el-form-item>
    </section>

    <section v-if="rule == 'date_format'">
      <div class="sub-title"> 日期限制</div>
      <el-form-item label="before">
        <el-date-picker
          v-model="before"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span class="info">比target要小的一个合法日期，格式(DD/MM/YYYY)</span>
      </el-form-item>
      <el-form-item label="after">
        <el-date-picker
          v-model="after"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span class="info">比target要大的一个合法日期，格式(DD/MM/YYYY)</span>
      </el-form-item>
    </section>

    <el-form-item label="正则表达式">
      <el-input v-model="regex"></el-input>
    </el-form-item>
  </section>
</template>
<script>
  export default {
    props: {
      validate: {
        type: Object,
        default: function () {
          return {required: false}
        }
      }
    },
    data() {
      return {
        required: null,
        rule: null,
        max: 0,
        min: 0,
        digits: 0,
        min_value: 0,
        max_value: 0,
        before: null,
        after: null,
        regex: null,
        fieldRules: ['alpha', 'alpha_dash', 'alpha_num', 'date_format', 'numeric', 'decimal', 'file', 'image', 'email', 'ip', 'url'],
        propRules: ['max', 'min', 'digits', 'min_value', 'max_value', 'before', 'after']
      }
    },
    watch: {
      rule(val) {
        // 删除全部属性
        this.fieldRules.forEach(x => {
          delete this.validate[x]
        })
        this.propRules.forEach(x => {
          delete this.validate[x]
        })
        if (val && val !== '') this.validate[val] = true
        if (val === 'alpha' || val === 'alpha_dash' || val === 'alpha_num') {
          this.setProp('max', this.max)
          this.setProp('min', this.min)
        }
        if (val === 'numeric' || val === 'decimal') {
          this.setProp('digits', this.digits)
          this.setProp('min_value', this.min_value)
          this.setProp('max_value', this.max_value)
        }
        if (val === 'date_format') {
          this.setProp('before', this.before)
          this.setProp('after', this.after)
        }
      },
      max(val) { this.setProp('max', val) },
      min(val) { this.setProp('min', val) },
      digits(val) { this.setProp('digits', val) },
      min_value(val) { this.setProp('min_value', val) },
      max_value(val) { this.setProp('max_value', val) },
      before(val) { this.setProp('before', val) },
      after(val) { this.setProp('after', val) },
      required(val) { this.validate.required = val },
      regex(val) { this.setProp('regex', val) }
    },
    computed: {
    },
    mounted() {
      this.$nextTick(function() {
        this.required = this.validate.required
        this.setProp('regex', this.validate.regex)

        this.fieldRules.forEach(x => {
          if (this.validate[x]) {
            this.rule = x
          }
        })

        this.propRules.forEach(x => {
          if (this.validate[x]) {
            this[x] = this.validate[x]
          }
        })
      })
    },
    methods: {
      setProp(prop, val) {
        if (!val || val === 0 || val === null || val === '') {
          delete this.validate[prop]
        } else {
          this.validate[prop] = val
        }
      }
    }
  }
</script>
