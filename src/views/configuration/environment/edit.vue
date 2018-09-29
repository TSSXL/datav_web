
<template>
    <div class="app-container item">
        <h3>编辑运行环境</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="命名空间">

                <el-select
                        v-model="environment.namespace"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="true"
                        name="namespace" data-vv-as="命名空间" v-validate="'required'">
                    <el-option
                            v-for="item in namespaceOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <error-tip :errs="errors" name="namespace"></error-tip>
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
        get,
        editItem } from "@/views/configuration/environment/api";
    import errorTip from "@/components/Validate/errorTip";






    export default {
        components: {errorTip },
        data() {
            return {
                id: this.$route.params.id,

                namespaceOptions: [],

            environment:
            {
                namespace: '',

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


            fetchnamespaceOptions() {

            },



            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },






            fetchData() {
                getItem(this.id).then(response => {
                    this.environment = response.data;
                });
            },

            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }


                    if (result) {
                        editItem(this.id, this.environment).then(response => {
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


            this.fetchnamespaceOptions();



            this.fetchData();

        }
    };
</script>
<style scoped>

</style>
