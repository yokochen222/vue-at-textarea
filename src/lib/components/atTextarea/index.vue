<template>
  <div class="chat-textarea">
    <textarea
      class="chat-textarea-input"
      ref="textarea"
      v-model="content"
      :disabled="disabled"
      :autofocus="autofocus"
      @keydown="handleKeyDown"
      @input="handleInput"
    ></textarea>
    <at-user-popup
      :visible="visible"
      :members="matchedMembers"
      :at-info="atInfo"
      :row-props="rowProps"
      @atUser="handleAtUser"
      ref="popup"
    />
  </div>
</template>
<script>
import getCaretCoordinates from 'textarea-caret'
import atUserPopup from './atUserPopup'
import {
  getCursorPosition,
  getAtAndIndex
} from './utils'
export default {
  name: 'VueAtTextarea',
  components: {
    atUserPopup
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    members: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    memberFilter: {
      type: Function,
      default(item, chunk) {
        return item[this.rowProps.name].toLowerCase().indexOf(chunk.toLowerCase()) > -1
      }
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    rowProps: {
      type: Object,
      default() {
        return {
          id: 'ID',
          name: 'Name',
          avatar: 'Avatar'
        }
      }
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      rootTextarea: this
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.content = val
      }
    },
    content: {
      immediate: true,
      handler(val) {
        this.$emit('input', val)
        this.$emit('change', {
          value: val,
          matchedAtNames: this.matchedAtNameArr,
          matchedAtUsers: this.matchedAtUsersArr
        })
      }
    }
  },
  computed: {
    matchedAtNameArr() {
      const matched = this.content.match(this.matchAtReg)
      return matched ? Array.from(new Set(matched)) : []
    },
    matchedAtUsersArr() {
      const users = []
      const members = this.members
      const matchedAtNames = this.matchedAtNameArr
      if (matchedAtNames) {
        matchedAtNames.forEach((item) => {
          for(let i = 0; i < members.length; i++) {
            if (item.includes(members[i][this.rowProps.name])) {
              // 用户去重
              if (!JSON.stringify(users).includes(members[i][this.rowProps.name])) {
                users.push(members[i])
              }
              break
            }
          }
        })
      }
      return users
    }
  },
  data() {
    return {
      content: '',
      visible: false,
      matchAtReg: /(@\S{1,}?) /g,
      atMark: '@',
      matchedMembers: [],
      lastCursorPos: {
        text: '',
        start: 0,
        end: 0
      },
      atInfo: {
        left: 0,
        top: 0,
        height: NaN
      }
    }
  },
  methods: {
    // 检测输入框失去焦点
    // handleBlur(e) {
    //   this.getCursorPosition(e.target)
    // },
    /***
     * 检测键盘事件 快捷键绑定
     *  */ 
    handleKeyDown(e) {
      this.getCursorPosition(e.target)
      /**
       * 检测当前是否已经打开了 用户选择弹出窗口
       * 如已经弹出则 阻止键盘默认事件 
       * 将事件传递给弹出窗 调用对应方法
       *  */

      if (this.visible) {
        if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
          e.preventDefault()
          e.stopPropagation()
          this.$refs.popup.handleKeyDown(e)
        }
        // if (e.keyCode === 8) {
        //   this.handleDelete(e)
        // }
        /**
         * 检测用户是否 按下了  左键 或者 右键
         * 阻止默认事件行为 ， 避免插入文本位置不对
         * */ 
        if (e.keyCode === 37 || e.keyCode === 39) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
      // this.handleInput(e)
    },
    // 检测文本输入事件
    handleInput(e) {
      // textarea
      const textarea = e.target
      // 输入的字符
      const text = textarea.value.slice(0, textarea.selectionEnd)
      // flag 是否显示用户弹窗
      let showPopup = true
      if (text) {
        // 查找@字符位置
        const { at, index} =  getAtAndIndex(text, this.atMark)
        // 如果没找到@标识符则不显示弹出窗
        if (index < 0) {
          showPopup = false
        }
        // 获取@符号至输入光标位置的字符
        const chunk = text.slice(index + at.length, text.length)

        // 过滤匹配到的用户数据
        const matched = this.members.filter(v => {
          return this.memberFilter(v, chunk)
        })
        if (matched.length && showPopup) {
          this.openPopUp(textarea, matched, index)
        } else {
          this.closePopUp()
        }
      } else {
        this.closePopUp()
      }
    },
    // 打开用户选择框
    openPopUp(textarea, matchedMembers, atCharIndex) {
      this.matchedMembers = matchedMembers
      // 从@后第一位开始
      const atEnd = atCharIndex + 1 
      this.atInfo = {
        ...getCaretCoordinates(textarea, atEnd),
        atCharIndex
      }
      this.visible = true
    },
    closePopUp() {
      this.visible = false
    },
    // // 文本删除事件
    // handleDelete() {
    //   console.log(this.matchedAtArr)
    // },
    // 将用户名称插入到光标位置
    handleAtUser(user) {
      const text = user[this.rowProps.name]+' '
      const textarea = this.$refs.textarea
      const start = this.atInfo.atCharIndex + 1
      const end = textarea.selectionEnd
      const newValue = textarea.value.slice(0, start) + text + textarea.value.slice(end)
      const newEnd = start + text.length

      this.content = newValue

      textarea.selectionStart = newEnd
      textarea.selectionEnd = newEnd
      this.visible = false
    },
    // 光标位置存储
    getCursorPosition(textarea) {
      this.lastCursorPos = getCursorPosition(textarea)
    }
  }
}
</script>
<style lang="scss" scoped>
// @import url('@/assets/mixins.scss');
.chat-textarea {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .chat-textarea-input {
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    resize: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
}
</style>