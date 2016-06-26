//实例化编辑器
var um = UM.getEditor('myEditor');
um.addListener('blur',function(){
$('#focush2').html('编辑器失去焦点了')
});
um.addListener('focus',function(){
$('#focush2').html('')
});
//按钮的操作
function insertHtml() {
var value = prompt('插入html代码', '');
um.execCommand('insertHtml', value)
}
function isFocus(){
alert(um.isFocus())
}
function doBlur(){
um.blur()
}
function createEditor() {
enableBtn();
um = UM.getEditor('myEditor');
}
function getAllHtml() {
alert(UM.getEditor('myEditor').getAllHtml())
}
function getContent() {
var arr = [];
arr.push(UM.getEditor('myEditor').getContent());
return arr.join("\n");
}
function getPlainTxt() {
var arr = [];
arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
arr.push("内容为：");
arr.push(UM.getEditor('myEditor').getPlainTxt());
alert(arr.join('\n'))
}
function setContent(isAppendTo) {
var arr = [];
UM.getEditor('myEditor').setContent('', isAppendTo);
}
function setDisabled() {
UM.getEditor('myEditor').setDisabled('fullscreen');
disableBtn("enable");
}

function setEnabled() {
UM.getEditor('myEditor').setEnabled();
enableBtn();
}

function getText() {
//当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
var range = UM.getEditor('myEditor').selection.getRange();
range.select();
var txt = UM.getEditor('myEditor').selection.getText();
alert(txt)
}

function getContentTxt() {
var arr = [];
arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
arr.push("编辑器的纯文本内容为：");
arr.push(UM.getEditor('myEditor').getContentTxt());
alert(arr.join("\n"));
}
function hasContent() {
var arr = [];
arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
arr.push("判断结果为：");
arr.push(UM.getEditor('myEditor').hasContents());
alert(arr.join("\n"));
}
function setFocus() {
UM.getEditor('myEditor').focus();
}
function deleteEditor() {
disableBtn();
UM.getEditor('myEditor').destroy();
}
function disableBtn(str) {
var div = document.getElementById('btns');
var btns = domUtils.getElementsByTagName(div, "button");
for (var i = 0, btn; btn = btns[i++];) {
    if (btn.id == str) {
        domUtils.removeAttributes(btn, ["disabled"]);
    } else {
        btn.setAttribute("disabled", "true");
    }
}
}
function enableBtn() {
var div = document.getElementById('btns');
var btns = domUtils.getElementsByTagName(div, "button");
for (var i = 0, btn; btn = btns[i++];) {
    domUtils.removeAttributes(btn, ["disabled"]);
}
}
function timeChange(date){
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if(minute < 10){
        minute = '0' + minute
    }
    if(hour < 10){
        hour = '0' + hour
    }
    var time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    return time
}

var href= window.location.href
var h = href.search(/=/)
var query = href.substring(h+1,href.length)

$.save = function(){
    var userId = sessionStorage.getItem('session');
    var name = $('#name').val();
    var content = getContent();
    var dateTime = new Date();
        dateTime = timeChange(dateTime);
    if(name == ''){
        alert('请输入名称')
    }else{
        $.ajax({
            url:'/postEdit',
            type:'POST',
            data:{
                userId:userId,
                id:query,
                name:name,
                content:content,
                dateTime:dateTime
            },
            success:function(res){
                if(res.success){
                    window.location.href = 'list'
                }
            }
        })
    }
}
$(document).on('click','#save',function(){
    $.save();
})
$.getEdit = function(){
  $.ajax({
    url:'/postDetaile?id='+query,
    type:'POST',
    success:function(res){
      $('#name').val(res.name);
      var isAppendTo = res.content;
      console.log(isAppendTo)
      UM.getEditor('myEditor').setContent(isAppendTo);
    }
  })
}
$.getEdit();