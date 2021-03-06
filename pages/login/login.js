// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    // 表单项内容发生改变的回调
  handleInput(event){
    let type=event.currentTarget.id
    this.setData({
      [type]:event.detail.value
    })
  },

  //登录的回调
  async login(){
    let {phone,password}=this.data
    if(!phone){
      wx.showToast({
        title:'手机号码不能为空',
        icon:'none'
      })
      return
    }
    if(!password){
      wx.showToast({
        title:'请输入密码',
        icon:'none'
      })
      return
    }

    // 后端验证
    let result = await request('/login/cellphone', {phone, password, isLogin: true})
    if(result.code === 200){ // 登录成功
      wx.showToast({
        title: '登录成功'
      })
      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      //保存token
      wx.setStorageSync('token',result.token)
      
      // 跳转至个人中心home页面
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    } 
  },

  //失焦
  checkInput(event){
    let type=event.currentTarget.id
    let {phone,password}=this.data
    if(type==='phone'){
       //定义正则表达式
      //  console.log(phone.length)
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if((!phoneReg.test(phone))&&phone!==''){
        wx.showToast({
          title:'手机号码格式错误',
          icon:'none'
        })
      }
      return
    }else{
      if((password.length<6)&&password!==''){
        wx.showToast({
          title:'密码长度不能于6',
          icon:'none'
        })
      }
      return
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})