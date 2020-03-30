<template>
  <div
    v-if="tabsInfo"
    :class="[
      tabsInfo.slotTitle?'s-tab-nav':'s-tab-wrap',
      {'is-active':isActive},
      {'is-disabled':disabled}
    ]"
    :style="tabsInfo.slotTitle?(tabsInfo.navWidth+'color:'+(isActive?tabsInfo.activeColor:tabsInfo.color)):''"
    @click="navClick"
  >
    <slot v-if="tabsInfo.slotTitle"></slot>
    <div v-else class="s-tab-panel">
      <slot v-if="!tabsInfo.lazyRender||info.isRender"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-tab',
  inject: ['$tabs'],
  props: {
    // 导航标题
    title: {
      default: ''
    },
    // 是否禁用导航
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      info: {
        title: '',
        disabled: false,
        isRender: false
      }
    };
  },
  watch: {
    title: {
      immediate: true,
      handler () {
        this.info.title = this.title;
      }
    },
    disabled: {
      immediate: true,
      handler () {
        this.info.disabled = this.disabled;
      }
    }
  },
  computed: {
    isActive () {
      return this.$tabs.navContextList.length && this.$tabs.navContextList[this.$tabs.active] == this;
    },
    tabsInfo () {
      const $tabs = this.$tabs;
      return {
        slotTitle: $tabs.slotTitle,
        navWidth: $tabs.navWidth,
        color: $tabs.color,
        activeColor: $tabs.activeColor,
        lazyRender: $tabs.lazyRender
      };
    }
  },
  methods: {
    navClick () {
      if (this.$tabs.slotTitle) {
        this.$tabs.navContextList.some((item, index) => {
          if (item == this) {
            this.$tabs.navClick(index, item);
            return true;
          }
        });
      }
    }
  },
  created () {
    this.$tabs.navInfoList = this.$tabs.navInfoList.concat(this.info);
    this.$tabs.navContextList = this.$tabs.navContextList.concat(this);
  },
  beforeDestroy () {
    this.$tabs.navInfoList = this.$tabs.navContextList.filter(item => item !== this.info);
    this.$tabs.navContextList = this.$tabs.navContextList.filter(item => item !== this);
  }
};
</script>

<style lang="scss">
.s-tab-nav {
  display: inline-flex;
  height: 100%;
  font-size: 28rpx;
  padding: 0 30rpx;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  cursor: pointer;
  &.is-disabled {
    color: #c8c9cc !important;
    cursor: not-allowed;
  }
}
.s-tab-wrap {
  width: 100%;
  height: 0;
  font-size: 28rpx;
  flex-shrink: 0;
  white-space: normal;
  overflow: hidden;
  box-sizing: border-box;
  &.is-active {
    height: auto;
    overflow: visible;
  }
}
</style>
