
<template>
    <div class="app-container item">
        <h3>编辑传感器</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">
            
            <el-form-item label="名称">
                
                <el-input
                        v-model="sensor.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="名称" v-validate="'required|'">
                </el-input>
                
                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>
            
            <el-form-item label="消息字段">
                
                <el-input
                        v-model="sensor.field"
                        type="text" :rows="2"
                        :autosize="false"
                        name="field" data-vv-as="消息字段" v-validate="'required'">
                </el-input>
                
                <error-tip :errs="errors" name="field"></error-tip>
            </el-form-item>
            
            <el-form-item label="单位">
                
                
                <el-autocomplete
                        v-model="sensor.unit"
                        :fetch-suggestions="fetchunitSuggestions"
                        placeholder=""
                        :trigger-on-focus="true"
                        name="unit" data-vv-as="单位" v-validate="'required'">
                </el-autocomplete>
                
                <error-tip :errs="errors" name="unit"></error-tip>
            </el-form-item>
            
            <el-form-item label="标签">
                
                <el-tag
                        :key="tag"
                        type="small"
                        size="small"
                        v-for="tag in sensor.tag"
                        :closable="true"
                        :disable-transitions="true"
                        @close="handleTagtagClose(tag)"
                        name="tag" data-vv-as="标签" v-validate="'required'">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputTagtagVisible"
                        v-model="inputTagtagValue"
                        ref="saveTagtagInput"
                        size="small"
                        @keyup.enter.native="handleTagtagInputConfirm"
                        @blur="handleTagtagInputConfirm"
                        name="tag" data-vv-as="标签" v-validate="'required'"
                >
                </el-input>
                <el-button v-else size="small" @click="showTagtagInput">+ 新标签
                </el-button>
                
                <error-tip :errs="errors" name="tag"></error-tip>
            </el-form-item>
            
            <el-form-item label="描述">
                
                <el-input
                        v-model="sensor.desc"
                        type="textarea" :rows="6"
                        :autosize="false"
                        name="desc" data-vv-as="描述" v-validate="'required'">
                </el-input>
                
                <error-tip :errs="errors" name="desc"></error-tip>
            </el-form-item>
            
            <el-form-item label="字段类型">
                
                <el-select
                        v-model="sensor.type"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="false"
                        name="type" data-vv-as="字段类型" v-validate="'required'">
                    <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                
                <error-tip :errs="errors" name="type"></error-tip>
            </el-form-item>
            
            <el-form-item label="样例数据">
                
                <el-input
                        v-model="sensor.example"
                        type="text" :rows="2"
                        :autosize="false"
                        name="example" data-vv-as="样例数据" v-validate="''">
                </el-input>
                
                <error-tip :errs="errors" name="example"></error-tip>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">编辑</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        getItem,
        editItem } from "@/views/console/sensor/api";
    import errorTip from "@/components/Validate/errorTip";
    

    
    import {getItem as getOptions} from "@/views/dev/option/api"
    
    
    

    export default {
        components: {errorTip },
        data() {
            return {
                id: this.$route.params.id,
                
                unitOptions: [],
                typeOptions: [],
                
                inputTagtagVisible: false,
                inputTagtagValue: '',
            sensor:
            {
                name: '',
                field: '',
                unit: '',
                tag: [],
                desc: '',
                type: '',
                example: '',
                
            }
        ,
            filterMethod(query, item)
            {
                return item.label.indexOf(query) > -1;
            }
        }
            ;
        },
        methods: {
            
            
            fetchunitSuggestions(queryString, cb) {
                
                getOptions('5a162e2fb92f5e2c208e4f40').then(response => {
                    var options = response.data.options;
                    var results = queryString ? options.filter(this.createFilter(queryString)) : options;
                    cb(results);
                });
                
            },
            
            
            
            fetchtypeOptions() {
                
                getOptions('5a614515396b251ba0e64d0b').then(response => {
                    this.typeOptions = response.data.options;
                });
                
            },
            
            

            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            

            
            handleTagtagClose(tag) {
                this
            .sensor.tag.
                splice(this
            .sensor.tag.
                indexOf(tag), 1
            )
                ;
            },
            showTagtagInput() {
                this.inputTagtagVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagtagInput.$refs.input.focus();
                });
            },
            handleTagtagInputConfirm() {
                let inputValue = this.inputTagtagValue;
                if (inputValue) {
                    this
                .sensor.tag.
                    push(inputValue);
                }
                this.inputTagtagVisible = false;
                this.inputTagtagValue = '';
            },
            

            
            fetchData() {
                getItem(this.id).then(response => {
                    this.sensor = response.data;
                });
            },
            
            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }
                    
                    
                    if (result) {
                        editItem(this.id, this.sensor).then(response => {
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
        , created() {
            
            
            
            
            this.fetchtypeOptions();
            
            
            
            this.fetchData();
            
        }
    };
</script>
<style scoped>
    
    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    
</style>