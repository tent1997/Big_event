 var id = location.search.split('?')[1]
 var layer = layui.layer
 var form = layui.form
 initcate()
 initEditor()

 function initcate() {
     $.ajax({
         method: 'GET',
         url: '/my/article/cates',
         success: function (res) {
             if (res.status !== 0) {
                 return layer.msg(res.message)
             }
             var htmlStr = template('cates', res)
             $('[name=cate_id]').html(htmlStr)
             form.render()
             init()
         }
     })
 }

 function init() {
     $.ajax({
         method: 'GET',
         url: '/my/article/' + id,
         success: function (res) {
             if (res.status !== 0) {
                 return
             }
             console.log(res.data.content);
             form.val('edit', res.data)
             initEditor()
             var $image = $('#image')
             $image.attr('src',res.data.cover_img)
             var cropperOption = {
                aspectRatio: 400 / 280,
                preview: '.img-preview',
                // 初始化图片裁剪框的大小
                autoCropArea: 1
              }
              // 初始化裁剪区域
              $image.cropper(cropperOption)
         }
     })

 }
 // 1. 初始化图片裁剪器
 var $image = $('#image')

 // 2. 裁剪选项
 var options = {
     aspectRatio: 400 / 280,
     preview: '.img-preview'
 }

 // 3. 初始化裁剪区域
 $image.cropper(options)
 $('#photo').click(function () {
     $('#file').click()
 })
 $('#file').change(function (e) {
     var files = e.target.files
     if (files.length === 0) {
         return
     }
     var imgURL = URL.createObjectURL(files[0])
     $image
         .cropper('destroy') // 销毁旧的裁剪区域
         .attr('src', imgURL) // 重新设置图片路径
         .cropper(options) // 重新初始化裁剪区域
 })
 var state = '已发布'
 $('#btnSave2').on('click', function () {
     state = '草稿'
 })
 $('#form_add').on('submit', function (e) {
     e.preventDefault()
     var fd = new FormData($(this)[0])
     console.log(fd);
     fd.append('state', state)
     $image
         .cropper('getCroppedCanvas', {
             // 创建一个 Canvas 画布
             width: 400,
             height: 280
         })
         .toBlob(function (blob) {
             // 将 Canvas 画布上的内容，转化为文件对象
             // 得到文件对象后，进行后续的操作
             // 5. 将文件对象，存储到 fd 中
             fd.append('cover_img', blob)
             publishArticle(fd)
             // 6. 发起 ajax 数据请求
         })
 })

 function publishArticle(fd) {
     $.ajax({
         method: 'POST',
         url: '/my/article/add',
         data: fd,
         contentType: false,
         processData: false,
         success: function (res) {
             //  if (res.status!== 0) {
             //      return layer.msg(res.message)
             //  }
             layer.msg(res.message)
             // window.parent.$('#art_list').click()
             location.href = '/assets/article/art_list.html'
         }
     })
 }