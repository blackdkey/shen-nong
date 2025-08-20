<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    <!-- 自定义导航栏 -->
    <view class="custom-nav">
      <view class="nav-title">每日打卡</view>
    </view>
    
    <!-- 日期信息区域 -->
    <view class="date-info">
      <view class="year-month">2024年1月</view>
      <view class="date-week">1月18日 星期四</view>
      <view class="lunar-date">癸卯年腊月初八</view>
    </view>

    <!-- 星期标题 -->
    <view class="weekdays">
      <view class="weekday">周二</view>
      <view class="weekday">周三</view>
      <view class="weekday">周四</view>
      <view class="weekday">周五</view>
      <view class="weekday">周六</view>
      <view class="weekday">周日</view>
      <view class="weekday">周一</view>
    </view>

    <!-- 日历打卡区域 -->
    <view class="calendar">
      <view class="calendar-day">29<view class="dot"></view></view>
      <view class="calendar-day">30<view class="dot"></view></view>
      <view class="calendar-day">31<view class="dot"></view></view>
      <view class="calendar-day">1<view class="dot"></view></view>
      <view class="calendar-day checked">2<view class="dot active"></view></view>
      <view class="calendar-day">3<view class="dot"></view></view>
      <view class="calendar-day current">4<view class="dot active"></view></view>
    </view>

    <!-- 积分显示区域 -->
    <view class="score-section">
      <view class="score-label">当前积分:</view>
      <view class="score-value">280</view>
      <view class="score-question">?</view>
    </view>

    <!-- 打卡按钮 -->
    <view class="checkin-btn" @click="onCheckinClick">
      点击打卡
    </view>
	<navigator url="/pages/nanxingzhuanqv/nanxingzhuanqv">男性</navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0
    };
  },
  onLoad() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    onCheckinClick() {
      uni.showToast({
        title: '打卡成功',
        icon: 'success'
      });
    }
  }
};
</script>

<style>
/* 状态栏占位 */
.status-bar {
  height: var(--status-bar-height, 0);
  width: 100%;
  background-color: #ffffff;
}

/* 自定义导航栏样式 */
.custom-nav {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  top: var(--status-bar-height, 0);
  left: 0;
  right: 0;
  z-index: 999;
}

.nav-title {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}

.container {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0 15px;
  padding-top: calc(70px + var(--status-bar-height, 0));
  box-sizing: border-box;
}

/* 日期信息样式 */
.date-info {
  text-align: center;
  margin-bottom: 25px;
  padding: 20px 15px;
  background-color: #f7f7f7;
  border-radius: 12px;
}

.date-info .year-month {
  font-size: 22px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 8px;
}

.date-info .date-week {
  font-size: 16px;
  color: #555555;
  margin-bottom: 5px;
}

.date-info .lunar-date {
  font-size: 14px;
  color: #777777;
}

/* 星期标题样式 */
.weekdays {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.weekdays .weekday {
  width: 14.28%;
  text-align: center;
  font-size: 14px;
  color: #666666;
}

/* 日历样式 */
.calendar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.calendar .calendar-day {
  width: 14.28%;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666666;
  position: relative;
}

.calendar .calendar-day.checked {
  color: #187a11;
}

.calendar .calendar-day.current {
  color: #333333;
  font-weight: 500;
  position: relative;
}

.calendar .calendar-day.current::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #187a11;
}

/* 日期下方的点 */
.calendar .dot {
  position: absolute;
  bottom: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #d0d0d0;
}

.calendar .dot.active {
  background-color: #187a11;
}

/* 积分显示样式 */
.score-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 15px;
  background-color: #f7f7f7;
  border-radius: 12px;
  margin-bottom: 30px;
}

.score-section .score-label {
  font-size: 16px;
  color: #555555;
  margin-right: 8px;
}

.score-section .score-value {
  font-size: 18px;
  font-weight: 500;
  color: #187a11;
  margin-right: 12px;
}

.score-section .score-question {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #d0d0d0;
  color: #777777;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 打卡按钮样式 */
.checkin-btn {
  width: 100%;
  height: 52px;
  background-color: #187a11;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  box-shadow: 0 2px 5px rgba(24, 122, 17, 0.2);
}
</style>