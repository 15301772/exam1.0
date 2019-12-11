layui.use(['form','layer','table','laytpl','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url : '/userList.action',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 20,
        id : "userListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'id',title: 'ID', width: 80,align:"center",style:'display:none;'},
            {field: 'nickName', title: '用户名', minWidth:100, align:"center"},
            {field: 'email', title: '用户邮箱', minWidth:200, align:'center',templet:function(d){
                return '<a class="layui-blue" href="mailto:'+d.email+'">'+d.email+'</a>';
            }},
            {field: 'sex', title: '用户性别', align:'center'},
            {field: 'status', title: '用户状态',  align:'center',templet:function(d){
                return d.status == "0" ? "正常使用" : "限制使用";
            }},
            {templet:'<div>{{d.right.rightName}}</div>',title: '用户权限', width: 200,align:"center"},
            {field: 'userEndTime', title: '最后登录时间', align:'center',minWidth:150},
            {title: '操作', minWidth:175, templet:'#userListBar',fixed:"right",align:"center"}
        ]]
    });
    // $('table.layui-table thead tr th:eq(1)').addClass('layui-hide');
    $('table.layui-table thead tr th:nth-child(2)').addClass('layui-hide');

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        var nickName=$("#nickName").val();
        var loginName=$("#searchloginName").val();
        if($(".searchVal").val() != ''){
            table.reload("userListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                url: '/userList.action',

                where: {
                    nickname: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加用户
    function addUser(edit){
        var index = layui.layer.open({
            title : "添加用户",
            type : 2,
            content : "addUser.html",
            id: "testReload",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".nickName").val(edit.nickName);  //昵称
                    body.find(".loginName").val(edit.loginName);  //登录名
                    body.find(".email").val(edit.email);  //邮箱
                    body.find(".sex input[value="+edit.sex+"]").prop("checked","checked");  //性别
                    body.find(".right").val(edit.right);  //权限
                    body.find(".status").val(edit.status);    //用户状态
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }
    $(".addNews_btn").click(function(){
        addUser();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var data = checkStatus.data,
            id = "";
        if (data.length > 0) {
            for (var i in data) {
                id += data[i].id + ","
                layer.msg(user_ids);
            }
            console.log(id);
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: "delete.action",
                    data: {"id": id},
                    success: function (flag) {
                        if (flag > 0) {
                            layer.msg("删除成功", {icon: 6});
                            layer.closeAll();
                            table.reload('testReload', {});
                        } else {
                            layer.msg("删除失败", {icon: 6});
                        }
                    }
                })
            })
        }
        // var checkStatus = table.checkStatus('userListTable'),
        //     data = checkStatus.data,
        //     id = [];
        // if(data.length > 0) {
        //     for (var i in data) {
        //         id.push(data[i].id);
        //     }
        //     layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
        //         $.get("delete.action",{
        //             id : id  //将需要删除的newsId作为参数传入
        //         },function(data){
        //         tableIns.reload();
        //         layer.close(index);
        //         })
        //     })
        // }else{
        //     layer.msg("请选择需要删除的用户");
        // }
    })

    //列表操作
    table.on('tool(userList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            //编辑用户
                var index = layui.layer.open({
                    title : "编辑用户",
                    type : 2,
                    content : "userInfo.html",
                    success : function(layero, index){
                        var body = layui.layer.getChildFrame('body', index);
                        if(edit){
                            body.find(".nickName").val(window.sessionStorage.getItem("user").nickName);  //昵称
                            body.find(".loginName").val(edit.loginName);  //登录名
                            body.find(".email").val(edit.email);  //邮箱
                            body.find(".sex input[value="+edit.sex+"]").prop("checked","checked");  //性别
                            body.find(".right").val(edit.right);  //权限
                            body.find(".status").val(edit.status);    //用户状态
                            form.render();
                        }
                        setTimeout(function(){
                            layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                                tips: 3
                            });
                        },500)
                    }
                })
                layui.layer.full(index);
                window.sessionStorage.setItem("index",index);
                //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
                $(window).on("resize",function(){
                    layui.layer.full(window.sessionStorage.getItem("index"));
                })
        // }else if(layEvent === 'usable'){ //启用禁用
        //     var _this = $(this),
        //         usableText = "是否确定禁用此用户？",
        //         btnText = "已禁用";
        //     if(_this.text()=="已禁用"){
        //         usableText = "是否确定启用此用户？",
        //         btnText = "已启用";
        //     }
        //     layer.confirm(usableText,{
        //         icon: 3,
        //         title:'系统提示',
        //         cancel : function(index){
        //             layer.close(index);
        //         }
        //     },function(index){
        //         _this.text(btnText);
        //         layer.close(index);
        //     },function(index){
        //         layer.close(index);
        //     });
        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
                $.ajax({
                    url: "delete.action",
                    data: {"id": data.id},
                    success: function (flag) {
                        if (flag == 1) {
                            layer.msg("删除成功", {icon: 6});
                            layer.closeAll();
                            table.reload('userListTable', {});
                        } else {
                            layer.msg("删除失败", {icon: 6});
                        }
                    }
                })
                // $.get("delete.action",{
                //     id : data.id  //将需要删除的newsId作为参数传入
                // },function(data){
                //     tableIns.reload();
                //     layer.close(index);
                // })
            });
        }
    });

})
