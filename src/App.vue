<template>
  <div id="app">
    <div class="editor">
      <VueAtTextarea 
        :members="members"
        :row-props="rowProps"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
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
      members: [
        {
          Avatar: "http://redstudy.oss-cn-chengdu.aliyuncs.com/avatar_20200509110605_1588993565_QQ图片20161121090758.jpg",
          DepartmentName: '',
          DepartmentNamePath: '',
          ID: "4Nxy9ZUZEeqvNNxKPlMEIQ",
          Type: 0,
          UserName: "李四"
        }
      ]
    }
  },
  methods: {
    handleChange(e) {
      console.log(e)
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
</style>
