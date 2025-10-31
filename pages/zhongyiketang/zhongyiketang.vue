<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="back-btn" @tap="goBack" hover-class="back-btn--hover">＜</view>
      <view class="title">中医课堂</view>
      <view class="search-box">
        <image src="/static/搜索.png" class="search-icon" mode="aspectFit" />
        <input type="text" placeholder="搜索养生知识..." class="search-input" />
      </view>
    </view>
    
    <!-- 分类标签 -->
    <view class="category-tabs">
      <view class="tab-item" :class="{ active: currentTab === 0 }" @tap="switchTab(0)">全部</view>
      <view class="tab-item" :class="{ active: currentTab === 1 }" @tap="switchTab(1)">养生</view>
      <view class="tab-item" :class="{ active: currentTab === 2 }" @tap="switchTab(2)">外治</view>
      <view class="tab-item" :class="{ active: currentTab === 3 }" @tap="switchTab(3)">保健</view>
      <view class="tab-item" :class="{ active: currentTab === 4 }" @tap="switchTab(4)">临床</view>
    </view>
    
    <!-- 主内容区 -->
    <view class="content">
      <!-- 统一功能容器 -->
      <view class="function-container">
        <!-- 第一行：收藏夹和最近学习（图标文字水平排列） -->
        <view class="function-row first-row">
          <view class="function-item folder-item" hover-class="item-hover">
            <view class="horizontal-group">
              <view class="icon-container folder-icon">
                <image src="/static/收藏 (2).png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text">我的收藏夹</text>
            </view>
          </view>
          <view class="function-item study-item" hover-class="item-hover">
            <view class="horizontal-group">
              <view class="icon-container study-icon">
                <image src="/static/时间.png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text study-text">最近学习</text>
            </view>
          </view>
        </view>
        
        <!-- 分隔线 -->
        <view class="divider"></view>
        
        <!-- 第二行：针灸、艾灸、推拿、更多（图标文字垂直排列） -->
        <view class="function-row second-row">
          <view class="function-item acupuncture-item" hover-class="item-hover">
            <view class="vertical-group">
              <view class="icon-container acupuncture-icon">
                <image src="/static/针灸.png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text">针灸</text>
            </view>
          </view>
          <view class="function-item moxibustion-item" hover-class="item-hover">
            <view class="vertical-group">
              <view class="icon-container moxibustion-icon">
                <image src="/static/艾灸.png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text">艾灸</text>
            </view>
          </view>
          <view class="function-item tuina-item" hover-class="item-hover">
            <view class="vertical-group">
              <view class="icon-container tuina-icon">
                <image src="/static/推拿.png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text">推拿</text>
            </view>
          </view>
          <view class="function-item more-item" hover-class="item-hover">
            <view class="vertical-group">
              <view class="icon-container more-icon">
                <image src="/static/更多.png" class="icon-img" mode="aspectFit" />
              </view>
              <text class="function-text">更多</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 留白区域 -->
      <view class="spacing-15"></view>
      
      <!-- 知识卡片区 -->
      <view class="knowledge-cards">
        <view class="card-item" hover-class="card-hover">
          <image src="/static/中医.png" class="card-img" mode="widthFix" />
          <view class="card-content">
            <text class="card-title">零基础学中医</text>
            <text class="card-desc">中医入门精髓课，学习博大精深中医文化</text>
          </view>
        </view>
        
        <!-- 卡片间留白 -->
        <view class="spacing-12"></view>
        
        <view class="card-item" hover-class="card-hover">
          <image src="/static/养生之道.png" class="card-img" mode="widthFix" />
          <view class="card-content">
            <text class="card-title">千年养生古法</text>
            <text class="card-desc">中医入门精髓课，学习博大精深中医文化</text>
          </view>
        </view>
        
        <!-- 卡片间留白 -->
        <view class="spacing-12"></view>
        
        <view class="card-item" hover-class="card-hover">
          <image src="/static/艾灸之道.png" class="card-img" mode="widthFix" />
          <view class="card-content">
            <text class="card-title">中医艾灸之道</text>
            <text class="card-desc">中医入门精髓课，学习博大精深中医文化</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      currentTab: 0
    };
  },
  onLoad() {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 状态栏占位 */
.status-bar {
  width: 100%;
}

/* 顶部导航栏 */
.navbar {
  display: flex;
  align-items: center;
  height: 44px;
  background-color: #4CAF50;
  color: white;
  padding: 0 16px;
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.back-btn {
  font-size: 24px;
  margin-right: 12px;
}

.back-btn--hover {
  transform: scale(1.1);
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-right: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 6px 12px;
  flex: 0.6;
  margin-right: 12px;
}

.search-icon {
  width: 13px;
  height: 13px;
  margin-right: 3px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  color: #333;
  background: transparent;
  border: none;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  background-color: white;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  font-size: 15px;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #4CAF50;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #4CAF50;
  border-radius: 3px;
}

/* 主内容区 */
.content {
  padding: 16px;
}

/* 留白区域 */
.spacing-15 {
  height: 15px;
}

.spacing-12 {
  height: 12px;
}

/* 统一功能容器 */
.function-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* 功能行样式 */
.function-row {
  display: flex;
}

.first-row {
  padding: 18px 20px; /* 第一行上下内边距增加 */
}

.second-row {
  padding: 15px 10px;
}

/* 分隔线 */
.divider {
  height: 1px;
  background-color: #f5f5f5;
  margin: 0 15px;
}

/* 功能项样式 */
.function-item {
  flex: 1;
  display: flex;
  justify-content: center; /* 第一行居中对齐 */
}

/* 第一行：图标文字水平排列容器 */
.horizontal-group {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

/* 第二行：图标文字垂直排列容器 */
.vertical-group {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中对齐 */
}

/* 图标容器 - 统一尺寸 */
.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 第一行图标：圆形 */
.folder-icon, .study-icon {
  margin-right: 10px; /* 水平排列时图标右侧间距 */
}

/* 第二行图标：椭圆形 */
.acupuncture-icon, .moxibustion-icon, .tuina-icon, .more-icon {
  width: 55px; /* 宽度增加，与设计图匹配 */
  height: 32px; /* 高度调整 */
  border-radius: 16px; /* 椭圆形 */
  margin-bottom: 8px; /* 垂直排列时图标下方间距 */
}

/* 图标颜色（与设计图完全匹配） */
.folder-icon {
  background-color: #8a8a8a; /* 灰色 */
}

.study-icon {
  background-color: #00bfa5; /* 青绿色 */
}

.acupuncture-icon {
  background-color: #e0654f; /* 红色 */
}

.moxibustion-icon {
  background-color: #8a8299; /* 紫色 */
}

.tuina-icon {
  background-color: #b98e87; /* 棕色 */
}

.more-icon {
  background-color: #959d8a; /* 绿色 */
}

/* 图标图片大小 */
.icon-img {
  width: 20px;
  height: 20px;
}

/* 文字样式 */
.function-text {
  font-size: 16px; /* 第一行文字增大 */
  color: #333;
}

/* 第一行特殊文字样式 */
.study-text {
  color: #00bfa5; /* 青绿色文字 */
  font-weight: 500;
}

/* 第二行文字样式 */
.second-row .function-text {
  font-size: 14px; /* 第二行文字略小 */
  color: #333;
  text-align: center; /* 文字居中 */
}

/* 悬停效果 */
.item-hover {
  transform: translateY(-2px);
}

/* 知识卡片样式 */
.knowledge-cards {
  display: flex;
  flex-direction: column;
}

.card-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.card-hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.card-content {
  padding: 12px 15px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 3px;
  display: block;
}

.card-desc {
  font-size: 12px;
  color: #999;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>