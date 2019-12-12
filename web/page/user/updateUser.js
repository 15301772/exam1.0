layui.use(['form', 'layer'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

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

    //格式化时间
    function filterTime(val) {
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    }

    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear() + '-' + filterTime(time.getMonth() + 1) + '-' + filterTime(time.getDate()) + ' ' + filterTime(time.getHours()) + ':' + filterTime(time.getMinutes()) + ':' + filterTime(time.getSeconds());

})