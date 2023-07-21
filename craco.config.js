const path = require('path')
module.exports = {
    webpack: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    devServer: {
        proxy: {
            '/btcmeme': {
                // target: 'http://192.168.0.15:8888', // 测试服务器
                target: 'http://35.77.199.231:10888', // 测试服务器
                changeOrigin: true,
                pathRewrite: { '/btcmeme': '/btcmeme' }
            },
            '/ws': {
                target: 'ws://192.168.0.15:30601', // 测试服务器ws
                changeOrigin: true,
                pathRewrite: { '/ws': 'ws' }
            }
        }
    }
}
