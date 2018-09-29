<template>
  <el-container>
    <el-aside width="216px">
      <div class="aside-title" style="margin:8px;">
        <el-input v-model="filter" name="filter"
                  placeholder="检索需要的元素"
                  prefix-icon="el-icon-search" size="mini"></el-input>
      </div>
      <el-collapse accordion>
        <el-collapse-item v-for="(group, index) in groups" :key="index">
          <template slot="title">
            <i :class="group.icon" style="margin-left: 12px;"></i> {{group.label}}
          </template>
          <draggable class="list-group" element="ul" v-model="group.controls"
                     :options="{animation: 0, group: { name: 'controls', pull: 'clone', put: false }, disabled: false, ghostClass: 'ghost', sort: false}"
                     style="padding:0px;margin-top:0px;">
            <transition-group type="transition" :name="group.name">
              <el-row v-for="(control, index) in group.controls.filter((c) => c.label.indexOf(filter) > -1)" :key="index">
                <el-col :span="22" style="padding-left: 36px;">
                  <el-button type="text" size="mini"><i :class="control.icon" aria-hidden="true"></i> {{control.label}}
                  </el-button>
                </el-col>
                <el-col :span="2">
                  <el-button size="mini" type="text" @click="addControl(control)"><i class="fa fa-plus-square"
                                                                                     aria-hidden="true"></i>
                  </el-button>
                </el-col>
              </el-row>
            </transition-group>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main style="overflow: hidden;background-color:#f7f8fa;">
      <el-form ref="form" label-width="80px" size="mini">
        <el-row style="margin-top:10px;">
          <el-col :span="10">

          </el-col>
          <el-col :span="10">

          </el-col>
        </el-row>
        <div class="cmp-design" @click="clickScreen">
          <el-row v-for="(row, index) in page.layout" :key="index">
            <el-col v-for="(col, index) in row.cols" :key="index" :span="col.span" style="border: 1px solid #DCDFE6">
              <draggable element="div" v-model="col.data"
                         :options="{animation: 0, group:{ name:'controls' }, disabled: false, ghostClass: 'ghost', sort: true}"
                         @end="evt=>onEnd(evt, col)" @add="evt=>onAdd(evt, col)">
                <transition-group name="no" class="list-group" tag="ul" style="min-height:36px; margin:0px; padding:0px;">
                  <li v-for="(element, index) in col.data" :key="index" @click="selectControl(index, col)"
                      :class="currentItem === element ? 'actived' : '' ">
                    <el-form-item :label="element.label" label-width="100px" style="padding:3px; margin:0px;">
                      <el-row>
                        <el-col :span="18">
                          <control-display :element="element"></control-display>
                        </el-col>
                        <el-col :span="5">
                          <section style="padding: 4px; font-size: 10px; color: #909399;">
                            <i class="fa fa-database" v-if="element.dataField && element.dataField !== ''"></i>
                          </section>
                        </el-col>
                        <el-col :span="1" style="text-align: right">
                          <el-button type="text" @click="deleteControl(index, col.data)"><i
                            class="fa fa-trash"></i>
                          </el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </li>
                </transition-group>
              </draggable>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-main>
    <el-aside class="aside">
      <el-form label-position="left" label-width="80px" style="margin:10px;" size="mini">
        <el-tabs tab-position="top" style="height: 200px;" v-model="currentTab" @tab-click="handleTabClick">
          <el-tab-pane label="页面设置" name="page">
            <el-form-item label="名称">
              <el-input v-model="page.name" name="name" placeholder="请输入页面名称"/>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="page.desc" name="name" placeholder="请输入描述"/>
            </el-form-item>
            <layout-setting :layout="page.layout" @on-result-change="resultChange"></layout-setting>
          </el-tab-pane>
          <el-tab-pane label="控件属性" name="property" v-if="currentIndex > -1">
            <configure-panel :controlName="currentItem.name + 'Configure'" :formItem="currentItem"
                             :model="page.refModel"></configure-panel>
          </el-tab-pane>
          <el-tab-pane label="验证项" name="validate" v-if="currentIndex > -1">
            <validate-setting :validate="currentItem.validate"></validate-setting>
          </el-tab-pane>
          <el-tab-pane label="显示条件">
            <el-form-item label="匹配值" prop="val">
              <el-input></el-input>
            </el-form-item>
            <el-form-item style="text-align: center" label-width="0px">
              <el-button type="primary"><i class="fa fa-undo"></i> 重置条件</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-aside>
  </el-container>
