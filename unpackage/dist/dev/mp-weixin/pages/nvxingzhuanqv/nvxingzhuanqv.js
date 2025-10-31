"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 20,
      // 默认值20px
      isClicking: [false, false, false, false, false, false],
      activeTag: 0,
      funcItems: [
        { name: "月经调理", icon: "/static/月亮.png" },
        { name: "乳腺养护", icon: "/static/花朵.png" },
        { name: "孕产护理", icon: "/static/孕妇护理.png" },
        { name: "抗衰美容", icon: "/static/心脏.png" },
        { name: "更年期指南", icon: "/static/太极.png" },
        { name: "汉方茶饮", icon: "/static/茶.png" }
      ],
      topicModules: [
        {
          img: "/static/女1.png",
          title: "经期调理指南",
          desc: "从中医角度探讨经期健康",
          likeCount: "2.5万"
        },
        {
          img: "/static/女2.png",
          title: "乳腺自检方法",
          desc: "10个信号提示你该调理了",
          likeCount: "1.8万"
        },
        {
          img: "/static/女3.png",
          title: "四季养颜食谱",
          desc: "顺应节气的饮食调理方案",
          likeCount: "3.2万"
        }
      ]
    };
  },
  onLoad() {
    try {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight || 20;
    } catch (e) {
      common_vendor.index.__f__("log", "at pages/nvxingzhuanqv/nvxingzhuanqv.vue:107", "获取状态栏高度失败，使用默认值");
    }
  },
  methods: {
    handleFuncClick(index, name) {
      this.$set(this.isClicking, index, true);
      setTimeout(() => {
        this.$set(this.isClicking, index, false);
        common_vendor.index.showToast({
          title: `进入${name}`,
          icon: "none",
          position: "bottom"
        });
      }, 100);
    },
    goBack() {
      common_vendor.index.navigateBack();
    }
  },
  computed: {
    tags() {
      return ["经期", "乳腺", "孕产", "护肤", "养颜"];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.funcItems, (item, index, i0) => {
      return {
        a: "url(" + item.icon + ")",
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleFuncClick(index, item.name), index),
        e: $data.isClicking[index] ? 1 : ""
      };
    }),
    d: common_vendor.f($options.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: $data.activeTag === index ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $data.activeTag = index, index)
      };
    }),
    e: common_vendor.f($data.topicModules, (module, index, i0) => {
      return {
        a: "url(" + module.img + ")",
        b: common_vendor.t(module.title),
        c: common_vendor.t(module.desc),
        d: common_vendor.t(module.likeCount),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/nvxingzhuanqv/nvxingzhuanqv.js.map
