<template>
  <view class="page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @click="goBack" hover-class="nav-back--hover">＜</view>
      <view class="nav-title">男性专区</view>
    </view>

    <!-- 轮播图 -->
    <view class="banner-container">
      <swiper class="banner-swiper" indicator-dots circular autoplay interval="3000">
        <swiper-item>
          <view class="banner" :style="{ backgroundImage: 'url(/static/男轮播.png)' }"></view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 六个功能按钮 -->
    <view class="func-grid">
      <view class="func-item" 
            v-for="(item, index) in funcItems" 
            :key="index" 
            @click="handleFuncClick(index, item.name)"
            :class="{ click: isClicking[index] }">
        <view class="item-icon" :style="{ backgroundImage: 'url(' + item.icon + ')' }"></view>
        <view class="item-name">{{ item.name }}</view>
        <view class="item-arrow">→</view>
      </view>
    </view>

    <!-- 四个小按钮 -->
    <view class="tag-list">
      <view class="tag-item" 
            :class="{ active: activeTag === index }" 
            v-for="(tag, index) in tags" 
            :key="index"
            @click="activeTag = index">
        {{ tag }}
      </view>
    </view>

    <!-- 三个专区模块 -->
    <view class="topic-modules">
      <view class="module-item" v-for="(module, index) in topicModules" :key="index">
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
      statusBarHeight: 20, // 默认值20 20, // 默认值20px
      isClicking: [false, false, false, false, false, false],
      activeTag: 0,
      funcItems: [
        { name: '体质自测', icon: '/static/自己-01.png' },
        { name: '症状自检', icon: '/static/医防结合.png' },
        { name: '肾虚调理', icon: '/static/药片1.png' },
        { name: '脱发防治', icon: '/static/头颅CT.png' },
        { name: '精力提升', icon: '/static/精力-copy.png' },
        { name: '食疗推荐', icon: '/static/刀叉.png' }
      ],
      topicModules: [
        {
          img: '/static/男1.png',
          title: '前列腺保健指南',
          desc: '从中医角度探讨前列腺健康',
          likeCount: '2.5万'
        },
        {
          img: '/static/男2.png',
          title: '肾虚自测方法',
          desc: '10个信号提示你该调理了',
          likeCount: '1.8万'
        },
        {
          img: '/static/男3.png',
          title: '四季养生食谱',
          desc: '顺应节气的饮食调理方案',
          likeCount: '3.2万'
        }
      ]
    }
  },
  onLoad() {
    // 同步获取状态栏高度
    try {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 20
    } catch (e) {
      console.log('获取状态栏高度失败，使用默认值')
    }
  },
  methods: {
    handleFuncClick(index, name) {
      this.$set(this.isClicking, index, true)
      setTimeout(() => {
        this.$set(this.isClicking, index, false)
        uni.showToast({ 
          title: `进入${name}`, 
          icon: 'none',
          position: 'bottom'
        })
      }, 100)
    },
    goBack() {
      uni.navigateBack()
    }
  },
  computed: {
    tags() {
      return ['前列腺', '脾胃', '睡眠', '性功能']
    }
  }
}
</script>

<style>
/* 状态栏 */
.status-bar {
  width: 100%;
  background-color: #ffffff; /* 与导航栏同色 */
}

/* 导航栏 */
.nav-bar {
  height: 46px;
  background-color: #335c81;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: white;
  position: relative;
}

.nav-back {
  font-size: 22px;
  margin-right: 10px;
}

.nav-title {
  font-size: 18px;
  font-weight: 500;
}

/* 轮播图 */
.banner-container {
  padding: 10px 15px;
}

.banner-swiper {
  height: 170px;
  border-radius: 10px;
  overflow: hidden;
}

.banner {
  width: 100%;
  height: 100%;
  background-size: cover;
}

/* 功能按钮 */
.func-grid {
  padding: 0 15px;
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.func-item {
  background-color: #8993a3;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  color: white;
  transition: all 0.2s;
}

.func-item.click {
  transform: scale(0.95);
  opacity: 0.9;
}

.item-icon {
  width: 26px;
  height: 26px;
  margin-right: 10px;
  background-size: contain;
}

.item-name {
  flex: 1;
  font-size: 15px;
}

.item-arrow {
  font-size: 16px;
}

/* 标签按钮 */
.tag-list {
  padding: 0 15px;
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.tag-item {
  flex: 1;
  padding: 8px 0;
  text-align: center;
  background-color: #8993a3;
  border-radius: 20px;
  color: white;
  font-size: 14px;
}

.tag-item.active {
  background-color: #ffb134;
}

/* 专题模块 */
.topic-modules {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.module-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.module-img {
  height: 140px;
  background-size: cover;
}

.module-text {
  padding: 12px;
}

.module-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.module-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.module-like {
  font-size: 12px;
  color: #999;
}

.module-like text:first-child {
  color: #ff6b6b;
  margin-right: 5px;
}
</style>