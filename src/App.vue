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
        id: "id",
        name: 'name',
        avatar: 'avatar'
      },
      members: [
        { id: 'fee4b6b2a8af11ea9afe02fcdc4e7412', name: '1张晓晓', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1388647394,240988450&fm=111&gp=0.jpg'} ,
        { id: '0781ea56a8b011eabbd302fcdc4e7412', name: '2李丝丝', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg' },
        { id: '0c6cccd4a8b011ea828802fcdc4e7412', name: '3赵六六', Avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'},
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
