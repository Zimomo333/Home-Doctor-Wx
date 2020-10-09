// pages/article/article.js
import myRequest from '../../utils/request'
Page({
  data: {
    article_id: '',
    content: '',
    title: '',
    type: '',
    time: '',
    watchs: 0,
    likes: 0,
    icon_like: 'like-o',
    liked: false
  },
  onLoad(options) {
    this.setData({ article_id: options.id})
    myRequest('/wx_user/getHealthyAboutById',{id:options.id},'GET').then((data)=>{
      this.setData({
        content: data.content,
        title: data.title,
        type: data.type,
        time: data.time.slice(0,10),
        watchs: data.watchs,
        likes: data.likes
      })
    });
    myRequest('/wx_user/incrWatch',{id:options.id},'GET').then(()=>{
      console.log('浏览量+1');
    })
  },
  onClickLike(){
    if(!this.data.liked){
      myRequest('/wx_user/incrLikes',{id:this.data.article_id},'GET').then(()=>{
        this.setData({
          icon_like: 'like',
          likes: this.data.likes+1,
          liked: true
        })
      })
    }
  }
})