## 省市区三级联动讲解

### 步骤

1. 发送异步请求获取所有的省市区数据
2. 将所有的省份信息填充到省份对于的ul容器,同理城市和地区的填充方式也是一样   可以封装
3. 对选择框中的title区域添加点击事件,点击的时候展开当前选择框,其他选择框隐藏  --重复操作
4. 对展开的下拉选择框中的li添加点击事件     --重复操作
   1. 设置样式					   --重复操作
   2. 设置title中的文本               --重复操作
   3. 更新第二个选择框中的数据源  --每一个选择框都要给右边设置不同的数据源 --单独设置
   4. 收起当前的选择框				--重复操作