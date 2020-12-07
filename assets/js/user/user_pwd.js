layui.form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
        if (value === $('[name=oldPwd]').val()) {
            return '新密码与旧密码一样！'
        }
    },
    rePwd: function (value) {
        if (value !== $('[name=rePwd]').val()) {
            return '两次密码不一致！'
        }
    }
})
$('#form_pwd').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $('#form_pwd').serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            $('#resetbtn').click()
        }
    })
})