<template>
    <div>
       <el-form-item label="选择数据源">
            <el-radio-group v-model="data.option.type">
            <el-radio-button label="input">输入数据</el-radio-button>
            <el-radio-button label="option">选项数据</el-radio-button>
            <el-radio-button label="api">api数据</el-radio-button>                  
            </el-radio-group>
        </el-form-item>
        <el-form-item label="输入数据" v-if="data.option.type == 'input'">
            <z-tree-options :options="data.option.options"></z-tree-options>        
        </el-form-item>
        <el-form-item label="选项数据" v-if="data.option.type == 'option'">                
            <option-list style="width: 720px;" :option="data.option"></option-list>
        </el-form-item>
        <el-form-item label="API" v-if="data.option.type == 'api'">
            <el-input placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="仅有叶子节点可选">
            <el-switch v-model="data.option.onlyleaf"></el-switch>
        </el-form-item>        
        <el-form-item label="选中值">
          <options-tree-view v-model="data.value" :onlyleaf="data.option.onlyleaf" :options="data.option.options">
          </options-tree-view>
        </el-form-item>
    </div>
</template>
<script>
    import optionList from '@/views/dev/option/selectList'
    import zTreeOptions from '@/components/Control/zTreeOptions';
    import optionsTreeView from '@/components/Control/optionsTreeView';
    export default {
        name: 'z-tree-setting',
        props: { 
            data:  { type: Object }
        },
        components: { optionList, zTreeOptions, optionsTreeView },
        data () {
            return {   
                
            }
        },
        methods:
        {
           
        }
    }
</script>