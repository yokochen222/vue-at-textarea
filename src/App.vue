<template>
  <div id="app">
    234324
  </div>
</template>

<script>
import VueAtTextarea from '../dist/vue-at-textarea'
export default {
  name: 'App',
  data() {
    return {
      content: '@2李丝丝 ',
      members: [
        { ID: 'fee4b6b2a8af11ea9afe02fcdc4e7412', Name: '1张晓晓', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1388647394,240988450&fm=111&gp=0.jpg'} ,
        { ID: '0781ea56a8b011eabbd302fcdc4e7412', Name: '2李丝丝', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg' },
        { ID: '0c6cccd4a8b011ea828802fcdc4e7412', Name: '3赵六六', Avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'},
        { ID: '12168698a8b011ea828802fcdc4e7412', Name: '4王五五', Avatar: 'https://img2.woyaogexing.com/2020/06/05/b6a5afafcaa0413d857a62f93d1dd60d!400x400.jpeg'},
        { ID: '193b195ca8b011ea80ae02fcdc4e7412', Name: '5张某某', Avatar: 'https://img2.woyaogexing.com/2020/06/04/753209d8759547269ef6b575b5ce189b!400x400.jpeg' },
        { ID: '200a18bea8b011eabbd302fcdc4e7412', Name: '6谢某某', Avatar: 'https://img2.woyaogexing.com/2020/06/04/3042d0ff08d94324a6b0c39e85fedecc!400x400.jpeg'}
      ]
    }
  },
  methods: {
    handleChange() {
      // console.log(e)
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
.chat-warp {
  width: 500px;
  margin: 0 auto;
  height: 200px;
  position: relative;
  border: 1px solid #ccc;
}
</style>
