
<template>
    <div class="app-container item">
        <h3>企业用户注册</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="企业名称">

                <el-input
                        v-model="userNode.name"
                        type="text" :rows="2"
                        :autosize="false"
                        name="name" data-vv-as="企业名称" v-validate="'required'" style="width:250px;">
                </el-input>

                <error-tip :errs="errors" name="name"></error-tip>
            </el-form-item>
          <el-form-item label="统一信用代码">

            <el-input
              v-model="userNode.creditCode"
              type="text" :rows="2"
              :autosize="false"
              name="creditCode" data-vv-as="统一信用代码" v-validate="'required'" style="width:250px;">
            </el-input>

            <error-tip :errs="errors" name="creditCode"></error-tip>
          </el-form-item>

          <el-form-item label="电话">

            <el-input
              v-model="userNode.telephone"
              type="text" :rows="2"
              :autosize="false"
              name="telephone" data-vv-as="电话" v-validate="'required'" style="width:250px;">
            </el-input>

            <error-tip :errs="errors" name="telephone"></error-tip>
          </el-form-item>

          <el-form-item label="邮箱">

            <el-input
              v-model="userNode.email"
              type="text" :rows="2"
              :autosize="false"
              name="email" data-vv-as="邮箱" v-validate="'required'" style="width:250px;">
            </el-input>

            <error-tip :errs="errors" name="email"></error-tip>
          </el-form-item>
          <el-form-item label="企业类别">

            <el-select
              v-model="userNode.enterpriseType"
              :multiple="false"
              :clearable="false"
              :filterable="false"
              :allow-create="false"
              name="enterpriseType" data-vv-as="企业类别" style="width:250px;">
              <el-option
                v-for="item in enterpriseTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <error-tip :errs="errors" name="enterpriseType"></error-tip>
          </el-form-item>

          <el-form-item label="主营行业">

            <el-select
              v-model="userNode.industry"
              :multiple="false"
              :clearable="false"
              :filterable="false"
              :allow-create="false"
              name="industry" data-vv-as="主营行业" style="width:250px;">
              <el-option
                v-for="item in industryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <error-tip :errs="errors" name="industry"></error-tip>
          </el-form-item>
            <el-form-item label="区域">

                <el-select
                        v-model="userNode.area"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="false"
                        name="area" data-vv-as="区域" style="width:250px;">
                    <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <error-tip :errs="errors" name="area"></error-tip>
            </el-form-item>


            <el-form-item label="地址">

                <el-input
                        v-model="userNode.address"
                        type="text" :rows="2"
                        :autosize="false"
                        name="address" data-vv-as="地址" style="width:450px;">
                </el-input>

                <error-tip :errs="errors" name="address"></error-tip>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        addItem } from "@/views/sm/userNode/api";
    import errorTip from "@/components/Validate/errorTip";






    export default {
        components: {errorTip },
        data() {
            return {
                id: this.$route.params.id,

                areaOptions: [],
                isResidentOptions: [],
                enterpriseTypeOptions: [],
                industryOptions: [],
                civilServiceTypeOptions: [],
                civilServiceLevelOptions: [],

            userNode:
            {
                name: '',
                desc: '',
                area: '江东区',
                otherLevel: '',
                telephone: '',
                email: '',
                address: '',
                citizenIdNo: '',
                isResident: 'true',
                isRealName: '',
                householdRegister: '',
                creditCode: '',
                enterpriseType: '国企',
                industry: '房地产',
                civilServiceType: '央企',
                civilServiceLevel: '央企',
                classify:'enterprise'
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


            fetchareaOptions() {

                this.areaOptions = [{"value":"江东区","label":"江东区"},{"value":"海曙区","label":"海曙区"}];

            },



            fetchisResidentOptions() {

                this.isResidentOptions = [{"label":"是","value":"true"},{"label":"否","value":"false"}];

            },



            fetchenterpriseTypeOptions() {

                this.enterpriseTypeOptions = [{"value":"央企","label":"央企"},{"value":"国企","label":"国企"}];

            },



            fetchindustryOptions() {

                this.industryOptions = [{"label":"房地产","value":"房地产"},{"label":"互联网","value":"互联网"}];

            },



            fetchcivilServiceTypeOptions() {

                this.civilServiceTypeOptions = [{"value":"央企","label":"央企"}];

            },



            fetchcivilServiceLevelOptions() {

                this.civilServiceLevelOptions = [{"value":"央企","label":"央企"}];

            },



            createFilter(queryString) {
                return (options) => {
                    return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },






            onSubmit() {
                this.$validator.validateAll().then(result => {
                    if (this.errors.any()) {
                        return;
                    }

                    if (result) {
                        addItem(this.userNode).then(response => {
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                          this.userNode = {
                            name: '',
                            desc: '',
                            area: '江东区',
                            otherLevel: '',
                            telephone: '',
                            email: '',
                            address: '',
                            citizenIdNo: '',
                            isResident: 'true',
                            isRealName: '',
                            householdRegister: '',
                            creditCode: '',
                            enterpriseType: '国企',
                            industry: '房地产',
                            civilServiceType: '央企',
                            civilServiceLevel: '央企',
                            classify:'enterprise'
                          }
                        });
                      this.errors.clear();
                        return;
                    }


                });
            },
            onCancel() {
                this.$router.go(-1)
            }
        }
        , created() {


            this.fetchareaOptions();



            this.fetchisResidentOptions();



            this.fetchenterpriseTypeOptions();



            this.fetchindustryOptions();



            this.fetchcivilServiceTypeOptions();



            this.fetchcivilServiceLevelOptions();



        }
    };
</script>
<style scoped>

</style>
