<template>
  <view class="login-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 自定义导航栏（固定顶部，绿色，100%宽） -->
    <view class="nav-bar">
      <view class="back-btn" @tap="goBack" hover-class="nav-btn-hover">＜</view>
      <view class="nav-title">登录</view>
      <view class="nav-right" hover-class="nav-btn-hover">
        <u-icon name="more-dot" color="#ffffff" size="22"></u-icon>
      </view>
    </view>

    <!-- Logo / 标题 -->
    <view class="logo-section">
      <text class="title">神农百草</text>
      <text class="subtitle">中医养生 · 调和阴阳</text>
    </view>

    <!-- 登录表单 -->
    <view class="form-container">
      <view class="input-group">
        <input
          class="input-field"
          placeholder="请输入账号"
          placeholder-style="color: #aaa; font-size: 28rpx;"
        />
      </view>
      <view class="input-group">
        <input
          class="input-field"
          type="password"
          placeholder="请输入密码"
          placeholder-style="color: #aaa; font-size: 28rpx;"
        />
      </view>

      <button class="login-btn">登录</button>
    </view>

    <!-- 忘记密码与注册链接 -->
    <view class="footer-links">
      <navigator url="#" class="link">忘记密码？</navigator>
      <navigator url="#" class="link">立即注册</navigator>
    </view>

    <!-- 底部协议 -->
    <view class="footer">
      <text class="agreement">登录即代表同意《用户协议》和《隐私政策》</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 20,
    };
  },
  onLoad() {
    this.initStatusBar();
  },
  methods: {
    initStatusBar() {
      uni.getSystemInfo({
        success: (res) => {
          this.statusBarHeight = res.statusBarHeight || 20;
        },
        fail: () => {
          this.statusBarHeight = 20;
        }
      });
    },
    goBack() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style scoped>
/* 全局背景 */
page {
  background: linear-gradient(135deg, #f9f7f0 0%, #f0e9d8 100%);
  height: 100%;
  font-family: "KaiTi", "STKaiti", serif, "PingFang SC", sans-serif;
}

.status-bar {
  width: 100%;
}

/* 导航栏：确保 100% 宽度，高度固定，绿色不变 */
.nav-bar {
  width: 100%;
  height: 44px;
  background-color: #2d8659;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: relative;
  z-index: 10;
}

.back-btn,
.nav-right {
  width: 40px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.nav-btn-hover {
  opacity: 0.8;
}

.nav-title {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}

/* 页面容器：调整内边距，使内容更居中美观 */
.login-container {
  background-color: #fff8e7;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60rpx;
}

/* Logo 区域：适当增加上边距，避免太靠上 */
.logo-section {
  text-align: center;
  margin: 80rpx 0 100rpx;
  animation: fadeInDown 0.8s ease-out;
}

.title {
  font-size: 64rpx;
  font-weight: bold;
  color: #5a4a42;
  text-shadow: 0 4rpx 12rpx rgba(90, 74, 66, 0.15);
  letter-spacing: 8rpx;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #8b7b70;
  letter-spacing: 4rpx;
}

.form-container {
  width: 100%;
  max-width: 560rpx;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.input-group {
  position: relative;
  margin-bottom: 36rpx;
  width: 100%;
}

.input-field {
  width: 100%;
  height: 96rpx;
  padding: 0 36rpx;
  background: rgba(255, 255, 255, 0.85);
  border: 2rpx solid #e8e0d5;
  border-radius: 16rpx;
  font-size: 30rpx;
  color: #5a4a42;
  box-sizing: border-box;
  transition: all 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(139, 123, 112, 0.08);
}

.input-field:focus {
  border-color: #c1a88f;
  box-shadow: 0 12rpx 32rpx rgba(139, 123, 112, 0.15);
  transform: translateY(-4rpx);
}

.login-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(120deg, #8b7b70, #6a5a4f);
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  border-radius: 18rpx;
  border: none;
  margin-top: 40rpx;
  transition: all 0.3s ease;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 560rpx;
  margin-top: 30rpx;
  padding: 0 36rpx;
  box-sizing: border-box;
}

.link {
  color: #8b7b70;
  font-size: 26rpx;
  text-decoration: none;
  text-align: center;
}

.footer {
  margin-top: 40rpx;
  text-align: center;
  width: 100%;
}

.agreement {
  font-size: 24rpx;
  color: #aaa;
  display: block;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>