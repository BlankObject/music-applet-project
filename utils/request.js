//请求函数
export default(url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:'http://localhost:3000'+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookie')[1]
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorage({
            key:'cookie',
            data:res.cookies
          })
        }
        resolve(res.data)
        console.log(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}