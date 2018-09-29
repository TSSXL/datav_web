
<template>
    <div class="app-container item">
        <h3>编辑可视化模板</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="名称">

                <el-input
                        v-model="vistemplate.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="名称" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>

            <el-form-item label="描述">

                <el-input
                        v-model="vistemplate.desc"
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
                        v-for="tag in vistemplate.tag"
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
        editItem } from "@/views/visualization/vistemplate/api";
    import errorTip from "@/components/Validate/errorTip";






    export default {
        components: {errorTip },
        data() {
            return {
                id: this.$route.params.id,


                inputTagtagVisible: false,
                inputTagtagValue: '',
            vistemplate:
            {
                name: '',
                desc: '',
                tag: [],

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


            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },




            handleTagtagClose(tag) {
                this
            .vistemplate.tag.
                splice(this
            .vistemplate.tag.
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
                .vistemplate.tag.
                    push(inputValue);
                }
                this.inputTagtagVisible = false;
                this.inputTagtagValue = '';
            },



            fetchData() {
                getItem(this.id).then(response => {
                    this.vistemplate = response.data;
                });
            },

            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }


                    if (result) {
                        editItem(this.id, this.vistemplate).then(response => {
                            this.$message({
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
