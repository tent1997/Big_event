$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    let q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    $('#form_select').on('submit',function(e) {
        e.preventDefault()
        let id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = id
        q.state = state
        // console.log(q);
        initList()
    })
    function init_cate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success: function(res) {
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cates',res)
                console.log(htmlStr);
                $('[name=cate_id ]').html(htmlStr)
                form.render()
            }
        })
    }
    init_cate()
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      }
      // 定义补零的函数
      function padZero(n) {
        return n > 9 ? n : '0' + n
      }
    initList()
    function initList() {
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success: function(res) {
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl',res)
                $('tbody').html(htmlStr)
                render(res.total)
            }
        })
    }
    function render(total) {
            //执行一个laypage实例
            laypage.render({
              elem: 'laypage' //注意，这里的 test1 是 ID，不用加 # 号
              ,count: 50//数据总数，从服务端得到
              ,limit: q.pagesize
              ,count: total
              ,curr: q.pagenum
              ,limits: [2,3,5,10]
              ,layout: ['count','limit','prev', 'page', 'next','skip']
              ,jump : function(obj,first) {
                //   console.log(obj);
                  q.pagenum = obj.curr
                  q.pagesize = obj.limit
                if (!first) {
                    initList()
                }
              }
            });
    }
     $('tbody').on('click','.deletedBtn',function() {
         var id = $(this).attr('data-id')
         var len = $('.deletedBtn').length
         layer.confirm('确定要删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success: function(res) {
                    if (res.status!==0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if (len===1) {
                        q.pagenum = q.pagenum=1? 1:q.pagenum -=1
                    }
                    initList()
                }
            })
            layer.close(index);
          });
     }) 
     $('tbody').on('click','.editBtn',function() {
         var id = $(this).attr('data-id')
         location.href='/assets/article/art_edit.html?'+id
     })
})