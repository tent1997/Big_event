$(function() {
var form = layui.form
var layer = layui.layer
form.verify({
    nickname: function(value) {
        if (value.length>6) {
            return '昵称长度必须在1~6个字符之间'
        }
    }
})
initInfo()
function initInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            console.log(res.data);
            form.val('form_userinfo',res.data)
        }
    })
}
$('#resetbtn').click(function(e) {
    e.preventDefault()
    initInfo()
})
$('#form_userInfo').submit(function(e) {
    e.preventDefault()
    // preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layer.msg(res.message)
            // console.log(window.parent);
            window.parent.getUserInfo()
        }
    })
})
})
