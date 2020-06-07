<template>
  <div
    ref="popup"
    class="at-user-popup"
    :style="style"
    v-if="visible"
  >
    <div
      ref="member"
      v-for="(user, index) in members"
      :data-index="index"
      :class="['at-user-popup-item', { 'current': index === current }]"
      :key="user.ID"
      @mouseenter="handleMouseEnter(index, user)"
      @click="handleSelected(user)"
    >
      <img :src="user.Avatar" class="at-user-popup-item-avatar" />
      <div class="at-user-popup-item-name">
        <span v-text="user.Name"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { scrollIntoView } from './utils'
export default {
  inject: ['rootTextarea'],
  props: {
    members: {
      type: Array,
      default() {
        return []
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    atInfo: {
      type: Object,
      default() {
        return {
          left: 0,
          top: 0,
          height: NaN
        }
      }
    }
  },
  computed: {
    style() {
      return `
        left: ${ this.offset.left}px;
        top: ${ this.offset.top}px;
      `
    },
    totalMembers() {
      if (Array.isArray(this.members)) {
        return this.members.length
      }
      return 0
    }
  },
  watch: {
    atInfo: {
      deep: true,
      immediate: true,
      handler() {
        this.refreshOffset()
      }
    },
    members: {
      deep: true,
      immediate: true,
      handler() {
        this.current = 0
      }
    },
    visible: {
      handler(val) {
        if (val) {
          this.current = 0
        }
      }
    },
    current: {
      handler(val) {
        const member = this.$refs.member
        if (member[val]) {
          scrollIntoView(member[val], this.$refs.popup)
        }
      }
    }
  },
  data() {
    return {
      offset: {
        left: 0,
        top: 0
      },
      current: 0
    }
  },
  methods: {
    refreshOffset() {
      let { top, left } = this.atInfo
      this.$nextTick(() => {
        const parent = this.$parent.$el
        const popup = parent.querySelector('.at-user-popup')
        const textarea = parent.querySelector('textarea')
          
        const popupHeight = popup ? popup.offsetHeight : 0
        const textareaScrollTop = textarea ? textarea.scrollTop : 0
        
        this.offset = {
          top: top - popupHeight - textareaScrollTop - 20,
          left: left - 30
        }
      })
    },
    // 选定需要At的用户
    handleSelected(user) {
      this.$emit('atUser', user)
    },
    handleMouseEnter(index) {
      this.current = index
    },
    handleKeyDown(e) {
      if (e.keyCode === 38 || e.keyCode === 40) { // ↑/↓
        if (!(e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          e.stopPropagation()
          this.selectByKeyboard(e)
        }
        return
      }
      if (e.keyCode === 13) {
        this.handleSelected(this.members[this.current])
      }
    },
    // 设置键盘上下选择用户
    selectByKeyboard(e) {
      const arrow = e.keyCode === 38 ? -1 : 1
      if (arrow === -1) {
        if (this.current > 0 ) {
          this.current += arrow
        } else {
          this.current = this.totalMembers - 1
        }
      } else if (arrow === 1) {
        if (this.current === this.totalMembers-1) {
          this.current = 0
        } else {
          this.current += arrow
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$color-border: #eee;
$color-primary: #485eeb;
$shadow-color:rgba(197, 197, 197, 0.2);

//文字溢出不换行
@mixin ellipsis($line:2){
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:$line;
  -webkit-box-orient: vertical;
}

@mixin shadow(){
  box-shadow: 0px 4px 6px 0px $shadow-color;
}

@mixin scroll() {
  /* 清除滑条样式 */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: none;
  }

  /*chrome--------------------------------------------start*/
  &::-webkit-scrollbar {
    width: 0px;
    height: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
    border-radius: 6px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    // background: rgba(201, 201, 202, 1);
    border-radius: 6px;
    transition: all 0.2s;
  }

  /* Handle on hover */
  &:hover {
    &::-webkit-scrollbar-thumb {
      // background: rgba(162, 162, 163, 1);
      background: rgba(201, 201, 202, 1);
    }
  }
  /*chrome--------------------------------------------end*/
  /*IE--------------------------------------------start*/
  & {
    /*三角箭头的颜色*/
    scrollbar-arrow-color: #c0c4cc;
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: #A2A2A3;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: #A2A2A3;
    /*滚动条阴影*/
    scrollbar-shadow-color: #A2A2A3;
    /*滚动条轨道颜色*/
    scrollbar-track-color: #f4f4f5;
    /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-3dlight-color: #A2A2A3;
    /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-darkshadow-color: #A2A2A3;
    /*滚动条基准颜色*/
    scrollbar-base-color: #f4f4f5;
  }
}

.at-user-popup {
  position: absolute;
  top: 0;
  // top: -220px;
  // left: 0;
  // right: 0;
  // bottom: 0;
  width: 200px;
  max-height: 220px;
  border-radius: 6px;
  border: 1px solid $color-border;
  background: #fff;
  overflow: hidden;
  overflow-y: auto;
  @include shadow();
  @include scroll();
  .at-user-popup-item {
    padding: 8px 10px;
    border-bottom: 1px dashed $color-border;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &.current {
      background: $color-primary;
      color: #fff;
      border-bottom: 1px solid $color-primary;
    }
    .at-user-popup-item-avatar {
      width: 25px;
      height: 25px;
      border-radius: 25px;
      display: block;
      object-fit: cover;
      overflow: hidden;
    }
    .at-user-popup-item-name {
      font-size: 14px;
      flex: 1;
      padding-left: 10px;
      display: flex;
      align-items: center;
      span {
        display: block;
        @include ellipsis(1);
      }
    }
  }
}
</style>
