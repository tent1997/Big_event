$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let index = null
    $('#addList').click(function() {
        index = layer.open({
            type:1,
            title: '添加文章分类',
            content: $('#form_add').html(),
            area: ['500px', '250px']
          });         
    })
    $('body').on('submit','#form_add',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res) {
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initCate()
                layer.close(index)
            }
        })
    })
    $('tbody').on('click','.deletedBtn',function() {
        let id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success: function(res) {
                if (res.status!==0)  {
                    return layer.msg(res.message)
                }
                initCate()
                layer.msg(res.message)
            }
        })
    })
    $('tbody').on('click','.editBtn',function() {
        let id = $(this).attr('data-id')
        index = layer.open({
            type:1,
            title: '修改文章分类',
            content: $('#form_edit').html(),
            area: ['500px', '250px']
          }); 
          $.ajax({
              method:'GET',
              url:'/my/article/cates/'+id,
              success: function(res) {
                  form.val('form_edit',res.data)
              }
          })  
    })
    $('body').on('submit','#form_edit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success: function(res) {
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                initCate()
                layer.msg(res.message)
                layer.close(index)
            }
        })
    })
})