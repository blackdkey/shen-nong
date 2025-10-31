"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      // 状态栏高度
      activeCategory: 0,
      // 当前激活分类索引（默认内科）
      categories: [
        { name: "内科", active: true },
        { name: "骨伤科", active: false },
        { name: "五官科", active: false },
        { name: "皮外伤科", active: false },
        { name: "急症", active: false },
        { name: "其他病症", active: false },
        { name: "儿科", active: false },
        { name: "妇科", active: false }
      ]
    };
  },
  onLoad() {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_assets._imports_0,
    d: common_vendor.f($data.categories, (category, idx, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: $data.activeCategory === idx ? 1 : "",
        c: idx,
        d: common_vendor.o(($event) => $data.activeCategory = idx, idx)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bddd4350"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/yianku/yianku.js.map
