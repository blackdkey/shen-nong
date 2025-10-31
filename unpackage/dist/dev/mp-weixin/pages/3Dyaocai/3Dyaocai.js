"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 20,
      // 默认值，将在onLoad中更新
      scrollViewHeight: 500,
      // 动态计算后更新
      currentTab: 0,
      // 0:功效 1:药性
      activeFilter: 0,
      // 当前选中的筛选标签索引
      // 功效分类数据
      effCategories: [
        {
          title: "解表药",
          filters: ["解表药", "清热药", "泻下药", "祛风湿药"],
          herbs: [
            { name: "紫苏", img: "/static/紫苏.jpg", desc: "解表散寒，行气和胃。辛，温。归肺、脾经。" },
            { name: "麻黄", img: "/static/麻黄.jpg", desc: "发汗解表，宣肺平喘，利水消肿。辛、微苦，温。归肺、膀胱经。" },
            { name: "桂枝", img: "/static/桂枝.jpg", desc: "发汗解肌，温通经脉，助阳化气。辛、甘，温。归心、肺、膀胱经。" },
            { name: "生姜", img: "/static/生姜.jpg", desc: "解表散寒，温中止呕，温肺止咳。辛，温。归肺、脾、胃经。" },
            { name: "香薷", img: "/static/香薷.jpg", desc: "发汗解表，化湿和中，利水消肿。辛，微温。归肺、脾、胃经。" }
          ]
        }
        // 其他功效分类数据...
      ],
      // 药性分类数据
      propCategories: [
        {
          title: "平",
          filters: ["平", "温", "凉", "寒"],
          herbs: [
            { name: "银杏叶", img: "/static/银杏叶.jpg", desc: "益心敛肺，活血化瘀，通脉舒络，止泻。甘苦、涩，平。归心、肺经。" },
            { name: "仙鹤草", img: "/static/仙鹤草.jpg", desc: "收敛止血，截疟，止痢，解毒，补虚。苦、涩，平。归心、肝经。" },
            { name: "鸡内金", img: "/static/鸡内金.jpg", desc: "健胃消食，涩精止遗，通淋化石。甘，平。归脾、胃、小肠、膀胱经。" },
            { name: "莱菔子", img: "/static/菜菔子.jpg", desc: "消食除胀，降气化痰。辛、甘，平。归脾、胃、肺经。" },
            { name: "麦芽", img: "/static/麦芽.jpg", desc: "行气消食，健脾开胃，回乳消胀。甘，平。归脾、胃经。" }
          ]
        }
        // 其他药性分类数据...
      ]
    };
  },
  computed: {
    // 当前筛选标签列表
    currentFilters() {
      return this.currentTab === 0 ? this.effCategories[0].filters : this.propCategories[0].filters;
    },
    // 当前分类数据
    currentCategory() {
      return this.currentTab === 0 ? this.effCategories[this.activeFilter] : this.propCategories[this.activeFilter];
    }
  },
  onLoad() {
    this.calcScrollHeight();
    this.initStatusBar();
  },
  methods: {
    // 初始化状态栏高度（与第一个示例相同的方式）
    initStatusBar() {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          this.statusBarHeight = res.statusBarHeight || 20;
        },
        fail: () => {
          this.statusBarHeight = 20;
        }
      });
    },
    // 计算滚动区域高度
    calcScrollHeight() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".container").boundingClientRect((data) => {
        const windowHeight = common_vendor.index.getSystemInfoSync().windowHeight;
        const top = data ? data.top : 0;
        this.scrollViewHeight = windowHeight - top - 44 - 36 - 48 - 32;
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
      common_vendor.index.navigateBack();
    },
    // 搜索框聚焦/失焦
    searchFocus() {
      common_vendor.index.__f__("log", "at pages/3Dyaocai/3Dyaocai.vue:225", "搜索框聚焦");
    },
    searchBlur() {
      common_vendor.index.__f__("log", "at pages/3Dyaocai/3Dyaocai.vue:228", "搜索框失焦");
    },
    // 显示筛选弹窗
    showFilter() {
      common_vendor.index.showToast({
        title: "筛选功能开发中",
        icon: "none"
      });
    },
    // 跳转药材详情
    navToHerbDetail(herb) {
      common_vendor.index.navigateTo({
        url: `/pages/herb/detail?name=${encodeURIComponent(herb.name)}`
      });
    },
    // 图片加载失败处理
    handleImageError(index) {
      const fallbackImg = "/static/herbs/default.png";
      if (this.currentTab === 0) {
        this.effCategories[this.activeFilter].herbs[index].img = fallbackImg;
      } else {
        this.propCategories[this.activeFilter].herbs[index].img = fallbackImg;
      }
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  _component_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.p({
      name: "more-dot",
      color: "#ffffff",
      size: "22"
    }),
    d: common_assets._imports_0,
    e: common_vendor.o((...args) => $options.searchFocus && $options.searchFocus(...args)),
    f: common_vendor.o((...args) => $options.searchBlur && $options.searchBlur(...args)),
    g: $data.currentTab === 0
  }, $data.currentTab === 0 ? {} : {}, {
    h: $data.currentTab === 0 ? 1 : "",
    i: common_vendor.o(($event) => $options.switchTab(0)),
    j: $data.currentTab === 1
  }, $data.currentTab === 1 ? {} : {}, {
    k: $data.currentTab === 1 ? 1 : "",
    l: common_vendor.o(($event) => $options.switchTab(1)),
    m: common_vendor.f($options.currentFilters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter),
        b: $data.activeFilter === index ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.changeFilter(index), index)
      };
    }),
    n: common_assets._imports_1$1,
    o: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args)),
    p: common_vendor.t($options.currentCategory.title),
    q: $data.currentTab === 0 && $data.activeFilter === 0
  }, $data.currentTab === 0 && $data.activeFilter === 0 ? {} : {}, {
    r: common_vendor.f($options.currentCategory.herbs, (herb, index, i0) => {
      return {
        a: herb.img,
        b: common_vendor.o(($event) => $options.handleImageError(index), herb.name),
        c: common_vendor.t(herb.name),
        d: common_vendor.t(herb.desc),
        e: "1383e8c8-1-" + i0,
        f: herb.name,
        g: common_vendor.o(($event) => $options.navToHerbDetail(herb), herb.name)
      };
    }),
    s: common_vendor.p({
      name: "arrow-right",
      color: "#999",
      size: "20"
    }),
    t: $data.scrollViewHeight + "px"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/3Dyaocai/3Dyaocai.js.map
