"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 20,
      // 默认值20 20, // 默认值20px
      isClicking: [false, false, false, false, false, false],
      activeTag: 0,
      funcItems: [
        { name: "体质自测", icon: "/static/自己-01.png" },
        { name: "症状自检", icon: "/static/医防结合.png" },
        { name: "肾虚调理", icon: "/static/药片1.png" },
        { name: "脱发防治", icon: "/static/头颅CT.png" },
        { name: "精力提升", icon: "/static/精力-copy.png" },
        { name: "食疗推荐", icon: "/static/刀叉.png" }
      ],
      topicModules: [
        {
          img: "/static/男1.png",
          title: "前列腺保健指南",
          desc: "从中医角度探讨前列腺健康",
          likeCount: "2.5万"
        },
        {
          img: "/static/男2.png",
          title: "肾虚自测方法",
          desc: "10个信号提示你该调理了",
          likeCount: "1.8万"
        },
        {
          img: "/static/男3.png",
          title: "四季养生食谱",
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
      common_vendor.index.__f__("log", "at pages/nanxingzhuanqv/nanxingzhuanqv.vue:107", "获取状态栏高度失败，使用默认值");
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
      return ["前列腺", "脾胃", "睡眠", "性功能"];
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/nanxingzhuanqv/nanxingzhuanqv.js.map
