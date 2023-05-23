import { createRoot } from 'react-dom/client'
import Message from '@/components/message/snackbar.js'

const message = {
    dom: null,
    success() {
        this.createRootMessage({ ...arguments[0], types: 'success' })
    },
    error() {
        this.createRootMessage({ ...arguments[0], types: 'error' })
    },
    warning() {
        this.createRootMessage({ ...arguments[0], types: 'warning' })
    },
    info() {
        this.createRootMessage({ ...arguments[0], types: 'info' })
    },
    createRootMessage({
        content = 'content',
        duration = 2500,
        iconShow = true,
        types = 'success'
    }) {
        // 创建一个dom
        this.dom = document.createElement('div')
        // 定义组件，
        const JSXdom = (
            <Message
                content={content}
                duration={duration}
                type={types}
                iconShow={iconShow}></Message>
        )
        // 渲染DOM
        createRoot(this.dom).render(JSXdom)
        // 置入到body节点下
        document.body.appendChild(this.dom)
    }
}

export default message
