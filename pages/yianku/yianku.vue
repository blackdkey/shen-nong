<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏（返回按钮居左，标题居中） -->
    <view class="nav-bar">
      <!-- 返回按钮（居左） -->
      <view class="back-btn" @tap="goBack" hover-class="back-btn--hover">＜</view>
      
      <!-- 标题（居中） -->
      <view class="nav-title">医案库</view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <image src="/static/搜索.png" class="search-icon" />
      <input 
        type="text" 
        class="search-input" 
        placeholder="搜索病症名称..." 
        placeholder-style="color: #999;"
      />
    </view>

    <!-- 主体内容 -->
    <view class="main-content">
      <!-- 左侧分类栏 -->
      <scroll-view class="category-list" scroll-y>
        <view 
          class="category-item" 
          :class="{ active: activeCategory === idx }" 
          v-for="(category, idx) in categories" 
          :key="idx" 
          @click="activeCategory = idx"
        >
          {{ category.name }}
        </view>
      </scroll-view>

      <!-- 右侧标签区域 -->
      <scroll-view class="tag-container" scroll-y>
        <view class="tag-rows">
          <!-- 第1行 -->
          <view class="tag-row">
            <view class="tag">细菌性痢疾</view>
            <view class="tag">阿米巴痢疾</view>
          </view>
          
          <!-- 第2行 -->
          <view class="tag-row">
            <view class="tag">水肿</view>
          </view>
          
          <!-- 第3行 -->
          <view class="tag-row">
            <view class="tag">原发性肾小球肾炎</view>
          </view>
          
          <!-- 第4行 -->
          <view class="tag-row">
            <view class="tag">糖尿病</view>
            <view class="tag">尿崩症</view>
            <view class="tag">淋证</view>
          </view>
          
          <!-- 第5行 -->
          <view class="tag-row">
            <view class="tag">肾盂肾炎</view>
            <view class="tag">尿道炎</view>
          </view>
          
          <!-- 第6行 -->
          <view class="tag-row">
            <view class="tag">膀胱炎</view>
            <view class="tag">乳糜尿</view>
          </view>
          
          <!-- 第7行 -->
          <view class="tag-row">
            <view class="tag">前列腺肥大</view>
            <view class="tag">男性不育症</view>
          </view>
          
          <!-- 第8行 -->
          <view class="tag-row">
            <view class="tag">早泄</view>
            <view class="tag">阳强</view>
            <view class="tag">漏肩风</view>
          </view>
          
          <!-- 第9行 -->
          <view class="tag-row">
            <view class="tag">贫血</view>
            <view class="tag">白细胞减少症</view>
          </view>
          
          <!-- 第10行 -->
          <view class="tag-row">
            <view class="tag">低血压</view>
            <view class="tag">痹病</view>
            <view class="tag">萎证</view>
          </view>
          
          <!-- 第11行 -->
          <view class="tag-row">
            <view class="tag">癫痫病</view>
            <view class="tag">狂病</view>
            <view class="tag">嗜睡</view>
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
      statusBarHeight: 0, // 状态栏高度
      activeCategory: 0, // 当前激活分类索引（默认内科）
      categories: [
        { name: '内科', active: true },
        { name: '骨伤科', active: false },
        { name: '五官科', active: false },
        { name: '皮外伤科', active: false },
        { name: '急症', active: false },
        { name: '其他病症', active: false },
        { name: '儿科', active: false },
        { name: '妇科', active: false }
      ]
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
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style lang="scss" scoped>
$nav-height: 40px;
$search-height: 56rpx;	
$category-width: 160rpx;
$tag-height: 60rpx;
$green-primary: #178f3d;
$green-light: #00aa00;

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
}

/* 状态栏 */
.status-bar {
  width: 100%;
  background-color: #fff;
}

/* 导航栏（返回按钮居左，标题居中） */
.nav-bar {
  height: $nav-height;
  background-color: $green-primary;
  display: flex;
  align-items: center; /* 垂直居中 */
  padding: 0 20rpx; /* 左右内边距 */
  position: relative; /* 为标题绝对定位提供参照 */
}

/* 返回按钮（居左） */
.back-btn {
  color: #fff;
  font-size: 36rpx;
  cursor: pointer;
  z-index: 1; /* 确保在标题上层 */
}
.back-btn--hover {
  opacity: 0.8; /* 点击时透明度变化 */
}

/* 标题（居中） */
.nav-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center; /* 水平居中 */
  font-size: 34rpx;
  color: #fff;
  font-weight: 500;
}

/* 搜索栏 */
.search-bar {
  width: 80%;
  height: $search-height;
  margin: 10rpx auto;
  padding: 0 20rpx;
  background-color: #eaeaea;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.search-icon {
  width: 22rpx;
  height: 22rpx;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 26rpx;
  color: #333;
}

/* 主体内容 */
.main-content {
  flex: 1;
  display: flex;
  background-color: #fff;
  margin-top: 8rpx;
  overflow: hidden;
}

/* 左侧分类栏 */
.category-list {
  width: $category-width;
  height: 100%;
  background-color: #f5f0e6;
}

.category-item {
  height: 75rpx;
  line-height: 75rpx;
  text-align: center;
  font-size: 30rpx;
  color: #333;
  cursor: pointer;

  &.active {
    background-color: #fff;
    color: $green-light;
    font-weight: 500;
  }
}

/* 右侧标签区域 */
.tag-container {
  flex: 1;
  height: 100%;
  padding: 15rpx 10rpx;
}

.tag-rows {
  width: 100%;
}

.tag-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8rpx;
}

.tag {
  height: $tag-height;
  line-height: $tag-height;
  padding: 0 20rpx;
  margin-right: 12rpx;
  background-color: #ffffff; 
  border: 1rpx solid #e0e0e0;
  border-radius: 6rpx;
  font-size: 24rpx;
  color: #333;
  white-space: nowrap;

  &:last-child {
    margin-right: 0;
  }
}
</style>