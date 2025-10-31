<template>
  <view class="container">
    <!-- 状态栏占位（统一方法） -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-nav">
      <view class="back-btn" @tap="goBack" hover-class="back-btn--hover">＜</view>
      <view class="nav-center">图书典籍</view>
      <view class="nav-right">
        <u-icon name="more-dot" color="#ffffff" size="22"></u-icon>
        <u-switch v-model="switchStatus" size="24" active-color="#ffffff" inactive-color="#ffffff"></u-switch>
      </view>
    </view>
    
    <!-- 搜索框 -->
    <view class="search-container">
      <view class="search-box">
        <u-icon name="search" color="#cccccc" size="16" class="search-icon"></u-icon>
        <input 
          type="text" 
          placeholder="搜索中医典籍..." 
          v-model="searchText"
          class="search-input"
        >
      </view>
    </view>
    
    <!-- 内容区 -->
    <view class="content-wrapper" :style="{ top: contentTop + 'px' }">
      <scroll-view class="content-scroll" scroll-y>
        <view class="content-container">
          <!-- 左侧导航 -->
          <view class="left-nav">
            <view 
              class="nav-item" 
              :class="{ active: activeNav === index }" 
              v-for="(nav, index) in navList" 
              :key="index"
              @click="activeNav = index"
            >
              <view class="nav-icon">
                <image :src="nav.icon" mode="aspectFit" class="nav-img"></image>
              </view>
              <text class="nav-text">{{ nav.name }}</text>
            </view>
          </view>
          
          <!-- 右侧书籍列表 -->
          <view class="book-list">
            <view 
              class="book-item" 
              v-for="(book, index) in books" 
              :key="index"
              @click="goBookDetail(book)"
            >
              <image :src="book.cover" class="book-cover" mode="aspectFill"></image>
              <view class="book-info">
                <text class="book-title">{{ book.title }}</text>
                <text class="book-author">作者: {{ book.author }}</text>
                <text class="book-publisher">出版社: {{ book.publisher }}</text>
                <text class="book-desc">{{ book.description }}</text>
              </view>
            </view>
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
      statusBarHeight: 20, // 默认值20px
      contentTop: 0, // 内容区动态定位
      searchText: '',
      switchStatus: true,
      activeNav: 0, // 当前选中导航
      navList: [
        { name: '经典医著', icon: '/static/书.png' },
        { name: '方剂典籍', icon: '/static/展示-叶子.png' },
        { name: '针灸类书', icon: '/static/齿轮.png' },
        { name: '养生保健', icon: '/static/爱心.png' },
        { name: '现代医论', icon: '/static/医院.png' }
      ],
      books: [
        {
          title: '黄帝内经',
          author: '佚名',
          publisher: '中医古籍出版社',
          description: '中医理论的奠基之作，是中国现存最早的医学典籍，由《素问》和《灵枢》两部分组成。',
          cover: 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211399529876.jpg'
        },
        {
          title: '伤寒论',
          author: '张仲景',
          publisher: '人民卫生出版社',
          description: '汉代医学家张仲景所著的中医经典著作，是中医临床辨证论治的奠基之作。',
          cover: 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211359302921.jpg'
        },
        {
          title: '金匮要略',
          author: '张仲景',
          publisher: '中国中医药出版社',
          description: '与《伤寒论》合称为《伤寒杂病论》，是中医临床的经典著作之一。',
          cover: 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211308569769.jpg'
        },
        {
          title: '神农本草经',
          author: '佚名',
          publisher: '中医古籍出版社',
          description: '中国现存最早的药物学专著，被誉为中药学经典著作，收载药物365种。',
          cover: 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211359421375.jpg'
        }
      ]
    }
  },
  onLoad() {
    // 同步获取状态栏高度
    try {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 20
      
      // 计算内容区定位（状态栏 + 导航栏 + 搜索框高度）
      const navHeight = 50 // 导航栏高度
      const searchHeight = 66 // 搜索框高度
      this.contentTop = this.statusBarHeight + navHeight + searchHeight
    } catch (e) {
      console.log('获取系统信息失败，使用默认值')
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goBookDetail(book) {
      uni.navigateTo({
        url: '/pages/bookDetail?title=' + encodeURIComponent(book.title)
      })
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
.container {
  position: relative;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 状态栏（统一方法） */
.status-bar {
  width: 100%;
  background-color: #ffffff; /* 与导航栏同色 */
}

/* 导航栏 */
.custom-nav {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #00a651;
  position: sticky;
  top: var(--status-bar-height);
  z-index: 10;
}

.back-btn {
  font-size: 24px;
  color: white;
  margin-right: 12px;
}

.back-btn--hover {
  opacity: 0.8;
}

.nav-center {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 搜索框 */
.search-container {
  padding: 15px;
  background-color: #00a651;
  position: sticky;
  top: calc(var(--status-bar-height) + 50px);
  z-index: 9;
}

.search-box {
  height: 36px;
  background: white;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.search-icon {
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 14px;
  color: #333;
}

/* 内容区 */
.content-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.content-scroll {
  height: 100%;
}

.content-container {
  display: flex;
  min-height: 100%;
  padding-bottom: env(safe-area-inset-bottom);
}

/* 左侧导航 */
.left-nav {
  width: 85px;
  background: white;
  padding-top: 10px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 5px;
  color: #666;
}

.nav-item.active {
  background: #f0f7f3;
  border-radius: 0 15px 15px 0;
  color: #00a651;
}

.nav-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 5px;
}

.nav-img {
  width: 100%;
  height: 100%;
}

.nav-text {
  font-size: 12px;
}

/* 书籍列表 */
.book-list {
  flex: 1;
  padding: 10px 15px 10px 5px;
}

.book-item {
  display: flex;
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
}

.book-cover {
  width: 80px;
  height: 110px;
  border-radius: 4px;
  background: #eee;
}

.book-info {
  flex: 1;
  margin-left: 12px;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  display: block;
}

.book-author, 
.book-publisher {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
  display: block;
}

.book-desc {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>