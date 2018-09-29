
<template>
    <div class="app-container item">
        <h3>新建后端管理</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="标识">

                <el-input
                        v-model="serviceaddr.key"
                        type="text" :rows="2"
                        :autosize="false"
                        name="key" data-vv-as="标识" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="key"></error-tip>
            </el-form-item>

            <el-form-item label="地址">

                <el-input
                        v-model="serviceaddr.url"
                        type="text" :rows="2"
                        :autosize="false"
                        name="url" data-vv-as="地址" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="url"></error-tip>
            </el-form-item>

            <el-form-item label="标签">

                <el-tag
                        :key="tag"
                        type="small"
                        size=""
                        v-for="tag in serviceaddr.tag"
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


          <el-form-item label="描述">

            <el-input
              v-model="serviceaddr.desc"
              type="textarea" :rows="5"
              :autosize="false"
              name="desc" data-vv-as="描述" v-validate="''">
            </el-input>

            <error-tip :errs="errors" name="desc"></error-tip>
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
        addItem } from "@/views/dev/serviceaddr/api";
    import errorTip from "@/components/Validate/errorTip";






    export default {
        components: {errorTip },
        data() {
            return {
                id: this.$route.params.id,


                inputTagtagVisible: false,
                inputTagtagValue: '',
            serviceaddr:
            {
                key: '',
                url: '',
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
            .serviceaddr.tag.
                splice(this
            .serviceaddr.tag.
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
                .serviceaddr.tag.
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
                        addItem(this.serviceaddr).then(response => {
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
