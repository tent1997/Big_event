$(function () {
    $('#regbtn').click(function (e) {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#loginbtn').click(function (e) {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $('#reg-form [name=password]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    $('#reg-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#uname').val(),
                password: $('#pwd').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#loginbtn').click()
            }
        })
    })
    $('#login-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('#loguname').val(),
                password: $('#logpwd').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                // location.href = '/index.html'
                location.href = '/index.html'
            }
        })
    })
})