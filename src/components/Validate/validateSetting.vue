<template>
    <div v-if="rules">
        <el-form-item label="必须项">                       
            <el-checkbox v-model="rules.required" label="required"></el-checkbox>                         
        </el-form-item>        

        <el-form-item label="验证项">
            <span v-show="rules.type"><b>{{ rules.type}}</b></span>
            <span v-show="!rules.type"><b>无</b></span>
            <el-button v-show="!editType" @click="handleEditType" type="text">修改</el-button>
                <div v-show="editType">
                    <el-radio-group v-model="currentType">
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
                    <div>
                        <el-button type="primary" @click="handleSaveType">确认</el-button>
                        <el-button type="ghost" @click="cancelEditType">取消</el-button>
                    </div>
                </div> 
        </el-form-item>

        <el-form-item label="文本限制" v-if="rules.type == 'alpha' || rules.type == 'alpha_dash' || rules.type == 'alpha_num'">
            <span v-show="rules.max">最大长度&nbsp;<b>{{ rules.max}}</b></span>
            <span v-show="rules.min">最小长度&nbsp;<b>{{ rules.min}}</b></span>
            <span v-show="!rules.max && !rules.min"><b>无</b></span>
            <el-button v-show="!editString" @click="handleEditString" type="text">修改</el-button>
            <div v-show="editString">                                
                <div>                             
                    <el-checkbox v-model="string.hasMax">最大长度</el-checkbox>
                    <el-input-number v-model="string.max" v-show="string.hasMax"></el-input-number>
                </div>
                <div>
                    <el-checkbox v-model="string.hasMin">最小长度</el-checkbox>
                    <el-input-number v-model="string.min" v-show="string.hasMin"></el-input-number>
                </div>
                <div>
                    <el-button type="primary" @click="handleSaveString">确认</el-button>
                    <el-button type="ghost" @click="cancelEditString">取消</el-button>
                </div>
            </div>
        </el-form-item>    

        <el-form-item label="数字限制" v-if="rules.type == 'numeric' || rules.type == 'decimal'"> 
            <span v-if="rules.digits">固定长度&nbsp;<b>{{ rules.digits}}</b></span>
            <span v-if="rules.between">在<b>{{ rules.between.min}}</b>和<b>{{ rules.between.max }}</b>之间</span>
            <span v-if="!rules.digits && !rules.between"><b>无</b></span>
            <el-button v-show="!editNumber" @click="handleEditNumber" type="text">修改</el-button>
            <div v-show="editNumber">
                    <div>
                        <el-radio v-model="number.rule" label="none">无</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="number.rule" label="digits">固定长度数字
                            <el-input-number v-model="number.digits" v-show="number.rule == 'digits'"></el-input-number>
                        </el-radio>
                    </div>
                    <div>
                        <el-radio v-model="number.rule" label="between">在min和max之间的数字
                            <el-input-number v-model="number.betweenMin" v-show="number.rule == 'between'"></el-input-number>
                            <el-input-number v-model="number.betweenMax" v-show="number.rule == 'between'"></el-input-number>
                        </el-radio>
                    </div>
                <div>
                    <el-button type="primary" @click="handleSaveNumber">确认</el-button>
                    <el-button type="ghost" @click="cancelEditNumber">取消</el-button>
                </div>   
            </div>                     
        </el-form-item>  

        <el-form-item label="日期限制" v-if="rules.type == 'date_format'"> 
            <span v-if="rules.before">比指定日期小&nbsp;<b>{{ rules.before}}</b></span>
            <span v-if="rules.after">比指定日期大&nbsp;<b>{{ rules.after }}</b></span>
            <span v-if="rules.datebetween">在 <b>{{ rules.datebetween }}</b> 之间的日期</span>
            <span v-if="!rules.before && !rules.after && !rules.datebetween"><b>无</b></span>
            <el-button v-show="!editDate" @click="handleEditDate" type="text">修改</el-button>
            <div v-show="editDate">
                <div>                             
                    <el-radio v-model="date.rule" label="before">比target要小的一个合法日期，格式(DD/MM/YYYY)</el-radio>
                    <el-date-picker
                        v-model="date.before"
                        type="date"
                        placeholder="选择日期"
                        v-show="date.rule == 'before'">
                    </el-date-picker>
                </div> 
                <div>                             
                    <el-radio v-model="date.rule"  label="after">比target要大的一个合法日期，格式(DD/MM/YYYY)</el-radio>
                    <el-date-picker
                        v-model="date.after"
                        type="date"
                        placeholder="选择日期"
                        v-show="date.rule == 'after'">
                    </el-date-picker>
                </div>  
                <div>                             
                    <el-radio v-model="date.rule" label="between">日期在min和max之间</el-radio>
                    <el-date-picker
                        v-model="date.between"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-show="date.rule == 'between'">
                    </el-date-picker>
                </div>    
                <div>
                    <el-button type="primary" @click="handleSaveDate">确认</el-button>
                    <el-button type="ghost" @click="cancelEditDate">取消</el-button>
                </div>  
            </div>          
        </el-form-item> 

        <el-form-item label="文件限制" v-if="rules.type == 'file'">  
            <span v-if="rules.ext">后缀名&nbsp;<b>{{ rules.ext}}</b></span>
            <span v-if="rules.mimes">文件类型&nbsp;<b>{{ rules.mimes}}</b></span>
            <span v-if="rules.size">文件大小不超过&nbsp;<b>{{ rules.size}}</b></span>
            <span v-if="!rules.ext && !rules.mimes && !rules.size"><b>无</b></span>
            <el-button v-show="!editFile" @click="handleEditFile" type="text">修改</el-button>
            <div v-show="editFile">
                <div>                             
                    <el-radio v-model="file.rule" label="ext">后缀名</el-radio>
                    <el-input v-model="file.ext" v-show="file.rule == 'ext'"></el-input>
                </div> 
                <div>                             
                    <el-radio v-model="file.rule" label="mimes">文件类型</el-radio>
                    <el-input v-model="file.mimes" v-show="file.rule == 'mimes'"></el-input>
                </div>  
                <div>                             
                   <el-radio v-model="file.rule" label="size">文件大小不超过 kb</el-radio>
                   <el-input v-model="file.size" v-show="file.rule == 'size'"></el-input>
                </div>    
                <div>
                    <el-button type="primary" @click="handleSaveFile">确认</el-button>
                    <el-button type="ghost" @click="cancelEditFile">取消</el-button>
                </div>  
            </div>             
        </el-form-item>  

        <el-form-item label="图片限制" v-if="rules.type == 'image'">  
            <span v-if="rules.dimensions">符合宽&nbsp;<b>{{ rules.dimensions.width}}px</b> 高 <b>{{ rules.dimensions.height}}px</b> 规定的图片</span>
            <span v-if="!rules.dimensions"><b>无</b></span>
            <el-button v-show="!editImage" @click="handleEditImage" type="text">修改</el-button>
            <div v-show="editImage">
                <div>                             
                    宽(px)
                    <el-input-number v-model="image.width"></el-input-number>
                </div>
                <div>
                    高(px)
                    <el-input-number v-model="image.height"></el-input-number>
                </div>
                <div>
                    <el-button type="primary" @click="handleSaveImage">确认</el-button>
                    <el-button type="ghost" @click="cancelEditImage">取消</el-button>
                </div> 
            </div>            
        </el-form-item>                

        <el-form-item label="正则表达式">
            <span v-if="rules.regex"><b>{{ rules.regex }}</b></span>
            <span v-if="!rules.regex"><b>无</b></span>
            <el-button v-show="!editRegex" @click="handleEditRegex" type="text">修改</el-button>
                <div v-show="editRegex">  
                    <el-input></el-input>                              
                    <div>
                        <el-button type="primary" @click="handleSaveRegex">确认</el-button>
                        <el-button type="ghost" @click="cancelEditRegex">取消</el-button>
                    </div>
                </div>
        </el-form-item>
    </div>
