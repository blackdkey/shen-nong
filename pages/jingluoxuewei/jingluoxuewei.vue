<template>
  <view class="page-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部搜索筛选栏 -->
    <view class="top-bar">
      <view class="back-btn" @tap="goBack" hover-class="back-btn--hover">＜</view>
      <view class="search-box">
        <view class="search-icon" :style="{ backgroundImage: 'url(' + searchIcon + ')' }"></view>
        <input class="search-input" type="text" placeholder="搜索经络/穴位..." />
      </view>
      <view class="filter-btn" @tap="showFilter" hover-class="filter-btn--hover">
        <view class="filter-icon" :style="{ backgroundImage: 'url(' + filterIcon + ')' }"></view>
      </view>
    </view>

    <!-- 主内容区三栏布局 -->
    <view class="main-content">
      <!-- 左侧功能按钮区 -->
      <view class="left-panel">
        <view class="func-btn" 
              v-for="(btn, index) in funcButtons" 
              :key="index" 
              @tap="handleFuncClick(index)"
              :class="{ active: activeFunc === index, 'func-btn--hover': isHovering[index] }"
              @touchstart="setHover(index, true)"
              @touchend="setHover(index, false)"
              @touchcancel="setHover(index, false)">
          <view class="btn-icon" :style="{ backgroundImage: 'url(' + btn.icon + ')' }"></view>
          <view class="btn-name">{{ btn.name }}</view>
        </view>
      </view>

      <!-- 中间动态图片区 -->
      <view class="middle-panel">
        <view class="image-container" :style="{ backgroundImage: 'url(' + currentMeridian.img + ')' }">
          <!-- 穴位标记点容器 -->
        </view>
      </view>

      <!-- 右侧经络选项区 -->
      <view class="right-panel">
        <view class="meridian-item" 
              v-for="(meridian, index) in meridians" 
              :key="index"
              @tap="switchMeridian(index)"
              :class="{ active: currentMeridianIndex === index }">
          <view class="meridian-name">{{ meridian.name }}</view>
          <view class="meridian-arrow" :style="{ backgroundImage: 'url(' + (currentMeridianIndex === index ? activeArrow : defaultArrow) + ')' }"></view>
        </view>
      </view>
    </view>

    <!-- 底部穴位标签栏 -->
    <view class="bottom-nav">
      <scroll-view scroll-x="true" class="scroll-view-x" :scroll-with-animation="true">
        <view class="scroll-item">
          <view class="nav-item" 
                v-for="(item, index) in bottomAcupoints" 
                :key="index"
                @tap="selectAcupoint(index)"
                :class="{ 'nav-item--active': selectedAcupoint === index }">
            <view class="circle" :style="{ backgroundColor: item.color }">
              <text class="circle-text">{{ item.shortName }}</text>
            </view>
            <text class="nav-text">{{ item.fullName }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      activeFunc: 0,
      currentMeridianIndex: 0,
      selectedAcupoint: -1,
      isHovering: [], // 存储按钮hover状态
      
      // 图标路径
      defaultArrow: '',
      activeArrow: '/static/左箭头.png',
      searchIcon: '/static/搜索.png',
      filterIcon: '/static/筛选.png',
      
      // 功能按钮数据
      funcButtons: [
        { name: '设置', icon: '/static/齿轮.png' },
        { name: '解剖', icon: '/static/口罩.png' },
        { name: '画笔', icon: '/static/铅笔.png' },
        { name: '操作', icon: '/static/手掌.png' },
        { name: '分享', icon: '/static/分享.png' },
        { name: '经脉循行', icon: '/static/药片2.png' }
      ],
      
      // 经络数据
      meridians: Array(12).fill({ name: '肺经', img: '/static/经络.png' }),
      
      // 底部穴位数据
      bottomAcupoints: [
        { shortName: '中', fullName: '中府', color: '#8A2BE2' },
        { shortName: '云', fullName: '云门', color: '#1E90FF' },
        { shortName: '天', fullName: '天府', color: '#32CD32' },
        { shortName: '侠', fullName: '侠白', color: '#FFA500' },
        { shortName: '尺', fullName: '尺泽', color: '#FF4500' },
        { shortName: '孔', fullName: '孔最', color: '#FF69B4' },
        { shortName: '列', fullName: '列缺', color: '#8B4513' },
        { shortName: '经', fullName: '经渠', color: '#00CED1' },
        { shortName: '太', fullName: '太渊', color: '#FFD700' },
        { shortName: '鱼', fullName: '鱼际', color: '#CD5C5C' }
      ]
    };
  },
  
  onLoad() {
    // 初始化hover状态数组
    this.isHovering = new Array(this.funcButtons.length).fill(false);
    
    // 获取状态栏高度（兼容微信小程序）
    uni.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
      },
      fail: () => {
        this.statusBarHeight = 20; // 默认高度
      }
    });
  },
  
  computed: {
    currentMeridian() {
      return this.meridians[this.currentMeridianIndex];
    }
  },
  
  methods: {
    // 按钮hover状态管理
    setHover(index, isHover) {
      this.$set(this.isHovering, index, isHover);
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    
    // 显示筛选菜单
    showFilter() {
      uni.showActionSheet({
        itemList: ['经络筛选', '穴位筛选', '高级筛选'],
        success: (res) => {
          console.log('筛选选项', res.tapIndex);
        }
      });
    },
    
    // 功能按钮点击
    handleFuncClick(index) {
      this.activeFunc = index;
      this.playBounceEffect(`.func-btn:nth-child(${index + 1})`);
    },
    
    // 切换经络
    switchMeridian(index) {
      this.currentMeridianIndex = index;
      this.playBounceEffect(`.meridian-item:nth-child(${index + 1})`);
    },
    
    // 选择穴位
    selectAcupoint(index) {
      this.selectedAcupoint = index;
      this.playBounceEffect(`.nav-item:nth-child(${index + 1})`);
    },
    
    // 添加回弹动画效果
    playBounceEffect(selector) {
      const query = uni.createSelectorQuery().in(this);
      query.select(selector).boundingClientRect(data => {
        if (data) {
          const animation = uni.createAnimation({
            duration: 400,
            timingFunction: 'ease',
          });
          
          animation.scale(0.95, 0.95).step({ duration: 100 });
          animation.scale(1.05, 1.05).step({ duration: 150 });
          animation.scale(1, 1).step({ duration: 150 });
          
          this.animation = animation;
          this.$nextTick(() => {
            query.select(selector).fields({
              node: true,
              size: true
            }, res => {
              if (res && res.node) {
                res.node.animation = animation.export();
                res.node.animation.play();
              }
            }).exec();
          });
        }
      }).exec();
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.page-container {
  width: 100%;
  height: 100vh;
  background-color: #FFF8E7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 状态栏占位 */
.status-bar {
  width: 100%;
  background-color: #FFF8E7;
}

/* 顶部搜索筛选栏 */
.top-bar {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: #F5E8B8;
  border-bottom: 1px solid #E8D6A2;
}

.back-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  border-radius: 50%;
  margin-right: 5px;
  transition: background-color 0.2s;
}
.back-btn--hover {
  background-color: #E8D6A2;
}

.search-box {
  flex: 1;
  height: 36px;
  background-color: #fff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.search-icon {
  width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}
.search-input::placeholder {
  color: #999;
}

.filter-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.filter-btn--hover {
  background-color: #E8D6A2;
}

.filter-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 主内容区三栏布局 */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧功能按钮区 */
.left-panel {
  width: 80px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  border-right: 1px solid #E8D6A2;
}

.func-btn {
  width: 60px;
  height: 60px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  transition: all 0.2s ease;
}
.func-btn.active {
  background-color: #4CAF50;
}
.func-btn.active .btn-name {
  color: #fff;
}
.func-btn--hover {
  background-color: #F5F5F5;
}

.btn-icon {
  width: 28px;
  height: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 5px;
}

.btn-name {
  font-size: 12px;
  color: #5D4037;
}

/* 中间动态图片区 */
.middle-panel {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 15px;
  background-color: #FFF8E7;
}

.image-container {
  width: 100%;
  height: 85%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
}

/* 右侧经络选项区 */
.right-panel {
  width: 100px;
  background-color: #fff;
  border-left: 1px solid #E8D6A2;
  padding-top: 15px;
  overflow-y: auto;
}
.right-panel::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.meridian-item {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 5px;
  font-weight: bold;
  transition: background-color 0.2s;
}
.meridian-item.active {
  background-color: #F5E8B8;
}
.meridian-item:active {
  background-color: #E8D6A2;
}

.meridian-name {
  flex: 1;
  font-size: 14px;
  color: #5D4037;
  text-align: right;
  padding-right: 8px;
}

.meridian-arrow {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 底部穴位标签栏 */
.bottom-nav {
  height: 60px;
  width: 100%;
  background: #F9F0D7;
  border-top: 1px solid #E8D6A2;
}

.scroll-view-x {
  width: 100%;
  height: 100%;
}

.scroll-item {
  white-space: nowrap;
  padding: 6px 15px;
}

.nav-item {
  display: inline-block;
  text-align: center;
  margin: 0 12px;
  padding: 5px;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.nav-item:active {
  background-color: #E8D6A2;
}
.nav-item--active {
  background-color: rgba(0,0,0,0.1);
}

.circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.circle-text {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.nav-text {
  font-size: 10px;
  color: #5D4037;
  margin-top: 3px;
  display: block;
}
/* 新增回弹动画样式 */
.func-btn, .meridian-item, .nav-item {
  transform-origin: center;
  transition: transform 0.3s ease;
}

/* 微信小程序兼容性处理 */
view {
  box-sizing: border-box;
}
</style>