/**
 * 编写接口
 */
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const crypto = require('crypto');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');  // 使用jwt签名

// router.use(expressJwt({secret: "secret"}).unless({path: ["/api/login"]}));
// router.use(function (err, req, res, next) {
//   console.log(err, req, res, next);
//   if (err.name === "UnauthorizedError") {
//     res.status(200).send({errorCode: 6, restbody: "token过期"});
//   }
// });

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// 获取轮播图列表接口 页面调试完成
router.get('/api/slider', (req, res) => {
  models.Slider.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({status: 'OK', data: data});
    }
  });
});

// 获取公告内容列表  ok
router.get('/api/notice', (req, res) => {
  models.Notice.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({status: 'OK', data: data});
    }
  });
});

// 根据type查询内容列表
router.get('/api/notice/:type', (req, res) => {
  return models.Notice.find({notice_type: req.params.type}, (err, notice) => {
    if (err) {
      res.send(err);
    } else {
      res.send({success: true, data: notice});
    }
  });
});

// 获取专业分类列表 ok  页面调试完成
router.get('/api/profession', (req, res) => {
  return models.Profession.find()
    .populate('questions')
    .exec((err, doc) => {
      if (err) return next(err);
      console.log(doc);
      if (!doc) {
        res.statusCode = 404;
        return res.send({msg: '未找到该列表'});
      } else {
        res.send({status: 'OK', data: doc});
      }
    });
});

// 获取问题列表 ok  页面调试完成
router.get('/api/question', (req, res) => {
  models.Question.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({status: 'OK', data: data});
    }
  });
});

// 根据专业类型获取问题列表 ok 页面调试完成
router.get('/api/question/:professionId', (req, res) => {
  return models.Question.find({profession_id: req.params.professionId}, (err, doc) => {
    if (err) return res.send(err);
    res.send({status: 'OK', data: doc});
    // }
  });
});

// 编辑学生录取信息 ok
router.post('/api/modifyStudent', (req, res) => {
  let isAdmitted = req.body.isAdmitted;
  let id = req.body.id;
  if (!id) {
    return res.status(400).send('id require');
  }
  models.Student.findByIdAndUpdate(id, {$set: {student_isAdmitted: isAdmitted}})
    .then((data) => {
      res.json({
        msg: '编辑成功',
        success: true
      });
    })
    .catch((err) => {
      console.log('err', err);
      res.json({
        msg: err,
        success: false
      });
    });
});

// 学生报名 ok (还需判断id是否重复)
router.post('/api/addStudent', (req, res) => {
  let student = {
    student_interested: req.body.interested,
    student_phone: req.body.phone,
    student_id: req.body.id,
    student_isAdmitted: '0',
    student_name: req.body.name,
    student_pass: req.body.pass
  };
  models.Student.create(student)
    .then((data) => {
      res.json({
        success: true,
        msg: '新增成功'
      });
    });
});


module.exports = router;
