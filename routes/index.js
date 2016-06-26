var express = require('express');
var mongoose = require('mongoose')
var models = require('../models/models')
var User = models.User;
var Content = models.Content;

//登录页面
exports.login = function(req, res, next) {
  res.render('login',{title:'登录'})
}
//登录
exports.postLogin = function(req, res, next) {
  var account = req.query.account;
  var password = req.query.password;
  var data = {
    account:account,
    password:password
  }
  User.find(data,function(err,docs){
    var h = docs.length;
    if(h == 1){
      res.json({
        success:true,
        length:h,
        data:{
          id:docs[0]._id
        }
      })
    }else{
      res.json({
        success:false,
        length:h
      })
    }
  })
}
//列表页面
exports.list = function(req,res,next){
  res.render('list',{title:'列表'})
}
//获取列表内容
exports.postList = function(req,res,next){
  var userId = req.query.userId;
  Content.find({userId:userId},function(err,docs){
    res.json({success:true,data:docs})
  })
}
//编辑器页面
exports.document = function(req, res, next) {
  res.render('document',{title:'编辑'})
}
//保存编辑内容
exports.postDocument = function(req,res,next){
  var userId = req.body.userId;
  var name = req.body.name;
  var content = req.body.content;
  var dateTime = req.body.dateTime;
  var content = new Content({
    userId:userId,
    name:name,
    content:content,
    dateTime:dateTime
  })
  content.save();
  res.json({success:true})
}
//删除
exports.remove = function(req,res,next){
  var id = req.query.id;
  Content.remove({_id:id},function(err,docs){
    res.json({success:true})
  })
}
//详细内容
exports.detaile = function(req,res,next){
    res.render('detaile')
}
exports.postDetaile = function(req,res,next){
  var id = req.query.id;
  Content.find({_id:id},function(err,docs){
    res.json({success:true,name:docs[0].name,content:docs[0].content})
  }) 
}
//修改
exports.edit = function(req,res,next){
  res.render('edit')
}
exports.postEdit = function(req,res,next){
  var userId = req.body.userId;
  var id = req.body.id;
  var name = req.body.name;
  var content = req.body.content;
  var dateTime = req.body.dateTime;
  Content.findOne({_id:id},function(err,docs){
        docs.name = name;
        docs.content = content;
        docs.dateTime = dateTime;
        docs.save();
    });
  res.json({success:true})
}