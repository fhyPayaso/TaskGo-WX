export default (options)=> {
  return new Promise((resolve, reject)=> {
    wx.request({
      ...options,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}