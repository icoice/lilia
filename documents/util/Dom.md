# Dom

## util.Dom.base

dom节点处理

    // 获得元素距视窗顶部的距离
    util.Dom.base.getOffsetTop(dom);
    // 获得元素距视窗左侧的距离
    util.Dom.base.getOffsetLeft(dom);

## util.Dom.image

图片处理

    util.Dom.image.base64(image);
    util.Dom.image.create(src);
    util.Dom.image.zoom(image, 0.5, b64 => b64);

## util.Dom.rule

 标尺

    // 标尺对象元素下的所有子元素
    util.Dom.rule.measureAll(dom);
    // 单击标尺对象元素下的所有子元素
    util.Dom.rule.measureByClick(dom);
    // 关闭标尺
    util.Dom.rule.closeMeasure();
