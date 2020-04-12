'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title
module.exports = {
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV === 'development',
    // webpack配置
    chainWebpack(config) {

        config.module
          .rule('js')
          .exclude.add(/\.worker\.js$/)
          .end()
        config.module
          .rule('worker')
          .test(/\.worker\.js$/)
          .use('worker-loader')
          .loader('worker-loader')
          .end()

        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
              symbolId: 'icon-[name]'
          })
          .end()

        // set preserveWhitespace
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
              options.compilerOptions.preserveWhitespace = true
              return options
          })
          .end()
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
          resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src')
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        //配置自动启动浏览器
        overlay: {
            warnings: false,
            errors: true
        },
        host: 'localhost',
        port: 8082,                                 // 端口号
        https: false,
        hotOnly: false,
        before(app){
            app.get('/user/info',(req, res)=>{
                res.json({data: {roles: ['admin']}})
            })
        }
        // https:{type:Boolean}
        // proxy: {                                        // 配置跨域
        //     '/api':{
        //         target: 'http://localhost:8082/api/', //源地址
        //         changeOrigin:true,                  //改变源
        //         ws:true,                            //是否代理websockets
        //         pathRewrite:{
        //             '^/api': '/api'
        //         }
        //     }
        // },                                           // 配置跨域处理,只有一个代理
    },
    // 第三方插件配置
    pluginOptions: {}
}
