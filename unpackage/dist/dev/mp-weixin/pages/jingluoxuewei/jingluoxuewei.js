"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: 0,
      activeFunc: 0,
      currentMeridianIndex: 0,
      selectedAcupoint: -1,
      isHovering: [],
      // 存储按钮hover状态
      // 图标路径
      defaultArrow: "",
      activeArrow: "/static/左箭头.png",
      searchIcon: "/static/搜索.png",
      filterIcon: "/static/筛选.png",
      // 功能按钮数据
      funcButtons: [
        { name: "设置", icon: "/static/齿轮.png" },
        { name: "解剖", icon: "/static/口罩.png" },
        { name: "画笔", icon: "/static/铅笔.png" },
        { name: "操作", icon: "/static/手掌.png" },
        { name: "分享", icon: "/static/分享.png" },
        { name: "经脉循行", icon: "/static/药片2.png" }
      ],
      // 经络数据
      meridians: Array(12).fill({ name: "肺经", img: "/static/经络.png" }),
      // 底部穴位数据
      bottomAcupoints: [
        { shortName: "中", fullName: "中府", color: "#8A2BE2" },
        { shortName: "云", fullName: "云门", color: "#1E90FF" },
        { shortName: "天", fullName: "天府", color: "#32CD32" },
        { shortName: "侠", fullName: "侠白", color: "#FFA500" },
        { shortName: "尺", fullName: "尺泽", color: "#FF4500" },
        { shortName: "孔", fullName: "孔最", color: "#FF69B4" },
        { shortName: "列", fullName: "列缺", color: "#8B4513" },
        { shortName: "经", fullName: "经渠", color: "#00CED1" },
        { shortName: "太", fullName: "太渊", color: "#FFD700" },
        { shortName: "鱼", fullName: "鱼际", color: "#CD5C5C" }
      ]
    };
  },
  onLoad() {
    this.isHovering = new Array(this.funcButtons.length).fill(false);
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
      },
      fail: () => {
        this.statusBarHeight = 20;
      }
    });
  },
  computed: {
    currentMeridian() {
      return this.meridians[this.currentMeridianIndex];
    }
  },
  methods: {
    // 按钮hover状态管理
    setHover(index, isHover) {
      this.$set(this.isHovering, index, isHover);
    },
    // 返回上一页
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    },
    // 显示筛选菜单
    showFilter() {
      common_vendor.index.showActionSheet({
        itemList: ["经络筛选", "穴位筛选", "高级筛选"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/jingluoxuewei/jingluoxuewei.vue:157", "筛选选项", res.tapIndex);
        }
      });
    },
    // 功能按钮点击
    handleFuncClick(index) {
      this.activeFunc = index;
      this.playBounceEffect(`.func-btn:nth-child(${index + 1})`);
    },
    // 切换经络
    switchMeridian(index) {
      this.currentMeridianIndex = index;
      this.playBounceEffect(`.meridian-item:nth-child(${index + 1})`);
    },
    // 选择穴位
    selectAcupoint(index) {
      this.selectedAcupoint = index;
      this.playBounceEffect(`.nav-item:nth-child(${index + 1})`);
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
    c: "url(" + $data.searchIcon + ")",
    d: "url(" + $data.filterIcon + ")",
    e: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args)),
    f: common_vendor.f($data.funcButtons, (btn, index, i0) => {
      return {
        a: "url(" + btn.icon + ")",
        b: common_vendor.t(btn.name),
        c: index,
        d: common_vendor.o(($event) => $options.handleFuncClick(index), index),
        e: $data.activeFunc === index ? 1 : "",
        f: $data.isHovering[index] ? 1 : "",
        g: common_vendor.o(($event) => $options.setHover(index, true), index),
        h: common_vendor.o(($event) => $options.setHover(index, false), index),
        i: common_vendor.o(($event) => $options.setHover(index, false), index)
      };
    }),
    g: "url(" + $options.currentMeridian.img + ")",
    h: common_vendor.f($data.meridians, (meridian, index, i0) => {
      return {
        a: common_vendor.t(meridian.name),
        b: "url(" + ($data.currentMeridianIndex === index ? $data.activeArrow : $data.defaultArrow) + ")",
        c: index,
        d: common_vendor.o(($event) => $options.switchMeridian(index), index),
        e: $data.currentMeridianIndex === index ? 1 : ""
      };
    }),
    i: common_vendor.f($data.bottomAcupoints, (item, index, i0) => {
      return {
        a: common_vendor.t(item.shortName),
        b: item.color,
        c: common_vendor.t(item.fullName),
        d: index,
        e: common_vendor.o(($event) => $options.selectAcupoint(index), index),
        f: $data.selectedAcupoint === index ? 1 : ""
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cf4cfb2e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/jingluoxuewei/jingluoxuewei.js.map
