"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      selectedTab: 0,
      isHovering: [],
      // 存储列表项hover状态
      // 图标路径
      searchIcon: "/static/搜索.png",
      // 请确保图标路径正确
      filterIcon: "/static/筛选.png",
      // 请确保图标路径正确
      arrowIcon: "/static/右箭头.png",
      // 请确保图标路径正确
      // 分类标签数据
      categoryTabs: [
        { name: "益脾胃" },
        { name: "化痰" },
        { name: "止咳" },
        { name: "辛凉解表" },
        { name: "补气" },
        { name: "补血" },
        { name: "滋阴" },
        { name: "壮阳" }
      ],
      // 完整饮食项数据（包含海马酒之后的5项）
      dietItems: [
        {
          title: "八珍汤",
          desc: "《良药性膳》；补益气血、健脾养胃、滋阴和血。；羊肉500-1000...",
          image: "/static/八珍汤.png"
        },
        {
          title: "花生糖",
          desc: "《中国药膳大辞典》；润肺化痰、止咳。；花生米250克，冰糖200...",
          image: "/static/花生糖.png"
        },
        {
          title: "田七鸡",
          desc: "《中国药膳大辞典》；补血益气调经。；田七6g，枸杞30g，仔鸡1...",
          image: "/static/田七鸡.png"
        },
        {
          title: "木瓜汤",
          desc: "《中国药膳大辞典》；祛湿舒筋。；木瓜1个，蜜150ml，生姜适量...",
          image: "/static/木瓜汤.png"
        },
        {
          title: "杏仁茶",
          desc: "《中国药膳大辞典》；止咳定喘、润肠通便。；苦杏仁、上白粳米...",
          image: "/static/杏仁茶.png"
        },
        {
          title: "白萝卜茶",
          desc: "《糖尿病食疗智慧》；清热解毒、降血糖。；白萝卜100g，茶叶...",
          image: "/static/白萝卜茶.png"
        },
        {
          title: "海马酒",
          desc: "《中国药膳大辞典》；补肾壮阳、活血化瘀。；海马1对，白酒500...",
          image: "/static/海马酒.png"
        },
        {
          title: "跌打损伤药酒",
          desc: "《中国药膳大辞典》；活血化瘀。；当归、生地、五加皮各3...",
          image: "/static/跌打损伤药酒.png"
        },
        {
          title: "地黄酒",
          desc: "《中国药膳大辞典》；补虚弱、壮筋骨、通血脉。；生地黄绞...",
          image: "/static/地黄酒.png"
        },
        {
          title: "苦瓜汁",
          desc: "《食疗本草学》；清热燥湿解毒。；苦瓜1个。；本品适用于湿热泄...",
          image: "/static/苦瓜汁.png"
        },
        {
          title: "葫芦茶",
          desc: "《中国药膳大辞典》；润肺生津、滋胃养阴。；葫芦茶30-50克， ...",
          image: "/static/葫芦茶.png"
        },
        {
          title: "三七蒸鸡",
          desc: "《延年益寿妙方》；散瘀定痛、益气养血。；母鸡1500g，三七2...",
          image: "/static/三七蒸鸡.png"
        }
      ]
    };
  },
  onLoad() {
    this.isHovering = new Array(this.dietItems.length).fill(false);
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
      },
      fail: () => {
        this.statusBarHeight = 20;
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
      common_vendor.index.navigateBack({ delta: 1 });
    },
    // 显示更多菜单
    showMore() {
      common_vendor.index.showActionSheet({
        itemList: ["关于我们", "使用帮助", "意见反馈"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/jiankangyinshi/jiankangyinshi.vue:185", "更多选项", res.tapIndex);
        }
      });
    },
    // 显示筛选菜单
    showFilter() {
      common_vendor.index.showActionSheet({
        itemList: ["按功效筛选", "按食材筛选", "按难度筛选", "按烹饪时间筛选"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/jiankangyinshi/jiankangyinshi.vue:195", "筛选选项", res.tapIndex);
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
      this.playBounceEffect(".diet-item--hover");
      common_vendor.index.navigateTo({
        url: `/pages/diet-detail/detail?title=${encodeURIComponent(item.title)}`
      });
    },
    // 添加回弹动画效果
    playBounceEffect(selector) {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(selector).boundingClientRect((data) => {
        if (data) {
          const animation = common_vendor.index.createAnimation({
            duration: 400,
            timingFunction: "ease"
          });
          animation.scale(0.95, 0.95).step({ duration: 100 });
          animation.scale(1.05, 1.05).step({ duration: 150 });
          animation.scale(1, 1).step({ duration: 150 });
          this.animation = animation;
          this.$nextTick(() => {
            query.select(selector).fields({
              node: true,
              size: true
            }, (res) => {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.o((...args) => $options.showMore && $options.showMore(...args)),
    d: "url(" + $data.searchIcon + ")",
    e: common_vendor.f($data.categoryTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: common_vendor.o(($event) => $options.selectTab(index), index),
        d: $data.selectedTab === index ? 1 : "",
        e: index
      };
    }),
    f: "url(" + $data.filterIcon + ")",
    g: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args)),
    h: common_vendor.f($data.dietItems, (item, index, i0) => {
      return {
        a: "url(" + item.image + ")",
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: common_vendor.o(($event) => $options.handleItemClick(item), index),
        f: $data.isHovering[index] ? 1 : "",
        g: common_vendor.o(($event) => $options.setHover(index, true), index),
        h: common_vendor.o(($event) => $options.setHover(index, false), index),
        i: common_vendor.o(($event) => $options.setHover(index, false), index)
      };
    }),
    i: "url(" + $data.arrowIcon + ")"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d0db685e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/jiankangyinshi/jiankangyinshi.js.map
