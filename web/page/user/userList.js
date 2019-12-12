layui.use(['form', 'layer', 'table', 'laytpl', 'jquery'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url: '/userList.action',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "userListTable",
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            {field: 'id', title: 'ID', width: 80, align: "center", style: 'display:none;'},
            {field: 'nickName', title: '用户名', minWidth: 100, align: "center"},
            {
                field: 'email', title: '用户邮箱', minWidth: 200, align: 'center', templet: function (d) {
                    return '<a class="layui-blue" href="mailto:' + d.email + '">' + d.email + '</a>';
                }
            },
            {field: 'sex', title: '用户性别', align: 'center'},
            {
                field: 'status', title: '用户状态', align: 'center', templet: function (d) {
                    return d.status == "0" ? "正常使用" : "限制使用";
                }
            },
            {templet: '<div>{{d.right.rightName}}</div>', title: '用户权限', width: 200, align: "center"},
            {field: 'userEndTime', title: '最后登录时间', align: 'center', minWidth: 150},
            {title: '操作', minWidth: 175, templet: '#userListBar', fixed: "right", align: "center"}
        ]]
    });
    // $('table.layui-table thead tr th:eq(1)').addClass('layui-hide');
    $('table.layui-table thead tr th:nth-child(2)').addClass('layui-hide');

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        var nickName = $("#nickName").val();
        var loginName = $("#searchloginName").val();
        if ($(".searchVal").val() != '') {
            table.reload("userListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                url: '/userList.action',

                where: {
                    nickname: $(".searchVal").val()  //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    //添加用户
    function addUser(edit) {
        var index = layui.layer.open({
            title: "添加用户",
            type: 2,
            content: "addUser.html",
            id: "testReload",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".loginName").val(edit.loginName);  //登录名
                    body.find(".right").val(edit.right);  //权限
                    body.find(".status").val(edit.status);    //用户状态
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".addNews_btn").click(function () {
        addUser();
    })

    //批量删除
    $(".delAll_btn").click(function () {
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
                    url: "/delete.action",
                    data: {"id": id},
                    success: function (flag) {
                        if (flag > 0) {
                            layer.msg("删除成功", {icon: 6});
                            layer.closeAll();
                            table.reload('userListTable', {});
                        } else {
                            layer.msg("删除失败", {icon: 6});
                        }
                    }
                })
            })
        }
    })

    //列表操作
    table.on('tool(userList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            //编辑用户
            layer.open({ //打开页面
                title: "编辑用户",
                type: 1,
                content: $('#updatepage').html(),
                area: ['700px', '400px'],
                closeBtn: 2,
                skin: 'layui-layer-rim', //加上边框
            })
            form.val('update-form', { //填充数据
                id: obj.data.id, //这里必须用input name属性
                loginName: obj.data.loginName,
                password: obj.data.password,
                rightId: obj.data.rightId,
                status: obj.data.status,
            })
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: "/delete.action",
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
            });
        }
    });
    form.on("submit(updateUser)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        $.post('/updateUserInfo.action', data.field, function (flag) {
            if (flag == 1) {
                layer.msg("修改成功", {icon: 6});
                layer.closeAll();//刷新父页面
                table.reload('userListTable', {});//修改后返回列表页面进行刷新
            } else {
                layer.msg("修改失败", {icon: 6});
            }
        })
        // return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        setTimeout(function () {
            top.layer.close(index);
            top.layer.msg("用户修改成功！");
            layer.closeAll("iframe");

            parent.location.reload();
        }, 2000);
        return false;
    })
})
