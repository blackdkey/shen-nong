<template>
  <view class="container">
    <!-- 状态栏（与第一个示例相同的方式） -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="goBack" hover-class="nav-btn-hover">＜</view>
      <view class="nav-title">常见中草药</view>
      <view class="nav-right" hover-class="nav-btn-hover">
        <u-icon name="more-dot" color="#ffffff" size="22"></u-icon>
      </view>
    </view>

    <!-- 搜索框 -->
    <view class="search-container">
      <view class="search-box">
        <image src="/static/搜索.png" class="search-icon"></image>
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索中草药名称..." 
          placeholder-style="color: #999;"
          @focus="searchFocus"
          @blur="searchBlur"
        >
      </view>
    </view>

    <!-- 选项卡（功效/药性） -->
    <view class="tab-container">
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 0 }" 
        @click="switchTab(0)"
        hover-class="tab-item-hover"
      >
        <text>功效</text>
        <view class="tab-line" v-if="currentTab === 0"></view>
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 1 }" 
        @click="switchTab(1)"
        hover-class="tab-item-hover"
      >
        <text>药性</text>
        <view class="tab-line" v-if="currentTab === 1"></view>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-container">
      <view class="filter-bar">
        <view 
          class="filter-tag" 
          :class="{ active: activeFilter === index }" 
          v-for="(filter, index) in currentFilters" 
          :key="index"
          @click="changeFilter(index)"
          hover-class="filter-tag-hover"
        >
          {{ filter }}
        </view>
        <view class="filter-btn" @click="showFilter" hover-class="filter-btn-hover">
          <image src="/static/筛选2.png" class="filter-icon"></image>
          <text>筛选</text>
        </view>
      </view>
    </view>

    <!-- 内容区（核心展示区域） -->
    <scroll-view 
      class="content-scroll" 
      scroll-y
      :style="{ height: scrollViewHeight + 'px' }"
    >
      <view class="category-content">
        <!-- 分类标题 -->
        <view class="category-header">
          <text class="category-title">{{ currentCategory.title }}</text>
        </view>
        
        <!-- 功效分类专属子标题 -->
        <view 
          class="category-subtitle" 
          v-if="currentTab === 0 && activeFilter === 0"
        >
          <text class="subtitle-text">发散风寒药</text>
        </view>
        
        <!-- 药材列表 -->
        <view class="herb-list">
          <view 
            class="herb-item" 
            v-for="(herb, index) in currentCategory.herbs" 
            :key="herb.name"
            @click="navToHerbDetail(herb)"
            hover-class="herb-item-hover"
          >
            <image 
              :src="herb.img" 
              class="herb-img" 
              mode="aspectFit"
              @error="handleImageError(index)"
            ></image>
            <view class="herb-info">
              <view class="herb-name">{{ herb.name }}</view>
              <view class="herb-desc">{{ herb.desc }}</view>
            </view>
            <u-icon name="arrow-right" color="#999" size="20"></u-icon>
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
      statusBarHeight: 20, // 默认值，将在onLoad中更新
      scrollViewHeight: 500, // 动态计算后更新
      currentTab: 0, // 0:功效 1:药性
      activeFilter: 0, // 当前选中的筛选标签索引
      
      // 功效分类数据
      effCategories: [
        {
          title: "解表药",
          filters: ["解表药", "清热药", "泻下药", "祛风湿药"],
          herbs: [
            { name: '紫苏', img: '/static/紫苏.jpg', desc: '解表散寒，行气和胃。辛，温。归肺、脾经。' },
            { name: '麻黄', img: '/static/麻黄.jpg', desc: '发汗解表，宣肺平喘，利水消肿。辛、微苦，温。归肺、膀胱经。' },
            { name: '桂枝', img: '/static/桂枝.jpg', desc: '发汗解肌，温通经脉，助阳化气。辛、甘，温。归心、肺、膀胱经。' },
            { name: '生姜', img: '/static/生姜.jpg', desc: '解表散寒，温中止呕，温肺止咳。辛，温。归肺、脾、胃经。' },
            { name: '香薷', img: '/static/香薷.jpg', desc: '发汗解表，化湿和中，利水消肿。辛，微温。归肺、脾、胃经。' }
          ]
        },
        // 其他功效分类数据...
      ],
      
      // 药性分类数据
      propCategories: [
        {
          title: "平",
          filters: ["平", "温", "凉", "寒"],
          herbs: [
            { name: '银杏叶', img: '/static/银杏叶.jpg', desc: '益心敛肺，活血化瘀，通脉舒络，止泻。甘苦、涩，平。归心、肺经。' },
            { name: '仙鹤草', img: '/static/仙鹤草.jpg', desc: '收敛止血，截疟，止痢，解毒，补虚。苦、涩，平。归心、肝经。' },
            { name: '鸡内金', img: '/static/鸡内金.jpg', desc: '健胃消食，涩精止遗，通淋化石。甘，平。归脾、胃、小肠、膀胱经。' },
            { name: '莱菔子', img: '/static/菜菔子.jpg', desc: '消食除胀，降气化痰。辛、甘，平。归脾、胃、肺经。' },
            { name: '麦芽', img: '/static/麦芽.jpg', desc: '行气消食，健脾开胃，回乳消胀。甘，平。归脾、胃经。' }
          ]
        },
        // 其他药性分类数据...
      ]
    };
  },
  computed: {
    // 当前筛选标签列表
    currentFilters() {
      return this.currentTab === 0 
        ? this.effCategories[0].filters 
        : this.propCategories[0].filters;
    },
    // 当前分类数据
    currentCategory() {
      return this.currentTab === 0 
        ? this.effCategories[this.activeFilter] 
        : this.propCategories[this.activeFilter];
    }
  },
  onLoad() {
    this.calcScrollHeight();
    this.initStatusBar();
  },
  methods: {
    // 初始化状态栏高度（与第一个示例相同的方式）
    initStatusBar() {
      uni.getSystemInfo({
        success: (res) => {
          this.statusBarHeight = res.statusBarHeight || 20;
        },
        fail: () => {
          this.statusBarHeight = 20; // 默认值
        }
      });
    },
    
    // 计算滚动区域高度
    calcScrollHeight() {
      const query = uni.createSelectorQuery().in(this);
      query.select('.container').boundingClientRect(data => {
        const windowHeight = uni.getSystemInfoSync().windowHeight;
        const top = data ? data.top : 0;
        this.scrollViewHeight = windowHeight - top - 44 - 36 - 48 - 32; // 减去各组件高度
      }).exec();
    },
    
    // 切换选项卡
    switchTab(index) {
      if (this.currentTab !== index) {
        this.currentTab = index;
        this.activeFilter = 0;
        this.$nextTick(() => {
          this.calcScrollHeight();
        });
      }
    },
    
    // 切换筛选标签
    changeFilter(index) {
      this.activeFilter = index;
    },
    
    // 导航返回
    goBack() {
      uni.navigateBack();
    },
    
    // 搜索框聚焦/失焦
    searchFocus() {
      console.log('搜索框聚焦');
    },
    searchBlur() {
      console.log('搜索框失焦');
    },
    
    // 显示筛选弹窗
    showFilter() {
      uni.showToast({
        title: '筛选功能开发中',
        icon: 'none'
      });
    },
    
    // 跳转药材详情
    navToHerbDetail(herb) {
      uni.navigateTo({
        url: `/pages/herb/detail?name=${encodeURIComponent(herb.name)}`
      });
    },
    
    // 图片加载失败处理
    handleImageError(index) {
      const fallbackImg = '/static/herbs/default.png';
      if (this.currentTab === 0) {
        this.effCategories[this.activeFilter].herbs[index].img = fallbackImg;
      } else {
        this.propCategories[this.activeFilter].herbs[index].img = fallbackImg;
      }
    }
  }
};
</script>

