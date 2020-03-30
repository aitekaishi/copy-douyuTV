## [s-ui github地址](https://github.com/sldt/s-ui)
## [s-ui 查看演示](https://sldt.github.io/s-ui/unpackage/dist/build/h5/)

# s-tabs

## s-tabs组件参数说明

``` js
{
  // class
  customClass: {
    type: String,
    default: ''
  },
  // v-model双向绑定
  value: {
    type: Number,
    default: 0
  },
  // 使子组件s-tab的slot成为导航的填充内容
  slotTitle: {
    type: Boolean,
    default: false
  },
  // 导航颜色
  color: {
    type: String,
    default: '#333'
  },
  // 导航选中颜色
  activeColor: {
    type: String,
    default: '#406BDC'
  },
  // 导航高度 rpx
  height: {
    type: Number,
    default: 80
  },
  // 导航自适应宽度还是百分比等分
  navPerView: {
    type: [Number, String],
    default: 'auto'
  },
  // 内容部分是否动画切换
  effect: {
    type: Boolean,
    default: false
  },
  // 内容部分动画切换时间
  duration: {
    type: Number,
    default: 0.3
  },
  // 内容部分是否开启延迟渲染（首次切换到标签时才触发内容渲染）
  lazyRender: {
    type: Boolean,
    default: true
  },
  // 是否显示底部条
  line: {
    type: Boolean,
    default: true
  },
  // 底部条颜色
  lineColor: {
    type: String,
    default: '#406BDC'
  },
  // 底部条高度 rpx
  lineHeight: {
    type: Number,
    default: 4
  },
  // 底部条宽度相对于标签宽度比例
  lineScale: {
    type: Number,
    default: 0.6
  }
}
```
## s-tab子组件参数说明

``` js
{
  // 导航标题,内部v-html放置，支持html写法
  title: {
    type: String,
    default: ''
  },
  // 是否禁用导航
  disabled: {
    type: Boolean,
    default: false
  }
}

```
## 事件说明

``` js
change(index)内部导航切换时
render(index)当lazy-render（默认为true）为true时,首次渲染内容时触发

```

## 使用方式

#### template
``` html
<div class="article">
  <p class="title">自定义导航内容</p>
  <p
    class="desc"
  >使用:slot-title="true"时，导航下面的内容区域需自己去写，此时s-tab组件下的slot将成为导航的自定义内容文字填充，此功能可以更灵活地配置导航</p>
  <s-tabs slot-title :nav-per-view="5" v-model="activeTab">
    <s-tab v-for="item of tabList" :key="item">Tab{{item}}</s-tab>
  </s-tabs>
</div>

<div class="article">
  <p class="title">自适应导航宽度</p>
  <s-tabs effect @change="change" @render="render">
    <s-tab title="Tab1">1</s-tab>
    <s-tab title="Tab2222">2</s-tab>
    <s-tab title="Tab33">3</s-tab>
    <s-tab title="Tab444444">4</s-tab>
    <s-tab title="Tab55">5</s-tab>
    <s-tab title="Tab66666">6</s-tab>
  </s-tabs>
</div>

<div class="article">
  <p class="title">自定义导航间距样式</p>
  <s-tabs class="custom-tabs">
    <s-tab title="Tab1">1</s-tab>
    <s-tab title="Tab2">2</s-tab>
  </s-tabs>
</div>
```

#### script
``` js
import sTabs from '@/s-ui/s-tabs';
import sTab from '@/s-ui/s-tab';

export default {
  data () {
    return {
      tabList: [1, 2, 3, 4, 5, 6, 7],
      activeTab: 3
    };
  },
  methods: {
    change (index) {
      console.log('change:', index);
    },
    render (index) {
      console.log('render:', index);
    }
  },
  onLoad () {
  }
};
```
#### style
``` css
.Tabs-Page {
  .article {
    &:not(:first-child) {
      margin-top: 40rpx;
    }
    .title {
      padding: 20rpx;
      font-size: 28rpx;
      text-align: center;
    }
    .desc {
      padding: 0 40rpx;
      font-size: 26rpx;
    }
  }
  /deep/.s-tabs {
    .s-tab-panel {
      padding: 30rpx;
    }
  }
  .custom-tabs {
    /deep/.s-tab-nav-view {
      display: flex;
      justify-content: center;
      .s-tab-nav {
        &:not(:first-child) {
          margin-left: 40rpx;
        }
      }
    }
  }
}
```