
<template>
  <div class="app-container item">
    <h2>编辑系统字段</h2>
    <el-form ref="form" label-width="120px" size="mini">
        
      <el-form-item label="名称">
          
        <el-input
                v-model="sysfield.name"
                type="text" :rows="2"
                :autosize="false">
        </el-input>
          
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
        
      <el-form-item label="label">
          
        <el-input
                v-model="sysfield.label"
                type="text" :rows="2"
                :autosize="false">
        </el-input>
          
        <error-tip :errs="errors" name="label"></error-tip>
      </el-form-item>
        
      <el-form-item label="排序码">
          
        <el-input-number
                v-model="sysfield.sort"
                :min="10" :max="Infinity"
                :step="1">
        </el-input-number>

          
        <error-tip :errs="errors" name="sort"></error-tip>
      </el-form-item>
        
      <el-form-item label="字段分类">
          
        <el-radio-group
                v-if="categoryOptions.length>0"
                v-model="sysfield.category">
          <el-radio-button v-for="item in categoryOptions"
                           :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>

          
        <error-tip :errs="errors" name="category"></error-tip>
      </el-form-item>
        
      <el-form-item label="数据类型">
          
          
        <el-autocomplete
                v-model="sysfield.type"
                :fetch-suggestions="fetchtypeSuggestions"
                placeholder=""
                :trigger-on-focus="true"
        ></el-autocomplete>
          
        <error-tip :errs="errors" name="type"></error-tip>
      </el-form-item>
        
      <el-form-item label="控件">
          
          
        <el-autocomplete
                v-model="sysfield.control"
                :fetch-suggestions="fetchcontrolSuggestions"
                placeholder=""
                :trigger-on-focus="true"
        ></el-autocomplete>
          
        <error-tip :errs="errors" name="control"></error-tip>
      </el-form-item>
        
      <el-form-item label="属性">
          
        <el-input
                v-model="sysfield.attributes"
                type="textarea" :rows="6"
                :autosize="false">
        </el-input>
          
        <error-tip :errs="errors" name="attributes"></error-tip>
      </el-form-item>
        
      <el-form-item label="选项">
          
        <el-input
                v-model="sysfield.option"
                type="textarea" :rows="6"
                :autosize="false">
        </el-input>
          
        <error-tip :errs="errors" name="option"></error-tip>
      </el-form-item>
        
      <el-form-item label="验证规则">
          
        <el-input
                v-model="sysfield.rules"
                type="textarea" :rows="3"
                :autosize="false">
        </el-input>
          
        <error-tip :errs="errors" name="rules"></error-tip>
      </el-form-item>
        
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button  @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { getItem, editItem } from "@/views/dev/sysfield/api";
    import errorTip from "@/components/Validate/errorTip";
    

    
    import { getItem as getOptions } from "@/views/dev/option/api"
    
    
    

    export default {
        components: { errorTip },
        data() {
            return {
                id: this.$route.params.id,
                
                categoryOptions: [],
                typeOptions: [],
                controlOptions: [],
                
            sysfield: {
                name: '',
                label: '',
                sort: 10,
                category: '',
                type: '',
                control: '',
                attributes: '',
                option: '',
                rules: '',
                
            },
            filterMethod(query, item) {
                return item.label.indexOf(query) > -1;
            }
        };
        },
        methods: {
            
            
            fetchcategoryOptions(){
                
                getOptions('5a4d9528f789ce0824e70e18').then(response => {
                    this.categoryOptions = response.data.options;
                });
                
            },
            
            
            
            fetchtypeSuggestions(queryString, cb) {
                
                getOptions('5a4d9627f789ce0824e70e1a').then(response => {
                    var options = response.data.options;
                    var results = queryString ? options.filter(this.createFilter(queryString)) : options;
                    cb(results);
                });
                
            },
            
            
            
            fetchcontrolSuggestions(queryString, cb) {
                
                getOptions('5a4d97f5f789ce0824e70e1b').then(response => {
                    var options = response.data.options;
                    var results = queryString ? options.filter(this.createFilter(queryString)) : options;
                    cb(results);
                });
                
            },
            
            

            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            

            

            
            fetchData() {
                getItem(this.id).then(response => {
                    this.sysfield = response.data;
                });
            },
            
            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }
                    
                    
                    if (result) {
                        editItem(this.id, this.sysfield).then(response => {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                            this.$router.go(-1)
                        });
                        return;
                    }
                    
                });
            },
            onCancel() {
                this.$router.go(-1)
            }
        }
        ,created() {
            
            
            this.fetchcategoryOptions();
            
            
            
            
            
            
            
            this.fetchData();
            
        }
    };
</script>
<style scoped>
  
</style>