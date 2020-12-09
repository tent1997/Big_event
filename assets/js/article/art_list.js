$(function(){
    var layer = layui.layer
    let q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
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
            }
        })
    }
})