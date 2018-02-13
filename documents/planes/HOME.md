# Planes

仅支持CSS3环境下使用。

## 重置默认样式

    <style>
      import 'planes/reset.css';
    </style>

## base

基础样式

    <style>
      import 'planes/base.css';

      html {
        @mixin clear-span; /* 清除外边距 */
        @mixin close-element; /* 封闭 */
        @mixin relieve-close; /* 解除封闭 */
        @mixin full-width;  /* 满宽 */
        @mixin cols,4; /* 列 */
      }
    </style>

## border

.5px边框样式

    <style>
      import 'planes/border.css';

      div {
        @mixin border .demo, #000, 5px; /* 全边框 */
        @mixin border-top .demo, #000;
        @mixin border-border .demo, #000;
        @mixin border-left .demo, #000;
        @mixin border-right .demo, #000;
      }
    </style>

## media

媒体适配

    <style>
      @import 'planes/media-mobile.css'; /* 默认的Mobile适配 */
      @import 'planes/media-pc.css'; /* 默认的PC适配 */
      @import 'planes/media.css'; /* 载入媒体方法 */
      @mixin mediaRoot 560px; /* 依据planes的基准设定计算，基准单位为20px, 基准设备宽度414px */
      @mixin mediaResizeScope 900, 1000, 20; /* 设置新的媒体逻辑尺寸范围 */

      div {
        @mixin pixelToRem 10, padding-bottom; /* 尺寸值为像素值，自动计算媒体适配的REM值 */
      }
    </style>

自定义单位

    <style>
      div {
        padding-bottom: 10pxr; /* 相当于pixelToRem */
        width: 3per; /* 相当于30% */
      }
    </style>
