console.log('你若安好，便是晴天')
const a = 10
/* 当前的模块对象:存储了当前模块的信息 */
console.log(module)
/* 
{
  id: '.',
  path: 'D:\\Documents\\WebGIS\\New Zondy - 2405\\00_Mine\\day26',
  exports: {},
  filename: 'D:\\Documents\\WebGIS\\New Zondy - 2405\\00_Mine\\day26\\06-模块间共享-自定义模块-module对象.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\Documents\\WebGIS\\New Zondy - 2405\\00_Mine\\day26\\node_modules',
    'D:\\Documents\\WebGIS\\New Zondy - 2405\\00_Mine\\node_modules',
    'D:\\Documents\\WebGIS\\New Zondy - 2405\\node_modules',
    'D:\\Documents\\WebGIS\\node_modules',
    'D:\\Documents\\node_modules',
    'D:\\node_modules'
  ]
}

发现里面有一个属性exports，就是用来导出当前模块中定义的变量和方法的
现在是空对象，说明没有任何导出
*/
