var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/main.js', //打包的入口文件
    output: {
        path: __dirname, //bundle.js放的目录
        filename: 'bundle.js' //打包出来的文件名称
    },
    module: {
        loaders: [
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|png|svg|gif)$/, 
                loader: 'url-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html', //内存中生成的文件名称
            template: './template.html' //模版文件
        })
    ]
}