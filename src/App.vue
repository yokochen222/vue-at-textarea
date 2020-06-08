<template>
  <div id="app">
    <button :class="['btn', {'current': current === 0}]" @click="handleChangeGroup(0)">群聊1</button>
    <button :class="['btn', {'current': current === 1}]" @click="handleChangeGroup(1)">群聊2</button>
    <button :class="['btn', {'current': current === 2}]" @click="handleChangeGroup(2)">群聊3</button>
    <button class="btn" @click="handleInsert">插入内容</button>
    <div class="editor">
      <VueAtTextarea 
        :members="members"
        :row-props="rowProps"
        ref="textarea"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
const groups = []
for (let i=0; i<3; i++) {
  const group = []
  for (let j=0; j<5 ; j++) {
    group.push({
      Avatar: "http://redstudy.oss-cn-chengdu.aliyuncs.com/avatar_20200509110605_1588993565_QQ图片20161121090758.jpg",
      DepartmentName: '',
      DepartmentNamePath: '',
      ID: `4Nxy9ZUZEeqvNNxKPlMEIQ${i}-${j}`,
      Type: 0,
      UserName: `群聊${i}李四${j}`
    })
  }
  groups.push(group)
}
export default {
  name: 'App',
  data() {
    return {
      content: '@2李丝丝 ',
      rowProps: {
        id: "ID",
        name: 'UserName',
        avatar: 'Avatar'
      },
      current: 0
    }
  },
  computed: {
    members() {
      return groups[this.current]
    }
  },
  methods: {
    handleChange(e) {
      console.log(e)
    },
    handleChangeGroup(index) {
      this.current = index
    },
    handleInsert() {
      this.$refs.textarea.insertValue('@黄坤 ')
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app{ 
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editor {
  width: 500px;
  margin: 0 auto;
  height: 200px;
  position: relative;
  border: 1px solid #ccc;
}
.btn {
  border: none;
  /* background: #0087ff; */
  border: 1px solid #0087ff;
  color: #0087ff;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: -1px;
  outline: none;
}
.current {
  background: #0087ff;
  color: #fff;
}
</style>
