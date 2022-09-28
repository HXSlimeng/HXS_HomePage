# 前言

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4cfb93daf6343d292770358a2f7d4e5~tplv-k3u1fbpfcp-watermark.image?)

近来，尤大发布了消息：Vue3 将在 `2022年2月7日` 成为新的 vue 默认版本，这可不得了了，以前都用着 vue2 的项目，现在突然要直接开发 vue3 肯定不靠谱，就花了点时间整了套 `vue3 的启动模板`；提前为小伙伴们踩了踩坑。
## 图的接口



### 1.执行图

地址：

```
"http://127.0.0.1:7654/run_graph"
```

把对应格式的图以json形式发送到后端即可：

python 的demo

```python
def run():
        url = "http://127.0.0.1:7654/run_graph"
        json_graph_file = "./json_graph_def_demo_distribute.json5"
        with open(json_graph_file,"r",encoding="utf-8") as f:
            json_graph = json.load(f)
        resp = requests.post(url,json=json_graph)
        print(resp.content.decode())

if __name__ == "__main__":
    run()
    
```



### 2.保存图

地址：

```
"http://127.0.0.1:7654/save_graph"
```

把对应格式的图以json形式发送到后端即可：



### 3.查询图



地址：

```
"http://127.0.0.1:7654/search_graph"
```

无参数，会将数据库中保存的图返回结果当中

返回结果：

```json
graph_save_result= {
    "models":
    [
        {"model_name":"2","model_id":"23","time_str":"202101231"},
        {"model_name":"2","model_id":"23","time_str":"202101231"},
        {"model_name":"2","model_id":"23","time_str":"202101231"}
    ],
    "sate_id":0,
    "save_state":"success",
    "failed_info":""
}
```



### 4. 编辑图



地址：

```
"http://127.0.0.1:7654/edit_graph"
```

参数：

```json
{
    "graph_name":"11",
    "graph_id":"sdasd",
    "time_str":"20211213120021"
}

```

会返回对应　前端 graph，写在　front_graph　字段中

```json
graph_save_result= {
            "front_graph":{},
            "sate_id":0,
            "failed_info":"",
            "save_state":"success",
        }
```
# 一级标题
## 二级标题
### 3.查询图



地址：

```
"http://127.0.0.1:7654/search_graph"
```

无参数，会将数据库中保存的图返回结果当中

返回结果：

```json
graph_save_result= {
    "models":
    [
        {"model_name":"2","model_id":"23","time_str":"202101231"},
        {"model_name":"2","model_id":"23","time_str":"202101231"},
        {"model_name":"2","model_id":"23","time_str":"202101231"}
    ],
    "sate_id":0,
    "save_state":"success",
    "failed_info":""
}
```
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题超级超级超级超级超级超级超级超级长
正文字体
*斜体文本*
**粗体文本**
***粗斜体文本***

~~BAIDU.COM~~
创建脚注格式类似这样 [^RUNOOB]。

[^RUNOOB]: 菜鸟教程 -- 学的不仅是技术，更是梦想！！！
- 第一项
* 第二项
+ 第三项
> 区块引用
> 菜鸟教程
> 学的不仅是技术更是梦想
链接也可以用变量来代替，文档末尾附带变量地址：
这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

  [1]: http://www.google.com/
  [runoob]: http://www.runoob.com/
![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png "RUNOOB")




