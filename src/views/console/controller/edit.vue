
<template>
    <div class="app-container item">
        <h3>编辑控制器</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="名称">

                <el-input
                        v-model="controller.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="名称" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>

            <el-form-item label="描述">

                <el-input
                        v-model="controller.desc"
                        type="textarea" :rows="1"
                        :autosize="true"
                        name="desc" data-vv-as="描述" v-validate="''">
                </el-input>

                <error-tip :errs="errors" name="desc"></error-tip>
            </el-form-item>

            <el-form-item label="字段类型">

                <el-select
                        v-model="controller.type"
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

            <el-form-item label="最大值" v-if="controller.type=='Number'">

                <el-input-number
                        v-model="controller.maxValue"
                        :min="10" :max="Infinity"
                        :step="1"
                        name="maxValue" data-vv-as="最大值" v-validate="'required'">
                </el-input-number>


                <error-tip :errs="errors" name="maxValue"></error-tip>
            </el-form-item>

            <el-form-item label="数组数据" v-if="controller.type=='Array'">

              <options :options="controller.arrValue"/>
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
        editItem } from "@/views/console/controller/api";
    import errorTip from "@/components/Validate/errorTip";
    import options from '@/components/Control/options';

    export default {
        components: {errorTip,options },
        data() {
            return {
                id: this.$route.params.id,

                typeOptions: [],

            controller:
            {
                name: '',
                desc: '',
                type: '',
                maxValue: 10,
                arrValue: [],

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


            fetchtypeOptions() {

                this.typeOptions = [{"value":"String","label":"String"},{"value":"Number","label":"Number"},
                  {"value":"Array","label":"Array"},{"value":"radio","value":"radio"}];

            },



            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },






            fetchData() {
                getItem(this.id).then(response => {
                    this.controller = response.data;
                    console.log(this.controller);
                });
            },

            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }


                    if (result) {
                        editItem(this.id, this.controller).then(response => {
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

</style>
