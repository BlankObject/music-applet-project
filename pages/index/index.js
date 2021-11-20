// index.js
// 获取应用实例
const app = getApp()
import request from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:{},
    musicInfo:[],
    musicBannerInfo:[],
    topList:[],
    index:1,
    isHidden:true,
    isScroll:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图数据
    this.getBanner()
    //获取推荐歌单数据 参数是要获取多少个歌单
    this.getRecommendMusic(10)
    //获取排行榜数据
    this.getTopList()
  },
  //获取轮播图信息
  async getBanner(){
    let banner=await request('/banner',{type:2})
    if(banner.code===200){
      this.setData({
        banner
      })
    }
  },
  ////获取推荐歌单数据 参数是要获取多少个歌单
 async getRecommendMusic(limit){
  let musicInfo=await request(`/personalized?limit=${limit}`)
  if(musicInfo.code===200){
    this.setData({
      musicBannerInfo:musicInfo.result.slice(0,5),
      musicInfo:musicInfo.result.slice(5,11)
    })
  }
 },

 //获取排行榜数据
 async getTopList(){
   let topArr=[]
   let index=0
   while(index<5){
    let topInfo=await request('/top/list',{idx:index++})
    let topListItem={name:topInfo.playlist.name,tracks:topInfo.playlist.tracks.slice(0,3)}
    topArr.push(topListItem)
    this.setData({
      topList:topArr
    })
   }
 },

 //点击
 showUser(){
  this.setData({
    isHidden:!this.data.isHidden,
    isScroll:!this.data.isScroll
  })
  // console.log(this.data.isHidden)
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  
  //弹框获取用户信息
  getUserInfo(){
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success:(res)=>{
        this.setData({
          userInfo:res.userInfo
        })
      }
    })
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
