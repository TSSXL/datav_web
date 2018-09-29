
<template>
    <div class="app-container item">
        <h3>新建实例</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="姓名">

                <el-input
                        v-model="example.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="姓名" v-validate="'required||max:20'">
                </el-input>

                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>

            <el-form-item label="option选项">

                <el-transfer
                        v-if="sexOptions.length>0"
                        :filterable="true"
                        :titles="['待选项','选中项']"
                        :filter-method="filterMethod"
                        filter-placeholder=""
                        v-model="example.sex"
                        :props="{key: 'value', label: 'label'}"
                        :data="sexOptions"
                        name="sex" data-vv-as="option选项" v-validate="'required'">
                </el-transfer>

                <error-tip :errs="errors" name="sex"></error-tip>
            </el-form-item>

            <el-form-item label="目录">

                <el-checkbox-group
                        v-if="categoryOptions.length>0"
                        v-model="example.category">
                    <el-checkbox v-for="item in categoryOptions" :key="item.value" :label="item.value">{{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="图标">

                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/api/imglib/files"
                        :drag="false"
                        :show-file-list="true"
                        list-type="picture-card"
                        :multiple="false"
                        :limit="1"
                        :auto-upload="true"
                        :fileList="example.icon"
                        :on-success="handleUploadiconSuccess"
                        :on-remove="handleUploadiconRemove">
                    <i class="el-icon-plus"></i>

                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

                </el-upload>

                <error-tip :errs="errors" name="icon"></error-tip>
            </el-form-item>

            <el-form-item label="标签">

                <el-tag
                        :key="tag"
                        type="primary"
                        size="medium"
                        v-for="tag in example.tag"
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
                        size="medium"
                        @keyup.enter.native="handleTagtagInputConfirm"
                        @blur="handleTagtagInputConfirm"
                        name="tag" data-vv-as="标签" v-validate="'required'"
                >
                </el-input>
                <el-button v-else size="medium" @click="showTagtagInput">+ 新标签
                </el-button>

                <error-tip :errs="errors" name="tag"></error-tip>
            </el-form-item>

            <el-form-item label="连接账户">

                <account-input v-model="example.dbaccount">
                </account-input>

                <error-tip :errs="errors" name="dbaccount"></error-tip>
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
        addItem } from "@/views/dev/example/api";
    import errorTip from "@/components/Validate/errorTip";



    import {getItem as getOptions} from "@/views/dev/option/api"



    import aMap from '@/components/Control/aMap';

    import accountInput from '@/components/Control/accountInput';


    export default {
        components: {errorTip , aMap, accountInput},
        data() {
            return {
                id: this.$route.params.id,

                sexOptions: [],
                categoryOptions: [],

                inputTagtagVisible: false,
                inputTagtagValue: '',
            example:
            {
                name: '',
                sex: [],
                category: [],
                icon: [],
                tag: [],
                location: {},
                dbaccount: {},

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

                getOptions('5a13cb9a7f96462c50be6f6f').then(response => {
                    this.sexOptions = response.data.options;
                });

            },



            fetchcategoryOptions() {

                getOptions('5a044f481ccacd23d49b181a').then(response => {
                    this.categoryOptions = response.data.options;
                });

            },



            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },


            handleUploadiconSuccess(res, file, fileList) {
                this.seticonFileList(fileList)
            },
            handleUploadiconRemove(res, file) {
                this.seticonFileList(fileList)
            },
            seticonFileList(fileList) {
                this.example.icon = [];
                for (let file of fileList) {
                    if (file.response)
                        this
                .example.icon.
                    push({name: file.name, url: file.response.data.results})
                else
                    this
                .example.icon.
                    push({name: file.name, url: file.url})
                }
            },



            handleTagtagClose(tag) {
                this
            .example.tag.
                splice(this
            .example.tag.
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
                .example.tag.
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
                        addItem(this.example).then(response => {
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



            this.fetchcategoryOptions();



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
