const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
// const BASE_URL = process.env.NODE_ENV === 'production'
//   ? '/'
//   : '/'

module.exports = {
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000
      // 只给出 js 文件的性能提示
      // assetFilter: function (assetFilename) {
      //   return assetFilename.endsWith('.js')
      // }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: [
            resolve('src'),
            resolve('node_modules/tree-table-vue/lib'),
            resolve('node_modules/v-org-tree/dist'),
            resolve('node_modules/iview/src/locale')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  // baseUrl: BASE_URL,
  publicPath: '/',
  assetsDir: './static',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  //     .set('_c', resolve('src/components'))
  // },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写调用接口的基础路径，来解决跨域
  devServer: {
    port: 8081,
    proxy: { // 设置代理
      '/vhrServer': {
        target: 'http://127.0.0.1:8080/', // 访问后台地址
        changeOrigin: true
      }
      // '/login_auth': {
      //   target: 'http://132.232.90.44:9000/', // 访问后台地址
      //   changeOrigin: true
      // }
    }
  }
}