<style>
/* 基础样式 */
page {
  background-color: #f8f8f8;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

/* 状态栏（与第一个示例相同的样式） */
.status-bar {
  width: 100%;
}

/* 导航栏 */
.nav-bar {
  height: 44px;
  background-color: #2d8659;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: relative;
  z-index: 10;
}

.back-btn, .nav-right {
  width: 40px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn-hover {
  opacity: 0.8;
}

.nav-title {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}

/* 搜索框 */
.search-container {
  padding: 10px 15px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 5;
}

.search-box {
  height: 36px;
  background-color: #e7e7e7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.search-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;
}

/* 选项卡 */
.tab-container {
  display: flex;
  background-color: #fff;
  padding: 0;
  margin-bottom: 12px;
  position: relative;
  z-index: 5;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 16px;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #2d8659;
  font-weight: 500;
}

.tab-line {
  width: 30px;
  height: 3px;
  background-color: #2d8659;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.tab-item-hover {
  background-color: rgba(45, 134, 89, 0.05);
}

/* 筛选栏 */
.filter-container {
  padding: 0 15px 12px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 5;
}

.filter-bar {
  display: flex;
  align-items: center;
  height: 32px;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.filter-tag {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.filter-tag.active {
  background-color: #2d8659;
  color: #fff;
}

.filter-tag-hover:not(.active) {
  background-color: #e0e0e0;
}

.filter-btn {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;
}

.filter-btn-hover {
  background-color: #e0e0e0;
}

.filter-icon {
  width: 14px;
  height: 14px;
  margin-right: 5px;
}

/* 内容区（核心滚动区域） */
.content-scroll {
  flex: 1;
  background-color: #ffffff;
  position: relative;
  z-index: 1;
}

.category-content {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 分类标题 */
.category-header {
  padding: 10px 15px;
  background-color: #FFF9E6;
}

.category-title {
  font-size: 15px;
  color: #E6A23C;
  font-weight: normal;
}

/* 子分类标题 */
.category-subtitle {
  padding: 15px 15px 8px;
}

.subtitle-text {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

/* 药材列表 */
.herb-list {
  padding: 0 15px;
}

.herb-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
}

.herb-item:last-child {
  border-bottom: none;
}

.herb-img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  margin-right: 15px;
  background-color: #f5f5f5;
}

.herb-info {
  flex: 1;
  min-width: 0;
}

.herb-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.herb-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.herb-item-hover {
  background-color: #f9f9f9;
}

/* 安全区域适配 */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 媒体查询适配小屏幕 */
@media (max-width: 320px) {
  .herb-img {
    width: 50px;
    height: 50px;
  }
  .herb-name {
    font-size: 15px;
  }
}
</style>