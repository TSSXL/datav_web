
<template>
    <div class="app-container item">
        <h3>新建数据库</h3>
        <!--本代码由系统自动生成，请在修改后予以去除-->
        <el-form ref="form" label-width="120px" size="mini">


          <el-form-item label="数据库名称">

            <el-input
              v-model="db.name"
              type="text" :rows="2"
              :autosize="false"
              name="name" data-vv-as="数据库名称" v-validate="'required'">
            </el-input>

            <error-tip :errs="errors" name="dbName"></error-tip>
          </el-form-item>

          <el-form-item label="描述">

            <el-input
              v-model="db.desc"
              type="text" :rows="2"
              :autosize="false"
              name="desc" data-vv-as="描述">
            </el-input>

          </el-form-item>
            <el-form-item label="数据库类型">

                <el-select
                        v-model="db.type"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="false"
                        name="dbType" data-vv-as="数据库类型" v-validate="'required'">
                    <el-option
                            v-for="item in dbTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <error-tip :errs="errors" name="dbType"></error-tip>
            </el-form-item>

            <el-form-item label="数据库地址">

                <el-input
                        v-model="db.addr"
                        type="text" :rows="2"
                        :autosize="false"
                        name="addr" data-vv-as="数据库地址" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="addr"></error-tip>
            </el-form-item>

            <el-form-item label="数据库端口">

                <el-input-number
                        v-model="db.port"
                        :min="0" :max="60000"
                        :step="1"
                        name="port" data-vv-as="数据库端口" v-validate="'required'">
                </el-input-number>


                <error-tip :errs="errors" name="port"></error-tip>
            </el-form-item>

            <el-form-item label="数据库实例">

                <el-input
                        v-model="db.instance"
                        type="text" :rows="2"
                        :autosize="false"
                        name="instance" data-vv-as="数据库实例" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="instance"></error-tip>
            </el-form-item>

            <el-form-item label="字符集">

                <el-input
                        v-model="db.characterSet"
                        type="text" :rows="2"
                        :autosize="false"
                        name="characterSet" data-vv-as="字符集" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="characterSe"></error-tip>
            </el-form-item>



            <el-form-item label="登录用户名">

                <el-input
                        v-model="db.loginUsername"
                        type="text" :rows="2"
                        :autosize="false"
                        name="loginUsername" data-vv-as="登录用户名" v-validate="'required|alpha_dash|max:100'">
                </el-input>

                <error-tip :errs="errors" name="loginUsername"></error-tip>
            </el-form-item>

            <el-form-item label="登录密码">

                <el-input
                        v-model="db.loginPassword"
                        type="text" :rows="2"
                        :autosize="false"
                        name="loginPassword" data-vv-as="登录密码" v-validate="'required||max:100'">
                </el-input>

                <error-tip :errs="errors" name="loginPassword"></error-tip>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">新建</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { addItem } from "@/views/data/db/api";
    import errorTip from "@/components/Validate/errorTip";

    export default {
      components: { errorTip },
      data() {
        return {
          id: this.$route.params.id,
          dbTypeOptions: [],
          db: {
            type: "MySql",
            addr: "",
            port: 2048,
            instance: "",
            characterSet: "UTF-8",
            name: "",
            desc: "",
            loginUsername: "",
            loginPassword: ""
          },
          filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
          }
        };
      },
      methods: {
        fetchdbTypeOptions() {
          this.dbTypeOptions = [{ "label": "MySql", "value": "MySql" }]
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
              addItem(this.db).then(response => {
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
        this.fetchdbTypeOptions();
      }
    };
</script>
<style scoped>

</style>
