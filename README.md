# react-hot-service
middleware-injector which enables your expressServer to hotswap ES6+ empowered react-components

## usage

add this service to your express app to enable react-hot-module-reloading


```js

import {reactHotService} from 'react-hot-service'
const loaders = {/*...*/};

const webpackConf = {
  "context": __dirname,
  "devtool": "source-map",
  //no entry needed, it will be handled automatically
  output:{
    filename:'[name]',
    path:path(__dirname,'src'), // path to original file
    publicPath:'/assets/', // path relative to localhost
  },
  target:'web',
  module: {loaders},
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), //required
    new webpack.NoErrorsPlugin()
  ]
}
//...
let app = express();

reactHotService(
  webpackConf,
  '/assets/**',{
    noInfo  : true, //no-verbose logging
    timeout : 2000, // heartbeat of the websocket connection
    log     : ::console.log, //logging service
  }
)(app);


app.use(express.static(path));
//... your express app

```
