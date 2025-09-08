<template>
  <view class="page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @click="goBack" hover-class="nav-back--hover">＜</view>
      <view class="nav-title">女性专区</view>
    </view>

    <!-- 轮播图（仅图片轮播，保持原色系） -->
    <view class="banner-container">
      <swiper class="banner-swiper" indicator-dots circular autoplay interval="3000">
        <swiper-item v-for="(img, index) in bannerImages" :key="index">
          <view class="banner" :style="{ backgroundImage: 'url(' + img + ')' }"></view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 六个功能按钮（添加点击反馈效果） -->
    <view class="func-grid">
      <view class="func-item" 
            v-for="(item, index) in funcItems" 
            :key="index" 
            @click="handleFuncClick(index, item.name)"
            :class="{ active: isActive[index], click: isClicking[index] }">
        <view class="item-icon" :style="{ backgroundImage: 'url(' + item.icon + ')' }"></view>
        <view class="item-name">{{ item.name }}</view>
        <view class="item-arrow">→</view>
      </view>
    </view>

    <!-- 四个小按钮（保留原蓝灰+橙色选中，优化圆角） -->
    <view class="tag-list">
      <view class="tag-item" 
            :class="{ active: activeTag === index }" 
            v-for="(tag, index) in tags" 
            :key="index"
            @click="activeTag = index">
        {{ tag }}
      </view>
    </view>

    <!-- 三个专区模块（优化排版和阴影） -->
    <view class="topic-modules">
      <view class="module-item" v-for="(module, index) in topicModules" :key="index" hover-class="module-item--hover">
        <view class="module-card">
          <view class="module-img" :style="{ backgroundImage: 'url(' + module.img + ')' }"></view>
          <view class="module-text">
            <view class="module-title">{{ module.title }}</view>
            <view class="module-desc">{{ module.desc }}</view>
            <view class="module-like">
              <text>❤</text>
              <text class="like-count">{{ module.likeCount }}</text>
            </view>
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
      isActive: [false, false, false, false, false, false],
	  isClicking: [false, false, false, false, false, false], // 新增点击状态数组
	  activeTag: 0,
      activeTag: 0,
      // 轮播图图片列表（新增）
      bannerImages: [
        '/static/女轮播.png' // 实际轮播图1
      ],
      // 功能按钮数据（保留原图标路径）
      funcItems: [
        { name: '月经调理', icon: '/static/月亮.png' },
        { name: '乳腺养护', icon: '/static/花朵.png' },
        { name: '孕产护理', icon: '/static/孕妇护理.png' },
        { name: '抗衰美容', icon: '/static/心脏.png' },
        { name: '更年期指南', icon: '/static/太极.png' },
        { name: '汉方茶饮', icon: '/static/茶.png' }
      ],
      // 专区模块数据
      topicModules: [
        {
          img: '/static/女1.png',
          title: '经期调理指南',
          desc: '从中医角度探讨经期健康',
          likeCount: '2.5万'
        },
        {
          img: '/static/女2.png',
          title: '乳腺自检方法',
          desc: '10个信号提示你该调理了',
          likeCount: '1.8万'
        },
        {
          img: '/static/女3.png',
          title: '四季养颜食谱',
          desc: '顺应节气的饮食调理方案',
          likeCount: '3.2万'
        }
      ]
    };
  },
  onLoad() {
    // 获取状态栏高度
    const _this = this;
    uni.getSystemInfo({
      success(res) {
        _this.statusBarHeight = res.statusBarHeight || 20;
      }
    });
  },
  methods: {
	// 优化点击处理函数，添加状态反馈
	handleFuncClick(index, name) {
	  // 设置点击状态为true，0.1秒后恢复
	  this.$set(this.isClicking, index, true);
	  setTimeout(() => {
	    this.$set(this.isClicking, index, false);
	  }, 100);
	  
	  // 显示提示信息
	  this.showToast(name);
	  
	  // 切换激活状态（如果需要保留激活效果）
	  this.isActive = this.isActive.map((_, i) => i === index);
	}, 
    goBack() {
      uni.navigateBack();
    },
    showToast(title) {
      uni.showToast({ 
        title, 
        icon: 'none',
        duration: 1500,
        position: 'bottom'
      });
    }
  },
  computed: {
    tags() {
      return ['经期', '乳腺', '孕产', '护肤','养颜'];
    }
  }
};
</script>