</template>

<script>
  import draggable from 'vuedraggable'
  import {groups} from '../data/controls'
  import {layout} from '../data/layout'
  import controlDisplay from './controlDisplay'
  import configurePanel from './configurePanel'
  import layoutSetting from './layoutSetting'
  import validateSetting from './validateSetting'
  import * as UUID from "uuid"

  export default {
    components: {
      draggable, controlDisplay, configurePanel, layoutSetting, validateSetting
    },
    props: {
      page: {type: Object}
    },
    data() {
      return {
        currentTab: 'page',
        currentItemTab: 'property',
        clickControl: false,
        filter: '',
        currentItem: null,
        currentIndex: -1,
        groups: groups,
        layout: layout,
        dictionary: {
          tree: [],
          list: []
        }
      }
    },
    methods: {
      addControl(control) {
        if (this.page.layout && this.page.layout.length > 0) {
          const newObj = Object.assign({}, control)
          this.page.layout[0].cols[0].data.push(newObj)

          this.currentIndex = this.page.layout[0].cols[0].data.length - 1
          this.currentItem = newObj
          this.currentTab = 'property'
        }
      },
      deleteControl(index, data) {
        this.$confirm('此操作将删除元素, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          data.splice(index, 1)
          this.unSelectControl()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      onAdd(evt, col) {
        // 深拷贝
        const newObj = Object.assign({}, col.data[evt.newIndex])
        col.data.splice(evt.newIndex, 1, newObj)
        this.selectControl(evt.newIndex, col)
      },
      onEnd(evt, col) {
        //console.log('onEnd')
        //this.selectControl(evt.newIndex, col)
      },
      clickScreen() {
        if (this.clickControl) {
          this.clickControl = false
          return
        }
        this.unSelectControl()
      },
      selectControl(index, col) {
        this.clickControl = true
        this.currentIndex = index
        this.currentItem = col.data[index]
        this.currentTab = this.currentItemTab
      },
      unSelectControl() {
        this.currentIndex = -1
        this.currentItem = null
        this.currentTab = 'page'
      },
      resultChange(val) {
        //console.log(val)
        this.page.layout = val
      },
      handleTabClick(tab, event) {
        if (tab.name === 'property' || tab.name === 'validate') {
          this.currentItemTab = tab.name
        }
      }
    },
    mounted() {
    },
    watch: {}
  }
</script>

<style scoped>
  li {
    list-style-type: none;
  }

  .actived {
    border: 1px #00CD00 dashed;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 6px;
  }

  .aside {
    width: 380px;
    height: calc(100vh - 56px);
    overflow-x: hidden;
    background-color: #f7f8fa;
  }

  .aside-title {
    background-color: #FFFFFF;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .layout-toolbar {
    background-color: #FFFFFF;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .el-main {
    padding: 0px;
  }

  .el-container {
    height: calc(100vh);
  }

  .el-header, .el-footer {
    background-color: #333333;
    font-size: 12px;
    color: #CCCCCC;
    height: 20px;
    line-height: 20px;
  }

  .el-aside {
    background-color: #f7f8fa;
    color: #333;
  }

  .el-main {
    /*background-color: #e7e6e7;*/
    background-color: #ffffff;
    color: #666666;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .cmp-design {
    overflow-y: scroll;
    border: 1px lightgray dashed;
    padding: 5px;
    height: calc(100vh - 130px);
    background: url('/static/workflow/grid_background_01.gif') repeat;
  }

  .tab .el-tabs__content {
    padding: 5px !important;
  }

  .aside-action {
    text-align: center;
    padding: 0;
    margin: 0
  }

  .aside-action li {
    list-style-type: none;
    padding: 4px;
    margin: 0
  }

  .aside-action .el-button--mini {
    padding: 0px 0px;
  }
</style>
