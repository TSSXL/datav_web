<template>
  <div class='json-editor'>
    <textarea ref='textarea'></textarea>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/addon/display/autorefresh'
  import 'codemirror/addon/lint/lint.css'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/rubyblue.css'
  import 'codemirror/keymap/vim'

  require('script-loader!jsonlint')
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint'
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/foldcode'
  import 'codemirror/addon/fold/foldgutter'
  import 'codemirror/addon/fold/brace-fold'
  import 'codemirror/addon/fold/comment-fold'
  import 'codemirror/addon/display/fullscreen.css'
  import 'codemirror/addon/display/fullscreen'

  export default {
    name: 'cmJsonEditor',
    data() {
      return {
        jsonEditor: false
      }
    },
    props: ['value'],
    watch: {
      value(value) {
        const editor_value = this.jsonEditor.getValue()
        if (value !== editor_value) {
          this.jsonEditor.setValue(JSON.stringify(JSON.parse(this.value), null, 2))
        }
      }
    },
    created() {
      this.$nextTick(function () {
        this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
          lineNumbers: true,
          mode: 'application/json',
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          theme: 'rubyblue',
          lineWrapping: true,
          foldGutter: true,
          lint: true,
          autoRefresh: true,
          fullScreen: false,
          //快捷键
          extraKeys: {
            "Alt-Space": "autocomplete",//ctrl-space唤起智能提示
            "F11": function (cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            },
            "Ctrl-/": "toggleComment",
            "Ctrl-S": function () {
              $('#save').click();
            },
            "Ctrl-Z": function (editor) {
              editor.undo();
            },//undo
            "F8": function (editor) {
              editor.redo();
            },//Redo
            "F7": function autoFormat(cm) {
              var totalLines = cm.lineCount();
              cm.autoFormatRange({line: 0, ch: 0}, {line: totalLines});
            }//代码格式化
          }
        })

        // 将json文件格式化显示
        if(this.value) {
          //this.jsonEditor.setValue(JSON.stringify(JSON.parse(this.value), null, 2))
          this.jsonEditor.setValue(this.value)
        }
        this.jsonEditor.on('change', cm => {
          this.$emit('changed', cm.getValue())
          this.$emit('input', cm.getValue())
        })
      })
    },
    methods: {
      getValue() {
        return this.jsonEditor.getValue()
      }
    }
  }
</script>

<style>
  .json-editor{
    height: 100%;
    position: relative;
  }
  .json-editor >>> .CodeMirror {
    height: auto;
    min-height: 300px;
  }
  .json-editor >>> .CodeMirror-scroll{
    min-height: 300px;
  }
  .json-editor >>> .cm-s-rubyblue span.cm-string {
    color: #F08047;
  }
</style>
