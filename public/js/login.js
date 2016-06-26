$(document).on('click','.btn',function(){
  var account = $('#account').val();
  var password = $('#password').val();
  if(account == ''){
    alert('请输入账号')
  }else if(password == ''){
    alert('请输入密码')
  }else{
    $.ajax({
      url:'/postLogin?account='+account+'&password='+password,
      type:'POST',
      success:function(res){
        if(res.length == 1){
          var id = res.data.id;
          sessionStorage.clear();
          sessionStorage.setItem('session',id)
          window.location.href = '/list'
        }else if(res.length == 0){
          alert('账号或密码输入错误')
        }
      }
    })
  }
})

$(document).on('keyup',function(){
  if(event.keyCode == 13){
    $('.btn').click();
  }
})