<style>
/* 基础样式 */
page {
  background-color: #f5f5f5;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 状态栏 */
.status-bar {
  width: 100%;
  background: transparent;
}

/* 导航栏（保留原蓝灰色） */
.nav-bar {
  height: 46px;
  background-color: #ffaac1;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: white;
}

.nav-back {
  font-size: 22px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.nav-back--hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.nav-title {
  font-size: 18px;
  font-weight: 500;
  flex-shrink: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.action-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  margin-right: 2px;
}

.action-camera {
  font-size: 19px;
  margin-left: 15px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-camera--hover {
  transform: scale(1.15);
}

/* 轮播图（仅图片轮播+指示器） */
.banner-container {
  padding: 0 15px;
  margin-top: 12px;
}

.banner-swiper {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.banner {
  height: 170px;
  background-size: cover;
  background-position: center;
}

/* 六个功能按钮（保留蓝灰底色，优化细节） */
.func-grid {
  padding: 0 15px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.func-item {
  background-color: #ffb3b4; /* 原蓝灰底色保留 */
  border-radius: 14px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  color: white;
  transition: all 0.15s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.07); /* 新增轻微阴影 */
  /* 原样式保持不变 */
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease;
}
/* 点击反馈效果 */
.func-item.click {
  transform: scale(0.95);
  opacity: 0.85;
}

/* 点击波纹效果（可选增强效果） */
.func-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  background: rgba(255, 60, 154, 0.3);
  border-radius: 50%;
  transform: scale(0) translate(-50%, -50%);
  transition: transform 0.3s ease;
}

.func-item.click::after {
  transform: scale(1) translate(-50%, -50%);
}

.func-item.active {
  background-color: #ffb3b4; /* 原点击深色保留 */
  transform: scale(0.985);
}

.item-icon {
  width: 26px; /* 图标稍放大 */
  height: 26px;
  margin-right: 12px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.item-name {
  flex: 1;
  font-size: 16px;
  font-weight: 500; /* 文字加粗 */
}

.item-arrow {
  color: rgba(255, 255, 255, 0.9);
  font-size: 17px;
}

/* 四个小按钮（保留原蓝灰+橙色选中） */
.tag-list {
  padding: 0 15px;
  margin-top: 25px;
  display: flex;
  gap: 10px;
}

.tag-item {
  flex: 1;
  text-align: center;
  padding: 9px 0; /* 稍增内边距 */
  border-radius: 22px; /* 更圆润的圆角 */
  font-size: 14px;
  color: white !important;
  background-color: #a7d5ff !important; /* 原蓝灰底色保留 */
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.tag-item.active {
  background-color: #ff557f !important; /* 原橙色选中保留 */
  color: white !important;
  transform: translateY(-2px); /* 选中时轻微上浮 */
  box-shadow: 0 4px 8px rgba(255,177,52,0.2); /* 橙色光晕 */
  font-weight: 500;
}

/* 三个专区模块（优化排版和阴影） */
.topic-modules {
  padding: 0 15px;
  margin-top: 22px;
  display: flex;
  gap: 15px;
}

.module-item {
  flex: 1;
  transition: transform 0.2s ease;
}

.module-item--hover {
  transform: translateY(-3px);
}

.module-card {
  background-color: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.09); /* 增强卡片阴影 */
}

.module-img {
  width: 100%;
  height: 145px; /* 图片高度优化 */
  background-size: cover;
  background-position: center;
  background-color: #e5e5e5;
}

.module-text {
  padding: 15px; /* 文字区padding优化 */
}

.module-title {
  font-size: 16px;
  font-weight: 600; /* 标题加粗 */
  color: #333;
  margin-bottom: 6px;
  line-height: 1.3;
}

.module-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box; /* 文字超出两行省略 */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.module-like {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
}

.module-like text:first-child {
  margin-right: 5px;
  color: #ff6b6b; /* 爱心变红 */
}

.like-count {
  color: #666;
}
</style>