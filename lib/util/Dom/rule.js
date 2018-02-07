'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  className: 'ruler',

  evtCallback: null,

  getStyle: function getStyle() {
    var name = '.' + this.className;

    return '\n     ' + name + ' {\n       position: absolute;\n       top: 0;\n       left: 0;\n       font-size: 12px;\n     }\n\n     ' + name + '-x-unit,\n     ' + name + '-y-unit {\n       z-index: 999;\n       background-color: #fff;\n     }\n\n     ' + name + '-x {\n       position: absolute;\n       top: -10px;\n       left: 0;\n       width: 100%;\n       height: 10px;\n       text-align: center;\n       color: #c00;\n     }\n\n     ' + name + '-x-top {\n       margin-top: 5px;\n       border-top: 1px solid #c00;\n     }\n\n     ' + name + '-x-left {\n       position: absolute;\n       top: 0;\n       left: 0;\n       height: 10px;\n       border-left: 1px solid #c00;\n     }\n\n     ' + name + '-x-right {\n       position: absolute;\n       top: 0;\n       right: 0;\n       height: 10px;\n       border-right: 1px solid #c00;\n     }\n\n     ' + name + '-y {\n       position: absolute;\n       top: 0;\n       left: -10px;\n       font-size: 12px;\n       color: #c00;\n     }\n\n     ' + name + '-y-top {\n       position: absolute;\n       top: 0;\n       left: 0;\n       width: 10px;\n       border-top: 1px solid #c00;\n     }\n\n     ' + name + '-y-bottom {\n       position: absolute;\n       bottom: 0;\n       left: 0;\n       width: 10px;\n       border-top: 1px solid #c00;\n     }\n\n     ' + name + '-y-left {\n       position: absolute;\n       top: 0;\n       margin-left: 5px;\n       height: 100%;\n       border-left: 1px solid #c00;\n     }\n    ';
  },


  // 创建标尺
  create: function create(n, w, h, t, l) {
    var ruler = document.createElement('div');
    var ruleUnit = 'px';
    var ruleClass = this.className;
    var ruleStyle = 'top:' + t + 'px; left:' + l + 'px; width:' + w + 'px; height:' + h + 'px;';
    var ruleXStyle = 'position:relative; top:-6px;';

    var x = '<div class="' + ruleClass + '-x">\n     <div class="' + ruleClass + '-x-top"></div>\n     <div class="' + ruleClass + '-x-left"></div>\n     <div class="' + ruleClass + '-x-right"></div>\n     <span class="' + ruleClass + '-x-unit" style="' + ruleXStyle + '">\n       ' + w + ruleUnit + '/' + n + '\n     </span>\n   </div>';

    var y = '<div class="' + ruleClass + '-y" style="height:' + h + 'px;line-height:' + h + 'px;">\n     <div class="' + ruleClass + '-y-top"></div>\n     <div class="' + ruleClass + '-y-bottom"></div>\n     <div class="' + ruleClass + '-y-left"></div>\n     <span class="' + ruleClass + '-y-unit">\n       ' + h + ruleUnit + '/' + n + '\n     </span>\n   </div>';

    ruler.innerHTML = '<div class="' + ruleClass + '" style="' + ruleStyle + '">\n      ' + x + '\n      ' + y + '\n    </div>';

    return ruler;
  },


  // 创建容器
  createMeasureContainer: function createMeasureContainer() {
    var className = this.className + '-measure';
    var rulerMeasure = document.querySelector('.' + className);
    if (!rulerMeasure) {
      var containerStyle = document.createElement('style');
      var area = document.createElement('div');
      area.className = className;
      containerStyle.innerHTML = this.getStyle();
      document.body.appendChild(containerStyle);
      document.body.appendChild(area);
    } else {
      rulerMeasure.innerHTML = '';
    }
  },


  // 创建度量内容
  createMeasureContent: function createMeasureContent(container, c) {
    if (!container) return;
    var tn = c.tagName.toLowerCase();
    var cn = c.className !== '' ? '(' + c.className + ')' : '';
    var tid = c.id !== '' ? '(' + c.id + ')' : '';
    var n = '' + tn + cn + tid;
    var t = _base2.default.getOffsetTop(c);
    var l = _base2.default.getOffsetLeft(c);
    var w = c.offsetWidth;
    var h = c.offsetHeight;
    var ruler = this.create(n, w, h, t, l);
    container.appendChild(ruler);
  },
  unbindResize: function unbindResize() {
    window.removeEventListener('resize', this.evtCallback, false);
  },
  bindResize: function bindResize(type, target) {
    var _this = this;

    this.unbindResize();

    switch (type) {
      case 'all':
        this.evtCallback = function (e) {
          return _this.measureAll(target);
        };
        break;
      case 'click':
        this.evtCallback = function (e) {
          return _this.measureByClick(target);
        };
        break;
      default:
    }

    window.addEventListener('resize', this.evtCallback, false);
  },
  getContainer: function getContainer() {
    var className = this.className + '-measure';
    var rulerMeasure = document.querySelector('.' + className);
    return rulerMeasure;
  },
  closeMeasure: function closeMeasure() {
    var clickTarget = this.clickTarget;

    var rulerMeasure = this.getContainer();
    this.unbindResize();
    if (!rulerMeasure) return;
    if (!rulerMeasure.parentNode) return;
    rulerMeasure.parentNode.removeChild(rulerMeasure);
    rulerMeasure = null;
  },


  // 双击执行度量
  measureByClick: function measureByClick(target) {
    var _this2 = this;

    this.createMeasureContainer();
    var clickEvtHappen = function clickEvtHappen(e) {
      _this2.bindResize('click', e.target);
      _this2.createMeasureContent(_this2.getContainer(), e.target);
    };
    target.addEventListener('click', clickEvtHappen, false);
  },


  // 度量目标内的所有子元素
  measureAll: function measureAll(dom) {
    var _this3 = this;

    if (!dom) return;
    var child = dom.getElementsByTagName('*');
    var childArr = [];
    for (var i = 0; i < child.length; i += 1) {
      childArr.push(child[i]);
    }
    this.createMeasureContainer();
    childArr.map(function (child) {
      _this3.createMeasureContent(_this3.getContainer(), child);
    });
    this.bindResize('all', dom);
  }
};