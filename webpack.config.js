const path = require('path')
// 启用热更新的第二步
const webpack = require('webpack')
const VueLoadePlugin = require('vue-loader/lib/plugin')
// 导入在内存中生成 HTML 页面的插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 这个配置文件，起始就是一个JS文件，通过Node中的模块操作，导出一个配置对象
module.exports = {
  // 需要指定出口和入口文件
  entry: path.join(__dirname, './src/main.js'), //入口，表示，要使用webpack 打包那个文件
  output: {//输出文件相关的配置
    path: path.join(__dirname, './dist'), // 指定打包好的文件，输出到哪个目录中去
    filename: 'bundle.js' // 指定输出的文件的名称
  },
  devServer: { // 这是配置dev-server 命令参数的第二种形式，相对来说这种方式麻烦一些
    open: true, //自动打开浏览器
    port: 3000, //设置启动时候的运行端口
    contentBase: 'src', //指定托管的根目录
    hot: true //启用热更新 的第一步
  },
  plugins:[ // 配置插件节点
    new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象 这是启用热更新的模块对象
    new htmlWebpackPlugin({  // 创建一个存中 生成一个 html页面的插件
        template: path.join(__dirname, './src/index.html'), //指定 模板页面，将来会根据指定的页面路径，去生成内存中的
        filename: 'index.html' //指定生成的页面的名称
    }),
    new VueLoadePlugin(),
  ],
  module: { // 这个节点，用于配置 所有第三方模块 加载器
    rules: [  //所有第三方模块的匹配规则
        { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 这是配置处理.css文件的第三方loader规则
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //这是配置处理.less 文件的第三方loader规则
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //这是配置处理.scss 文件的第三方loader规则
        { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?=7631&name=[hash:8]-[name].[ext]' }, // 处理图片路径的loader
        { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //这是配置babel 来转换高级的ES语法
        { test: /\.vue$/, use: 'vue-loader' }, // 这是配置.vue文件的第三方loader
      ]
  },
  resolve: {
    // alias: {  // 修改 Vue被导入时候的包的路径
    //   "vue$": "vue/dist/vue.js"
    // }
  }
}
