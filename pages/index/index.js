//
const app = getApp()
Page({
    onLoad(){
        const t = new Date();
        this.month=t.getMonth();
        this.year=t.getFullYear();
        //获得时间年月日
        t.setFullYear(this.year,this.month,1);
        this.getcanledar(t);//渲染日历
    },

    onShow() {
        // 每次切换到该 Tab 时都检查
        // 这是 TabBar 页面接收数据的关键！
        console.log('TabBar 页面显示，检查全局数据')
        this.checkGlobalData()
      },
      
      checkGlobalData() {
        // 检查是否有待接收的数据
        if (app.globalData.announcement) {
          console.log('接收到数据:', app.globalData.announcement)
          
          // 更新页面显示
          this.setData({
            content: app.globalData.announcement,
          })
        }
    },

    data:{
        openstate:[
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年一月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年二月29天（28或29）
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年三月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年四月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年五月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年六月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//次年七月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//八月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//九月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十月31天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十一月30天
            ['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//十二月31天
        ],//长长的一个数组
        openStateThisMonth:['Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown','Unknown'],//31个元素的数组
        displayContent: ''  ,// 用于 text 组件显示的内容
        expanded:false,
        year:0,
        month:0,
        days:[],
        t:[],
        content:null,
    },

    toggle() {
        this.setData({ expanded: !this.data.expanded })
    },

   getcanledar:function(t){
    const openState=app.getOpenStateCopy();
    
    const days=new Array(35);//数组days为35个数字的数组，包含本月的所有日期，用于渲染日历     
    const daysInMonth = [31, ((this.year+1)%4 ? 28 : 29), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//判断每月有多少天 
    const whatday=t.getDay();//判断星期几（0-6）
    for(let i=whatday;i<daysInMonth[this.month]+whatday;i++){
        days[i]=i-whatday+1;
    };

    let OpenStateThisMonth = [
        ...new Array(whatday).fill('lastmonth'),  
        ...openState[this.month]
    ];
    
    this.setData({
        openstate:openState,
        days:days,
        year:this.year,
        month:this.month+1,
        openStateThisMonth:OpenStateThisMonth,
    });
   },//数组openstate更新，小写对应index页面的数组，大写对应app.js里的数组

    lastmonth:function() {
        const t = new Date();
        if(this.month<=t.getMonth()&&this.year<=t.getFullYear()){
            wx.showToast({
             title: '以往开放记录不可查',
             icon:'none'
            })
        }else{
            if(this.month){
                this.month--
            }else{
                this.year--;
                this.month=11
            }
        t.setFullYear(this.year,this.month,1);
        this.getcanledar(t);
        }
    },//思考要不要删掉

    nextmonth:function () {
        const t = new Date();
        if(this.month==6){
            wx.showToast({
                title: '下一学年数据待更新',
                icon:'none'
               })
        }else{
            this.month=(this.month+1)%12
        }
        t.setFullYear(this.year,this.month,1);
        this.getcanledar(t);
    }
    
})