# vue-at-textarea

> vue at textarea 使用textarea输入框实现@功能


# 截图示例
![screenshort](https://github.com/yokochen222/vue-at-textarea/blob/master/screenshots/1.png?raw=**true**)
![screenshort](https://github.com/yokochen222/vue-at-textarea/blob/master/screenshots/2.png?raw=**true**)
# 使用

### 全局引入
```javascript

// main.js
import VueAtTextarea from 'vue-at-textarea'
Vue.use(VueAtTextarea)

<template>
  <div class="chat-footer">
    <vue-at-textarea
      v-model="content"
      @change="handleChange"
      :members="members"
    />
  </div>
</template>

export default {
  data() {
    return {
      members:[
        { ID: 'fee4b6b2a8af11ea9afe02fcdc4e7412', Name: '1张晓晓', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1388647394,240988450&fm=111&gp=0.jpg'} ,
        { ID: '0781ea56a8b011eabbd302fcdc4e7412', Name: '2李丝丝', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg' },
        { ID: '0c6cccd4a8b011ea828802fcdc4e7412', Name: '3赵六六', Avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'},
        { ID: '12168698a8b011ea828802fcdc4e7412', Name: '4王五五', Avatar: 'https://pic2.zhimg.com/80/v2-d811c2f232e21afdbc1b40dd06125eda_720w.jpg'},
        { ID: '193b195ca8b011ea80ae02fcdc4e7412', Name: '5张某某', Avatar: 'https://pic2.zhimg.com/80/v2-c5b825d73516d48e0a5881369323df17_720w.jpg' },
        { ID: '200a18bea8b011eabbd302fcdc4e7412', Name: '6谢某某', Avatar: 'https://pic3.zhimg.com/80/v2-9df5ed7586c34d90f181d5daed4a84e7_720w.jpg'}
      ],
      content: ''
    }
  },
  methods: {
    handleChange(data) {
      console.log(data)
    }
  }
}
```


### 局部引入
```html
<script>
import { VueAtTextarea } from 'vue-at-textarea'
export default {
  components: {
    VueAtTextarea
  },
  data() {
    return {
      members:[
        { ID: 'fee4b6b2a8af11ea9afe02fcdc4e7412', Name: '1张晓晓', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1388647394,240988450&fm=111&gp=0.jpg'} ,
        { ID: '0781ea56a8b011eabbd302fcdc4e7412', Name: '2李丝丝', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg' },
        { ID: '0c6cccd4a8b011ea828802fcdc4e7412', Name: '3赵六六', Avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'},
        { ID: '12168698a8b011ea828802fcdc4e7412', Name: '4王五五', Avatar: 'https://pic2.zhimg.com/80/v2-d811c2f232e21afdbc1b40dd06125eda_720w.jpg'},
        { ID: '193b195ca8b011ea80ae02fcdc4e7412', Name: '5张某某', Avatar: 'https://pic2.zhimg.com/80/v2-c5b825d73516d48e0a5881369323df17_720w.jpg' },
        { ID: '200a18bea8b011eabbd302fcdc4e7412', Name: '6谢某某', Avatar: 'https://pic3.zhimg.com/80/v2-9df5ed7586c34d90f181d5daed4a84e7_720w.jpg'}
      ],
      content: ''
    }
  },
  methods: {
    handleChange(data) {
      console.log(data)
    }
  }
}
</script>

<template>
  <div class="chat-footer">
    <vue-at-textarea
      v-model="content"
      @change="handleChange"
      :members="members"
    />
  </div>
</template>
```

### ssr局部引入
```javascript
<template>
  <div class="chat-footer">
    <client-only>
      <vue-at-textarea
        v-model="content"
        @change="handleChange"
        :members="members"
      />
    </client-only>
  </div>
</template>
<script>
export default {
  components: (() => {
    if (process.client) {
      const { VueAtTextarea } = require('vue-at-textarea')
      return {
        VueAtTextarea
      }
    }
    return {}
  })(),
  data() {
    return {
      members:[
        { ID: 'fee4b6b2a8af11ea9afe02fcdc4e7412', Name: '1张晓晓', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1388647394,240988450&fm=111&gp=0.jpg'} ,
        { ID: '0781ea56a8b011eabbd302fcdc4e7412', Name: '2李丝丝', Avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg' },
        { ID: '0c6cccd4a8b011ea828802fcdc4e7412', Name: '3赵六六', Avatar: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=183326193,1784969774&fm=26&gp=0.jpg'},
        { ID: '12168698a8b011ea828802fcdc4e7412', Name: '4王五五', Avatar: 'https://pic2.zhimg.com/80/v2-d811c2f232e21afdbc1b40dd06125eda_720w.jpg'},
        { ID: '193b195ca8b011ea80ae02fcdc4e7412', Name: '5张某某', Avatar: 'https://pic2.zhimg.com/80/v2-c5b825d73516d48e0a5881369323df17_720w.jpg' },
        { ID: '200a18bea8b011eabbd302fcdc4e7412', Name: '6谢某某', Avatar: 'https://pic3.zhimg.com/80/v2-9df5ed7586c34d90f181d5daed4a84e7_720w.jpg'}
      ],
      content: ''
    }
  },
  methods: {
    handleChange(data) {
      console.log(data)
    }
  }
}
</script>
```