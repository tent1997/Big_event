$(function () {
  // $('#image').prop('src', localStorage.getItem('avatar'))
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      $image.attr('src', res.user_pic)
    }
  })
})
var $image = $('#image')
var layer = layui.layer
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('#updata').click(function () {
  $('#file').click()
})
// var avatarURL = $('#image').attr('src')
$('#file').change(function (e) {
  // console.log(e);
  // 获取选择图片的详细信息 log(e) 找一下files
  var files = e.target.files
  if (files.length == 0) {
    return layui.layer.msg('请选择图片！')
  }
  // 利用URL创建一个url地址 URL.createObjectURL(文件的名字.jpg之类的)
  var avatarURL = URL.createObjectURL(files[0])
  console.log(avatarURL);
  // $('#image').cropper('destroy').attr('src', avatarURL).cropper(options)
  // localStorage.setItem('avatar',avatarURL)
})

$('#sure').click(function () {
  var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      window.parent.getUserInfo()
    }
  })
})
