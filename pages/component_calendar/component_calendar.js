Component({
    data:{
    },

    //外部传入的数据，可以用于组件的渲染
    properties:{
        openState:{
            type : String,
            value : 'unknown'
        }
    },

    methods:{
        unknown:function () {
            wx.showToast({
                title: '开放状态待定，敬请等待',
                icon: 'none'
              })
        },

        open:function() {
            wx.showActionSheet({
                itemList:['个人参观预约','团队参观预约'],   
                success(res){
                    if(res.tapIndex==0){
                        wx.navigateTo({
                          url: '/pages/reservationtable/reservationtable',
                        })
                    }else{
                        wx.switchTab({
                          url: '/pages/teamReservationtable/teamReservationtable'
                        })
                    }
                }
            })
        },

        closed:function () {
            wx.showToast({
              title: '人博馆今日闭馆',
            })
        },
            
    }
})