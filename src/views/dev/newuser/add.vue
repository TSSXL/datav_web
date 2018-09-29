
<template>
    <div class="app-container item">
        <h3>新建用户信息输入</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">
            
            <el-form-item label="名称">
                
                <el-input
                        v-model="newuser.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="名称" v-validate="'required'">
                </el-input>
                
                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>
            
            <el-form-item label="描述">
                
                <el-input
                        v-model="newuser.desc"
                        type="textarea" :rows="1"
                        :autosize="true"
                        name="desc" data-vv-as="描述" v-validate="''">
                </el-input>
                
                <error-tip :errs="errors" name="desc"></error-tip>
            </el-form-item>
            
            <el-form-item label="标签">
                
                <el-tag
                        :key="tag"
                        type="small"
                        size=""
                        v-for="tag in newuser.tag"
                        :closable="true"
                        :disable-transitions="true"
                        @close="handleTagtagClose(tag)"
                        name="tag" data-vv-as="标签" v-validate="''">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputTagtagVisible"
                        v-model="inputTagtagValue"
                        ref="saveTagtagInput"
                        size=""
                        @keyup.enter.native="handleTagtagInputConfirm"
                        @blur="handleTagtagInputConfirm"
                        name="tag" data-vv-as="标签" v-validate="''"
                >
                </el-input>
                <el-button v-else size="" @click="showTagtagInput">+ 新标签
                </el-button>
                
                <error-tip :errs="errors" name="tag"></error-tip>
            </el-form-item>
            
            <el-form-item label="年龄">
                
                <el-input-number
                        v-model="newuser.age"
                        :min="10" :max="Infinity"
                        :step="4"
                        name="age" data-vv-as="年龄" v-validate="'required'">
                </el-input-number>

                
                <error-tip :errs="errors" name="age"></error-tip>
            </el-form-item>
            
            <el-form-item label="性别">
                
                <el-radio-group
                        v-if="sexOptions.length>0"
                        v-model="newuser.sex">
                    <el-radio-button v-for="item in sexOptions"
                                     :key="item.value" :label="item.value"
                                     name="sex" data-vv-as="性别"
                                     v-validate="'required'">{{item.label}}
                    </el-radio-button>
                </el-radio-group>

                
                <error-tip :errs="errors" name="sex"></error-tip>
            </el-form-item>
            
            <el-form-item label="角色">
                
                <el-transfer
                        v-if="roleOptions.length>0"
                        :filterable="true"
                        :titles="['待选项','选中项']"
                        :filter-method="filterMethod"
                        filter-placeholder=""
                        v-model="newuser.role"
                        :props="{key: 'value', label: 'label'}"
                        :data="roleOptions"
                        name="role" data-vv-as="角色" v-validate="'required'">
                </el-transfer>
                
                <error-tip :errs="errors" name="role"></error-tip>
            </el-form-item>
            
            <el-form-item label="新的角色">
                
                <el-transfer
                        v-if="roleoOptions.length>0"
                        :filterable="true"
                        :titles="['待选项','选中项']"
                        :filter-method="filterMethod"
                        filter-placeholder=""
                        v-model="newuser.roleo"
                        :props="{key: 'value', label: 'label'}"
                        :data="roleoOptions"
                        name="roleo" data-vv-as="新的角色" v-validate="'required'">
                </el-transfer>
                
                <error-tip :errs="errors" name="roleo"></error-tip>
            </el-form-item>
            
            <el-form-item label="位置">
                
                <a-map v-model="newuser.local" :width="500"
                       :height="400" :zoom="15">
                </a-map>
                
                <error-tip :errs="errors" name="local"></error-tip>
            </el-form-item>
            
            <el-form-item label="自动完成">
                
                
                <el-autocomplete
                        v-model="newuser.autocomplate"
                        :fetch-suggestions="fetchautocomplateSuggestions"
                        placeholder=""
                        :trigger-on-focus="true"
                        name="autocomplate" data-vv-as="自动完成" v-validate="'required'">
                </el-autocomplete>
                
                <error-tip :errs="errors" name="autocomplate"></error-tip>
            </el-form-item>
            
            <el-form-item label="select">
                
                <el-select
                        v-model="newuser.select"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="false"
                        name="select" data-vv-as="select" v-validate="'required'">
                    <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                
                <error-tip :errs="errors" name="select"></error-tip>
            </el-form-item>
            
            <el-form-item label="selecttree">
                
                <el-cascader
                        expand-trigger="hover"
                        :show-all-levels-trigger="false"
                        :filterable="true"
                        :options="selecttreeOptions"
                        :props="{value:'name', label:'name'}"
                        v-model="newuser.selecttree">
                </el-cascader>

                
                <error-tip :errs="errors" name="selecttree"></error-tip>
            </el-form-item>
            
            <el-form-item label="ztree">
                
                <z-tree-select v-model="newuser.ztree"
                               :treeid="'ztree'"
                               :onlyleaf="true"
                               :options="ztreeOptions">
                </z-tree-select>

                
                <error-tip :errs="errors" name="ztree"></error-tip>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">新建</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        addItem } from "@/views/dev/newuser/api";
    import errorTip from "@/components/Validate/errorTip";
    

    
    import {getItem as getOptions} from "@/views/dev/option/api"
    
    
    import {getList as getroleList} from "@/views/sm/role/api";
    
    
    import aMap from '@/components/Control/aMap';
    
    import zTreeSelect from '@/components/Control/zTreeSelect';
    

    export default {
        components: {errorTip , aMap, zTreeSelect},
        data() {
            return {
                id: this.$route.params.id,
                
                sexOptions: [],
                roleOptions: [],
                roleoOptions: [],
                autocomplateOptions: [],
                selectOptions: [],
                selecttreeOptions: [],
                ztreeOptions: [],
                
                inputTagtagVisible: false,
                inputTagtagValue: '',
            newuser:
            {
                name: '',
                desc: '',
                tag: [],
                age: 10,
                sex: '',
                role: [],
                roleo: [],
                local: {},
                autocomplate: '',
                select: '',
                selecttree: [],
                ztree: [],
                
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
            
            
            fetchsexOptions() {
                
                this.sexOptions = [{"value":"男","label":"男"},{"value":"女","label":"女"}];
                
            },
            
            
            
            fetchroleOptions() {
                
                getOptions('5a6aef87828b2a326a4fe714').then(response => {
                    this.roleOptions = response.data.options;
                });
                
            },
            
            
            
            fetchroleoOptions() {
                
                getroleList({
                    pageNo: 1,
                    pageSize: 100,
                    sort: "_id",
                    order: -1
                }, {name: {$regex: ''}}).then(response => {
                    
                    this.roleoOptions = response.data.results.map(item => {
                        return {value:item.id, label:item.desc}
                    });
                    
                });
                
            },
            
            
            
            fetchautocomplateSuggestions(queryString, cb) {
                
                getOptions('5a6aef87828b2a326a4fe714').then(response => {
                    var options = response.data.options;
                    var results = queryString ? options.filter(this.createFilter(queryString)) : options;
                    cb(results);
                });
                
            },
            
            
            
            fetchselectOptions() {
                
                getOptions('5a6aef87828b2a326a4fe714').then(response => {
                    this.selectOptions = response.data.options;
                });
                
            },
            
            
            
            fetchselecttreeOptions() {
                
                getOptions('5a0d030ef09737308c9db813').then(response => {
                    this.selecttreeOptions = response.data.options;
                });
                
            },
            
            
            
            fetchztreeOptions() {
                
                getOptions('5a0bed3d28379c275091075c').then(response => {
                    this.ztreeOptions = response.data.options;
                });
                
            },
            
            

            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            

            
            handleTagtagClose(tag) {
                this
            .newuser.tag.
                splice(this
            .newuser.tag.
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
                .newuser.tag.
                    push(inputValue);
                }
                this.inputTagtagVisible = false;
                this.inputTagtagValue = '';
            },
            

            
            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }
                    
                    if (result) {
                        addItem(this.newuser).then(response => {
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
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
            
            
            this.fetchsexOptions();
            
            
            
            this.fetchroleOptions();
            
            
            
            this.fetchroleoOptions();
            
            
            
            
            
            this.fetchselectOptions();
            
            
            
            this.fetchselecttreeOptions();
            
            
            
            this.fetchztreeOptions();
            
            
            
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