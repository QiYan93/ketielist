$.getList = function(){
  var userId = sessionStorage.getItem('session');
  $.ajax({
    url:'/list?userId='+userId,
    type:'POST',
    success:function(res){
      var data = res.data;
      var html = '';
      for(var i=0;i<data.length;i++){
        var index = i+1
        html += '<tr data-id="'+data[i]._id+'">'+
                '<td>'+index+'</td>'+
                '<td><a href="/detaile?id='+data[i]._id+'">'+data[i].name+'</a></td>'+
                '<td>'+data[i].dateTime+'</td>'+
                '<td><button class="btn btn-sm btn-danger edit">修改</button> <button class="btn btn-sm btn-danger remove">删除</button></td>'
                '</tr>'
      }
      $('tbody').empty();
      $('tbody').append(html);
    }
  })
}
//新增编辑
$(document).on('click','#addDocument',function(){
  window.location.href = 'document';
})
//修改
$(document).on('click','.edit',function(){
  var id = $(this).parents('tr').attr('data-id');
  window.location.href = 'edit?id='+id;
})
//删除
$(document).on('click','.remove',function(){
  var id = $(this).parents('tr').attr('data-id');
  if(confirm('确认删除？')){
    $.ajax({
      url:'/remove?id='+id,
      type:'POST',
      success:function(res){
        if(res.success){
          $.getList();
        }
      }
    })
  }
})
$.getList();