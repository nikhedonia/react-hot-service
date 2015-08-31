import extend  from 'extend'
import hot     from 'webpack-hot-middleware'
import dev     from 'webpack-dev-middleware'
import webpack from 'webpack'
import glob    from 'glob'
import path    from 'path'

export function reactHotService(devConf,assets,opt={noInfo:true,log:console.log,timeout:2000,reload:false,overlay:false}){

  const files = glob.sync(assets);

  const queryOpt ={timeout:opt.timeout,reload:opt.reload,overlay:opt.overlay};
  const query = Object.keys(queryOpt).map(k=>k+'='+opt[k]).join('&');
  const assetsRoute = (file)=>['webpack-hot-middleware/client?'+query,file];
  devConf.entry = files.map(f=>({[path.basename(f)]:assetsRoute(path.resolve(f))}))
                       .reduce((a,b)=>extend(a,b),{});

  let compiler = webpack(devConf);
  return (app)=>{
    app.use(dev(compiler,{publicPath:devConf.output.publicPath}));
    app.use(hot(compiler,opt));
  };

}
