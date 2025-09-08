<template>
  <view class="container">
    <!-- 顶部白色空间（保持原有高度） -->
    <view class="top-white-space"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-nav">
      <view class="nav-left">
        <u-icon name="arrow-left" color="#ffffff" size="20"></u-icon>
      </view>
      <view class="nav-center">图书典籍</view>
      <view class="nav-right">
        <u-icon name="more-dot" color="#ffffff" size="22"></u-icon>
        <u-switch v-model="switchStatus" size="24" active-color="#ffffff" inactive-color="#ffffff"></u-switch>
      </view>
    </view>
    
    <!-- 自定义搜索框 -->
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
    
    <!-- 内容滚动区 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <!-- 左侧导航栏 -->
        <view class="left-nav">
          <view class="nav-item active">
            <view class="nav-icon">
              <image src="/static/书.png" mode="aspectFit" class="nav-img"></image>
            </view>
            <text class="nav-text">经典医著</text>
          </view>
          <view class="nav-item">
            <view class="nav-icon">
              <image src="/static/展示-叶子.png" aspectFit class="nav-img"></image>
            </view>
            <text class="nav-text">方剂典籍</text>
          </view>
          <view class="nav-item">
            <view class="nav-icon">
              <image src="/static/齿轮.png" mode="aspectFit" class="nav-img"></image>
            </view>
            <text class="nav-text">针灸类书</text>
          </view>
          <view class="nav-item">
            <view class="nav-icon">
              <image src="/static/爱心.png" mode="aspectFit" class="nav-img"></image>
            </view>
            <text class="nav-text">养生保健</text>
          </view>
          <view class="nav-item">
            <view class="nav-icon">
              <image src="/static/医院.png" mode="aspectFit" class="nav-img"></image>
            </view>
            <text class="nav-text">现代医论</text>
          </view>
        </view>
        
        <!-- 右侧典籍列表 -->
        <view class="book-list">
          <view class="book-item" v-for="(book, index) in books" :key="index">
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
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      switchStatus: true,
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
  }
}
</script>

<style scoped>
/* 顶部白色空间（保持原高度不变） */
.top-white-space {
  height: calc(var(--status-bar-height, 0px) + 20px); /* 状态栏高度 + 20px额外留白 */
  background-color: #ffffff;
  width: 100%;
}

/* 自定义导航栏（关键：消除与顶部留白的间距） */
.custom-nav {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #00a651;
  padding: 0 15px;
  position: fixed;
  top: calc(var(--status-bar-height, 0px) + 20px); /* 紧贴顶部留白下方 */
  left: 0;
  right: 0;
  z-index: 999;
}

.nav-left {
  margin-right: 10px;
}

.nav-center {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 搜索框容器（消除内部冗余间距） */
.search-container {
  padding: 5px 15px; /* 最小化内边距 */
  background-color: #00a651;
  position: fixed;
  top: calc(var(--status-bar-height, 0px) + 20px + 50px); /* 紧贴导航栏下方 */
  left: 0;
  right: 0;
  z-index: 998;
}

/* 自定义搜索框样式 */
.search-box {
  background-color: #ffffff;
  border-radius: 8px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}

.search-icon {
  margin-right: 8px;
}

.search-input {
  flex: 0 1 auto;
  height: 100%;
  font-size: 14px;
  color: #333333;
  border: none;
  outline: none;
  background: transparent;
  min-width: 0;
  text-align: center;
}

.search-input::placeholder {
  color: #cccccc;
  font-size: 14px;
  text-align: center;
}

/* 内容滚动区（核心：消除与搜索框的间距） */
.content-scroll {
  width: 100%;
  height: calc(100vh - 50px - 46px - var(--status-bar-height, 0px) - 20px); /* 重新计算高度 */
  position: fixed;
  top: calc(var(--status-bar-height, 0px) + 20px + 50px + 46px); /* 紧贴搜索框底部 */
  left: 0;
  right: 0;
  bottom: 0;
}

/* 内容容器 */
.content-container {
  display: flex;
  min-height: 100%;
  padding-bottom: 20px;
  padding-top: 5px; /* 最小化顶部内边距 */
}

/* 左侧导航栏 */
.left-nav {
  width: 80px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px; /* 减少顶部内边距 */
  margin-right: 10px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 22px; /* 微调间距 */
  color: #666666;
  opacity: 0.7;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
}

.nav-item.active {
  color: #00a651;
  opacity: 1;
  background-color: #f0f7f3;
  border-radius: 0 15px 15px 0;
}

.nav-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f7f3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.nav-img {
  width: 22px;
  height: 22px;
}

.nav-text {
  font-size: 12px;
  text-align: center;
}

/* 右侧典籍列表 */
.book-list {
  flex: 1;
  padding: 5px 15px 0 0; /* 减少顶部内边距 */
}

.book-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 13px;
  margin-bottom: 12px; /* 减少书籍项间距 */
  display: flex;
  gap: 13px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.book-cover {
  width: 80px;
  height: 110px;
  border-radius: 6px;
  flex-shrink: 0;
  background-color: #f5f5f5;
}

.book-info {
  flex: 1;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
  display: block;
}

.book-author, .book-publisher {
  font-size: 12px;
  color: #999999;
  margin-bottom: 2px;
  display: block;
}

.book-desc {
  font-size: 13px;
  color: #666666;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>