<template>
  <view class="page-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部导航栏 -->
    <view class="top-bar">
      <view class="back-btn" @tap="goBack" hover-class="back-btn--hover">＜</view>
      <view class="page-title">健康饮食</view>
      <view class="more-btn" @tap="showMore" hover-class="more-btn--hover">…</view>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-icon" :style="{ backgroundImage: 'url(' + searchIcon + ')' }"></view>
      <input class="search-input" type="text" placeholder="搜索药膳名称..." />
    </view>

    <!-- 分类标签栏 -->
    <view class="category-tabs">
      <scroll-view scroll-x="true" class="tabs-scroll" :scroll-with-animation="true">
        <view class="tabs-container">
          <view class="tab-item" 
                v-for="(tab, index) in categoryTabs" 
                :key="index"
                @tap="selectTab(index)"
                :class="{ active: selectedTab === index }"
                :data-index="index">
            {{ tab.name }}
          </view>
          <view class="filter-item" @tap="showFilter" hover-class="filter-item--hover">
            <view class="filter-icon" :style="{ backgroundImage: 'url(' + filterIcon + ')' }"></view>
            <view class="filter-text">筛选</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 主内容区 - 饮食列表 -->
    <view class="main-content">
      <view class="diet-list">
        <!-- 饮食项列表 -->
        <view class="diet-item" 
              v-for="(item, index) in dietItems" 
              :key="index" 
              @tap="handleItemClick(item)"
              :class="{ 'diet-item--hover': isHovering[index] }"
              @touchstart="setHover(index, true)"
              @touchend="setHover(index, false)"
              @touchcancel="setHover(index, false)">
          <view class="item-image" :style="{ backgroundImage: 'url(' + item.image + ')' }"></view>
          <view class="item-info">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-desc">{{ item.desc }}</view>
          </view>
          <view class="item-arrow" :style="{ backgroundImage: 'url(' + arrowIcon + ')' }"></view>
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
      selectedTab: 0,
      isHovering: [], // 存储列表项hover状态
      
      // 图标路径
      searchIcon: '/static/搜索.png',  // 请确保图标路径正确
      filterIcon: '/static/筛选.png',  // 请确保图标路径正确
      arrowIcon: '/static/右箭头.png', // 请确保图标路径正确
      
      // 分类标签数据
      categoryTabs: [
        { name: '益脾胃' },
        { name: '化痰' },
        { name: '止咳' },
        { name: '辛凉解表' },
        { name: '补气' },
        { name: '补血' },
        { name: '滋阴' },
        { name: '壮阳' }
      ],
      
      // 完整饮食项数据（包含海马酒之后的5项）
      dietItems: [
        {
          title: "八珍汤",
          desc: "《良药性膳》；补益气血、健脾养胃、滋阴和血。；羊肉500-1000...",
          image: '/static/八珍汤.png'
        },
        {
          title: "花生糖",
          desc: "《中国药膳大辞典》；润肺化痰、止咳。；花生米250克，冰糖200...",
          image: '/static/花生糖.png'
        },
        {
          title: "田七鸡",
          desc: "《中国药膳大辞典》；补血益气调经。；田七6g，枸杞30g，仔鸡1...",
          image: '/static/田七鸡.png'
        },
        {
          title: "木瓜汤",
          desc: "《中国药膳大辞典》；祛湿舒筋。；木瓜1个，蜜150ml，生姜适量...",
          image: '/static/木瓜汤.png'
        },
        {
          title: "杏仁茶",
          desc: "《中国药膳大辞典》；止咳定喘、润肠通便。；苦杏仁、上白粳米...",
          image: '/static/杏仁茶.png'
        },
        {
          title: "白萝卜茶",
          desc: "《糖尿病食疗智慧》；清热解毒、降血糖。；白萝卜100g，茶叶...",
          image: '/static/白萝卜茶.png'
        },
        {
          title: "海马酒",
          desc: "《中国药膳大辞典》；补肾壮阳、活血化瘀。；海马1对，白酒500...",
          image: '/static/海马酒.png'
        },
        {
          title: "跌打损伤药酒",
          desc: "《中国药膳大辞典》；活血化瘀。；当归、生地、五加皮各3...",
          image: '/static/跌打损伤药酒.png'
        },
        {
          title: "地黄酒",
          desc: "《中国药膳大辞典》；补虚弱、壮筋骨、通血脉。；生地黄绞...",
          image: '/static/地黄酒.png'
        },
        {
          title: "苦瓜汁",
          desc: "《食疗本草学》；清热燥湿解毒。；苦瓜1个。；本品适用于湿热泄...",
          image: '/static/苦瓜汁.png'
        },
        {
          title: "葫芦茶",
          desc: "《中国药膳大辞典》；润肺生津、滋胃养阴。；葫芦茶30-50克， ...",
          image: '/static/葫芦茶.png'
        },
        {
          title: "三七蒸鸡",
          desc: "《延年益寿妙方》；散瘀定痛、益气养血。；母鸡1500g，三七2...",
          image: '/static/三七蒸鸡.png'
        }
      ]
    };
  },
  
  onLoad() {
    // 初始化hover状态数组
    this.isHovering = new Array(this.dietItems.length).fill(false);
    
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
  
  methods: {
    // 列表项hover状态管理
    setHover(index, isHover) {
      this.$set(this.isHovering, index, isHover);
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    
    // 显示更多菜单
    showMore() {
      uni.showActionSheet({
        itemList: ['关于我们', '使用帮助', '意见反馈'],
        success: (res) => {
          console.log('更多选项', res.tapIndex);
        }
      });
    },
    
    // 显示筛选菜单
    showFilter() {
      uni.showActionSheet({
        itemList: ['按功效筛选', '按食材筛选', '按难度筛选', '按烹饪时间筛选'],
        success: (res) => {
          console.log('筛选选项', res.tapIndex);
        }
      });
    },
    
    // 选择分类标签
    selectTab(index) {
      this.selectedTab = index;
      this.playBounceEffect(`.tab-item[data-index="${index}"]`);
    },
    
    // 饮食项点击
    handleItemClick(item) {
      this.playBounceEffect('.diet-item--hover');
      uni.navigateTo({
        url: `/pages/diet-detail/detail?title=${encodeURIComponent(item.title)}`
      });
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
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 状态栏占位 */
.status-bar {
  width: 100%;
}

/* 顶部导航栏 */
.top-bar {
  height: 44px;
  background-color: #2d8c54;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.back-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  border-radius: 50%;
  margin-right: 5px;
  transition: background-color 0.2s;
}
.back-btn--hover {
  background-color: rgba(255,255,255,0.2);
}

.page-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.more-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  border-radius: 50%;
  margin-left: 5px;
  transition: background-color 0.2s;
}
.more-btn--hover {
  background-color: rgba(255,255,255,0.2);
}

/* 搜索框 */
.search-box {
  height: 48px;
  background-color: #fff;
  margin: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
  opacity: 0.5;
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

/* 分类标签栏 */
.category-tabs {
  height: 48px;
  background-color: #fff;
  padding: 0 16px;
}

.tabs-scroll {
  width: 100%;
  height: 100%;
}

.tabs-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.tab-item {
  height: 32px;
  padding: 0 16px;
  margin-right: 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  transition: all 0.2s;
}
.tab-item.active {
  background-color: #2d8c54;
  color: #fff;
}
.tab-item:active {
  opacity: 0.8;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding: 0 12px;
  height: 32px;
  border-radius: 16px;
  transition: background-color 0.2s;
}
.filter-item--hover {
  background-color: #f5f5f5;
}

.filter-icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 4px;
  opacity: 0.6;
}

.filter-text {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

/* 主内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.diet-list {
  padding: 0 16px;
}

/* 饮食项 */
.diet-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s;
}
.diet-item--hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 16px;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-arrow {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
}

/* 动画样式 */
.tab-item, .diet-item {
  transform-origin: center;
  transition: transform 0.3s ease;
}

/* 微信小程序兼容性处理 */
view {
  box-sizing: border-box;
}
</style>