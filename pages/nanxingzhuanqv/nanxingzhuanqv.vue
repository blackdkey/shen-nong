<template>
  <view class="page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @click="goBack" hover-class="nav-back--hover">←</view>
      <view class="nav-title">男性专区</view>
      <view class="nav-actions">
        <view class="action-dot"></view>
        <view class="action-dot"></view>
        <view class="action-dot"></view>
        <view class="action-camera" hover-class="action-camera--hover">📷</view>
      </view>
    </view>

    <!-- 轮播图（仅图片轮播，保持原色系） -->
    <view class="banner-container">
      <swiper class="banner-swiper" indicator-dots circular autoplay interval="3000">
        <swiper-item v-for="(img, index) in bannerImages" :key="index">
          <view class="banner" :style="{ backgroundImage: 'url(' + img + ')' }"></view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 六个功能按钮（保留原蓝灰色调，优化质感） -->
    <view class="func-grid">
      <view class="func-item" 
            v-for="(item, index) in funcItems" 
            :key="index" 
            @click="showToast(item.name)"
            :class="{ active: isActive[index] }">
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
      activeTag: 0,
      // 轮播图图片列表（新增）
      bannerImages: [
        '/static/男轮播.png' // 实际轮播图1
      ],
      // 功能按钮数据（保留原图标路径）
      funcItems: [
        { name: '体质自测', icon: '/static/自己-01.png' },
        { name: '症状自检', icon: '/static/医防结合.png' },
        { name: '肾虚调理', icon: '/static/药品,药物,违禁品,违禁药物.png' },
        { name: '脱发防治', icon: '/static/头颅CT.png' },
        { name: '精力提升', icon: '/static/精力-copy.png' },
        { name: '食疗推荐', icon: '/static/刀叉.png' }
      ],
      // 专区模块数据
      topicModules: [
        {
          img: '/static/n1.png',
          title: '前列腺保健指南',
          desc: '从中医角度探讨前列腺健康',
          likeCount: '2.5万'
        },
        {
          img: '/static/n2.png',
          title: '肾虚自测方法',
          desc: '10个信号提示你该调理了',
          likeCount: '1.8万'
        },
        {
          img: '/static/n3.png',
          title: '四季养生食谱',
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
      return ['前列腺', '脾胃', '睡眠', '性功能'];
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
  background-color: #335c81;
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
  background-color: #8993a3; /* 原蓝灰底色保留 */
  border-radius: 14px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  color: white;
  transition: all 0.15s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.07); /* 新增轻微阴影 */
}

.func-item.active {
  background-color: #6d7888; /* 原点击深色保留 */
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
  background-color: #8993a3 !important; /* 原蓝灰底色保留 */
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.tag-item.active {
  background-color: #ffb134 !important; /* 原橙色选中保留 */
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