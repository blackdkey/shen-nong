"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      currentTab: 0
    };
  },
  onLoad() {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index)
        return;
      this.currentTab = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_assets._imports_0,
    d: $data.currentTab === 0 ? 1 : "",
    e: common_vendor.o(($event) => $options.switchTab(0)),
    f: $data.currentTab === 1 ? 1 : "",
    g: common_vendor.o(($event) => $options.switchTab(1)),
    h: $data.currentTab === 2 ? 1 : "",
    i: common_vendor.o(($event) => $options.switchTab(2)),
    j: $data.currentTab === 3 ? 1 : "",
    k: common_vendor.o(($event) => $options.switchTab(3)),
    l: $data.currentTab === 4 ? 1 : "",
    m: common_vendor.o(($event) => $options.switchTab(4)),
    n: common_assets._imports_1,
    o: common_assets._imports_2,
    p: common_assets._imports_3,
    q: common_assets._imports_4,
    r: common_assets._imports_5,
    s: common_assets._imports_6,
    t: common_assets._imports_7,
    v: common_assets._imports_8,
    w: common_assets._imports_9
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e0f7c4f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/zhongyiketang/zhongyiketang.js.map