</template>
<script>
export default {
  props: {
    rules: { type: Object }
  },
  data() {
    return {
      currentType: "",
      editType: false,
      editString: false,
      editNumber: false,
      editDate: false,
      editImage: false,
      editFile: false,
      string: { hasMax: false, max: 0, hasMin: false, min: 0 },
      number: {
        rule: "",
        digits: null,
        betweenMin: null,
        betweenMax: null
      },
      date: {
        rule: "",
        before: null,
        after: null,
        between: null
      },
      image:{ width: 0, height: 0 },
      file: { rule: "", ext: "", mimes: "", size: ""},
      currentRegex: "",
      editRegex: false
    };
  },
  computed: {
    _foo: {
      set: function(value) {
        this.foo = value;
      },
      get: function() {
        return this.foo;
      }
    }
  },
  methods: {
    handleEditType() {
      this.editType = true;
    },
    handleSaveType() {
      this.rules.type = this.currentType;
      this.editType = false;
    },
    cancelEditType() {
      this.editType = false;
    },
    handleEditString() {
      this.editString = true;
    },
    handleSaveString() {
      this.rules.max = this.string.hasMax ? this.string.max : null;
      this.rules.min = this.string.hasMin ? this.string.min : null;
      this.editString = false;
    },
    cancelEditString() { this.editString = false; },
    handleEditNumber() {
      this.editNumber = true;
    },
    handleSaveNumber() {
      if (this.number.rule == "digits") {
        this.rules.digits = this.number.digits;
        this.rules.between = null;
      }
      if (this.number.rule == "between") {
        this.rules.between = {};
        this.rules.between.min = this.number.betweenMin;
        this.rules.between.max = this.number.betweenMax;
        this.rules.digits = null;
      }
      if (this.number.rule == "none") {
        this.rules.digits = null;
        this.rules.between = null;
      }
      this.editNumber = false;
    },
    cancelEditNumber() { this.editNumber = false; },
    handleEditDate() {
      this.editDate = true;
    },
    handleSaveDate() {
      this.rules.after = null;
      this.rules.before = null;
      this.rules.datebetween = null;

      if (this.date.rule == "after") {
        this.rules.after = this.date.after;
      }
      if (this.date.rule == "before") {
        this.rules.before = this.date.before;
      }
      if (this.date.rule == "between") {
        this.rules.datebetween = this.date.between;
      }
      this.editDate = false;
    },
    cancelEditDate() { this.editDate = false; },
    handleEditImage() {
      this.editImage = true;
    },
    handleSaveImage() {
      this.rules.dimensions = {};
      this.rules.dimensions.width = this.image.width;
      this.rules.dimensions.height = this.image.height;
      this.editImage = false;
    },
    cancelEditImage() {this.editImage = false;},
    handleEditFile() {
      this.editFile = true;
    },
    handleSaveFile() {
      if (this.file.rule == "ext") {
        this.rules.ext = this.file.ext;
      }
      if (this.file.rule == "mimes") {
        this.rules.mimes = this.file.mimes;
      }
      if (this.file.rule == "size") {
        this.rules.size = this.file.size;
      }
      this.editFile = false;
    },
    cancelEditFile() {this.editFile = false;},
    handleEditRegex() {
      this.rules.regex = this.currentRegex;
      this.editRegex = true;
    },
    handleSaveRegex() {
      this.editRegex = false;
    },
    cancelEditRegex() {}
  }
};
</script>