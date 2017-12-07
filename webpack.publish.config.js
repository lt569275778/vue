var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpack = require('webpack')

var CleanWebpackPlugin = require('clean-webpack-plugin')

var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    //entry:'./src/main.js', //打包的入口文件
    entry:{
        //属性名称代表你打包出来的最终的文件名称
        //值，代表你要打包的是哪个第三方包(名称看node_modules中)
        quanjiatong:['vue','vue-router','vuex'],
        vuePreview:['vue-preview'],
        vueResource:['vue-resource'],
        moment:['moment'],
        mintUI:['mint-ui'],
        axios:['axios'],
        jquery:['jquery'],
        bundle:path.join(__dirname,'src/main.js') //打包自己的业务逻辑代码，别忘记了
    },
    output: {
        path: path.join(__dirname,'dist'), //bundle.js放的目录
        //filename: 'bundle.js' //打包出来的文件名称
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, //第三方的不管
                loader: "babel-loader" 
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            {
                test: /\.css$/, 
                //loader 1.x use 2.x 现在webpack中loader的写法即兼容1.x 也兼容2.x
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(ttf)$/, 
                /*limit：
                    表示的是一个阀值,如果当前我们资源中的图片大小
                    4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js

                    name:打包出来的图片，放在那个文件夹下，用什么文件名称命名
                    [name]代表你原始的文件名称
                    [hash:5] 让浏览器支持图片的缓存
                    [ext] 图片本身的拓展名
                */
                loader: 'url-loader?limit=4000&name=fonts/[name]-[hash:5].[ext]'
            },
            {
                test: /\.(png|svg|gif)$/, 
                /*limit：
                    表示的是一个阀值,如果当前我们资源中的图片大小
                    4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js

                    name:打包出来的图片，放在那个文件夹下，用什么文件名称命名
                    [name]代表你原始的文件名称
                    [hash:5] 让浏览器支持图片的缓存
                    [ext] 图片本身的拓展名
                */
                loader: 'url-loader?limit=4000&name=images/[name]-[hash:5].[ext]'
            }
        ]
    },
    plugins:[
        //推荐放在所有插件的最前头
        new CleanWebpackPlugin("dist"),

        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html', //内存中生成的文件名称
            template: './template.html', //模版文件
            minify:{//压缩html中哪些东西
                collapseWhitespace:true,
                minifyCSS:true,
                minifyJS:true,
                removeComments:true
            }
        }),
        //压缩bundle.js代码
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' //加载xxx.min.js
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false //警告干掉
            },
            comments: false //去掉版权信息等注释
        }),
        //这个地方有个小注意点，不要把自己业务逻辑bundle放在这里，
        //这里只放第三方
        new webpack.optimize.CommonsChunkPlugin({name:["jquery","axios","mintUI","moment","vueResource","vuePreview","quanjiatong"],minChunks: Infinity}),

        //抽离css到一个单独的文件中去
        new ExtractTextPlugin("css/styles.css")
    ]
}