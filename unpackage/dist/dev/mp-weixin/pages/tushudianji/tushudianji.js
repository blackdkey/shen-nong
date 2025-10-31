"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 20,
      // 默认值20px
      contentTop: 0,
      // 内容区动态定位
      searchText: "",
      switchStatus: true,
      activeNav: 0,
      // 当前选中导航
      navList: [
        { name: "经典医著", icon: "/static/书.png" },
        { name: "方剂典籍", icon: "/static/展示-叶子.png" },
        { name: "针灸类书", icon: "/static/齿轮.png" },
        { name: "养生保健", icon: "/static/爱心.png" },
        { name: "现代医论", icon: "/static/医院.png" }
      ],
      books: [
        {
          title: "黄帝内经",
          author: "佚名",
          publisher: "中医古籍出版社",
          description: "中医理论的奠基之作，是中国现存最早的医学典籍，由《素问》和《灵枢》两部分组成。",
          cover: "https://vcg00.cfp.cn/creative/vcg/800/new/VCG211399529876.jpg"
        },
        {
          title: "伤寒论",
          author: "张仲景",
          publisher: "人民卫生出版社",
          description: "汉代医学家张仲景所著的中医经典著作，是中医临床辨证论治的奠基之作。",
          cover: "https://vcg00.cfp.cn/creative/vcg/800/new/VCG211359302921.jpg"
        },
        {
          title: "金匮要略",
          author: "张仲景",
          publisher: "中国中医药出版社",
          description: "与《伤寒论》合称为《伤寒杂病论》，是中医临床的经典著作之一。",
          cover: "https://vcg00.cfp.cn/creative/vcg/800/new/VCG211308569769.jpg"
        },
        {
          title: "神农本草经",
          author: "佚名",
          publisher: "中医古籍出版社",
          description: "中国现存最早的药物学专著，被誉为中药学经典著作，收载药物365种。",
          cover: "https://vcg00.cfp.cn/creative/vcg/800/new/VCG211359421375.jpg"
        }
      ]
    };
  },
  onLoad() {
    try {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight || 20;
      const navHeight = 50;
      const searchHeight = 66;
      this.contentTop = this.statusBarHeight + navHeight + searchHeight;
    } catch (e) {
      common_vendor.index.__f__("log", "at pages/tushudianji/tushudianji.vue:131", "获取系统信息失败，使用默认值");
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goBookDetail(book) {
      common_vendor.index.navigateTo({
        url: "/pages/bookDetail?title=" + encodeURIComponent(book.title)
      });
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_switch = common_vendor.resolveComponent("u-switch");
  (_component_u_icon + _component_u_switch)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.p({
      name: "more-dot",
      color: "#ffffff",
      size: "22"
    }),
    d: common_vendor.o(($event) => $data.switchStatus = $event),
    e: common_vendor.p({
      size: "24",
      ["active-color"]: "#ffffff",
      ["inactive-color"]: "#ffffff",
      modelValue: $data.switchStatus
    }),
    f: common_vendor.p({
      name: "search",
      color: "#cccccc",
      size: "16"
    }),
    g: $data.searchText,
    h: common_vendor.o(($event) => $data.searchText = $event.detail.value),
    i: common_vendor.f($data.navList, (nav, index, i0) => {
      return {
        a: nav.icon,
        b: common_vendor.t(nav.name),
        c: $data.activeNav === index ? 1 : "",
        d: index,
        e: common_vendor.o(($event) => $data.activeNav = index, index)
      };
    }),
    j: common_vendor.f($data.books, (book, index, i0) => {
      return {
        a: book.cover,
        b: common_vendor.t(book.title),
        c: common_vendor.t(book.author),
        d: common_vendor.t(book.publisher),
        e: common_vendor.t(book.description),
        f: index,
        g: common_vendor.o(($event) => $options.goBookDetail(book), index)
      };
    }),
    k: $data.contentTop + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f52b642"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tushudianji/tushudianji.js.map
