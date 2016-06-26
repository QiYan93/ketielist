$.getDetaile = function(){
  
  var href= window.location.href
  var h = href.search(/=/)
  var query = href.substring(h+1,href.length)
  $.ajax({
    url:'/postDetaile?id='+query,
    type:'POST',
    success:function(res){
      if(res.success){
        $('.panel-title').text(res.name)
        $('.panel-body').html(res.content)
      }
    }
  })
}
$.getDetaile()