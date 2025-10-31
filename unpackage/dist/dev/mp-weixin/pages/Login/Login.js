"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 20
    };
  },
  onLoad() {
    this.initStatusBar();
  },
  methods: {
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
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  _component_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.p({
      name: "more-dot",
      color: "#ffffff",
      size: "22"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-461d1d79"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Login/Login.js.map
