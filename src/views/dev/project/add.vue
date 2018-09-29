
<template>
    <div class="app-container item">
        <h3>新建项目</h3>
        <el-form ref="form" label-width="120px" size="mini">

            <el-form-item label="组名">

                <el-select
                        v-model="project.groupName"
                        :multiple="false"
                        :clearable="false"
                        :filterable="false"
                        :allow-create="false"
                        name="groupName" data-vv-as="组名" v-validate="'required'">
                    <el-option
                            v-for="item in groupNameOptions"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>

                <error-tip :errs="errors" name="groupName"></error-tip>
            </el-form-item>

            <el-form-item label="项目名">

                <el-input
                        v-model="project.projectName"
                        type="text" :rows="2"
                        :autosize="false"
                        name="projectName" data-vv-as="项目名" v-validate="'required'">
                </el-input>

                <error-tip :errs="errors" name="projectName"></error-tip>
            </el-form-item>

            <el-form-item>
              <el-checkbox v-model="project.isMake">生成配置</el-checkbox>
            </el-form-item>

            <div v-show="project.isMake">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="端口">
                    <el-input-number
                      v-model="project.port"
                      type="text"
                      name="port" controls-position="right">
                    </el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="版本">
                    <el-input
                      v-model="project.version"
                      type="text"
                      name="version" style="width: 130px;">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="配置">
                <el-radio-group v-model="configTlp" size="mini" @change="changeTemplate">
                  <el-radio-button label="Node"></el-radio-button>
                  <el-radio-button label="Java"></el-radio-button>
                  <el-radio-button label="前端"></el-radio-button>
                </el-radio-group>
                <codemirror v-model="project.dockerContent" :options="cmOptions"></codemirror>
              </el-form-item>
            </div>
            <el-form-item label="描述">

                <el-input
                        v-model="project.desc"
                        type="textarea" :rows="3"
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
    import {addItem ,getGroups} from "@/views/dev/project/api";
    import {codemirror} from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/theme/base16-dark.css'
    import errorTip from "@/components/Validate/errorTip";

    export default {
        components: {errorTip,codemirror },
        data() {
            return {
                id: this.$route.params.id,
                groupNameOptions: [],
                configTlp:'Node',
                project: {
                    groupName: '',
                    projectName: '',
                    projectUrl: '',
                    port:'3000',
                    version:'1.0',
                    isMake:true,
                    dockerContent:'',
                    desc: '',

                },
                cmOptions: {
                  tabSize: 4,
                  mode: 'text/javascript',
                  theme: 'base16-dark',
                  lineNumbers: true,
                  viewportMargin: Infinity
                },
                filterMethod(query, item)
                {
                    return item.label.indexOf(query) > -1;
                }
           };
        },
        methods: {
            fetchgroupNameOptions() {
              getGroups().then(response => {
                this.groupNameOptions = response.data;
              });
            },
            changeTemplate(val){
              if(val == "Node")
                this.project.dockerContent = `FROM node:8.9.1\nADD . /app\nEXPOSE ${this.project.port}\nWORKDIR /app\nRUN npm install\nCMD npm run dev`;
              else if(val == "Java")
                this.project.dockerContent = `FROM openjdk:8-jre-alpine\nADD *.jar /app.jar\nEXPOSE ${this.project.port}\nCMD java -jar /app.jar`;
              else if(val == "前端")
                this.project.dockerContent = `FROM nginx:1.11.5\nADD nginx.conf /etc/nginx/nginx.conf\nADD dist /usr/share/nginx/html\nEXPOSE ${this.project.port}`;
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
                        addItem(this.project).then(response => {
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
            this.fetchgroupNameOptions();
            this.changeTemplate('Node');
        }
    };
</script>
<style scoped>

</style>
