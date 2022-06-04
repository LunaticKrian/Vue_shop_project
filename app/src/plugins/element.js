import Vue from 'vue'

/* 导入指定的 element UI 元素标签 */
// import {Button} from 'element-ui'
// import {Form, FormItem} from 'element-ui'
// import {Input} from 'element-ui'
// // 导入消息提示弹框组件：
// import {Message} from 'element-ui'

// 合并导入element ui插件：
import {Button, Form, FormItem, Input, Message} from 'element-ui'

// 使用元素标签（全局注册）
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 全局挂载：
Vue.prototype.$message = Message
