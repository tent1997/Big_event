$(function () {
    getUserInfo()
    $('#loginout').click(function () {
        var layer = layui.layer
        console.log(layer);
        layer.confirm('确定要退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // $('.text-avatar')[0].show()  
    // $('.layui-nav-img').hide()
    var uname = user.nickname || user.username
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
        $('.text-avatar').html(uname[0].toUpperCase())
    }
    $('.first').html('欢迎&nbsp;&nbsp;' + uname)
}