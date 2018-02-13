import base from './base';

export default {
  className: 'ruler',

  evtCallback: null,

  getStyle() {
    const name = `.${this.className}`;

    return `
     ${name} {
       position: absolute;
       top: 0;
       left: 0;
       font-size: 12px;
     }

     ${name}-x-unit,
     ${name}-y-unit {
       z-index: 999;
       background-color: #fff;
     }

     ${name}-x {
       position: absolute;
       top: -10px;
       left: 0;
       width: 100%;
       height: 10px;
       text-align: center;
       color: #c00;
     }

     ${name}-x-top {
       margin-top: 5px;
       border-top: 1px solid #c00;
     }

     ${name}-x-left {
       position: absolute;
       top: 0;
       left: 0;
       height: 10px;
       border-left: 1px solid #c00;
     }

     ${name}-x-right {
       position: absolute;
       top: 0;
       right: 0;
       height: 10px;
       border-right: 1px solid #c00;
     }

     ${name}-y {
       position: absolute;
       top: 0;
       left: -10px;
       font-size: 12px;
       color: #c00;
     }

     ${name}-y-top {
       position: absolute;
       top: 0;
       left: 0;
       width: 10px;
       border-top: 1px solid #c00;
     }

     ${name}-y-bottom {
       position: absolute;
       bottom: 0;
       left: 0;
       width: 10px;
       border-top: 1px solid #c00;
     }

     ${name}-y-left {
       position: absolute;
       top: 0;
       margin-left: 5px;
       height: 100%;
       border-left: 1px solid #c00;
     }
    `;
  },

  // 创建标尺
  create(n, w, h, t, l) {
   const ruler = document.createElement('div');
   const ruleUnit = 'px';
   const ruleClass = this.className;
   const ruleStyle = `top:${t}px; left:${l}px; width:${w}px; height:${h}px;`;
   const ruleXStyle = 'position:relative; top:-6px;';

   const x = `<div class="${ruleClass}-x">
     <div class="${ruleClass}-x-top"></div>
     <div class="${ruleClass}-x-left"></div>
     <div class="${ruleClass}-x-right"></div>
     <span class="${ruleClass}-x-unit" style="${ruleXStyle}">
       ${w}${ruleUnit}/${n}
     </span>
   </div>`;

   const y = `<div class="${ruleClass}-y" style="height:${h}px;line-height:${h}px;">
     <div class="${ruleClass}-y-top"></div>
     <div class="${ruleClass}-y-bottom"></div>
     <div class="${ruleClass}-y-left"></div>
     <span class="${ruleClass}-y-unit">
       ${h}${ruleUnit}/${n}
     </span>
   </div>`;

    ruler.innerHTML = `<div class="${ruleClass}" style="${ruleStyle}">
      ${x}
      ${y}
    </div>`;

    return ruler;
  },

  // 创建容器
  createMeasureContainer() {
    const className = `${this.className}-measure`;
    const rulerMeasure = document.querySelector(`.${className}`);
    if (!rulerMeasure) {
      const containerStyle = document.createElement('style');
      const area = document.createElement('div');
      area.className = className;
      containerStyle.innerHTML = this.getStyle();
      document.body.appendChild(containerStyle);
      document.body.appendChild(area);
    } else {
      rulerMeasure.innerHTML = '';
    }
  },

  // 创建度量内容
  createMeasureContent(container, c) {
    if (!container) return;
    const tn = c.tagName.toLowerCase();
    const cn = c.className !== '' ? `(${c.className})` : '';
    const tid = c.id !== '' ? `(${c.id})` : '';
    const n = `${tn}${cn}${tid}`;
    const t = base.getOffsetTop(c);
    const l = base.getOffsetLeft(c);
    const w = c.offsetWidth;
    const h = c.offsetHeight;
    const ruler = this.create(n, w, h, t, l);
    container.appendChild(ruler);
  },

  unbindResize() {
    window.removeEventListener('resize', this.evtCallback, false);
  },

  bindResize(type, target) {
    this.unbindResize();

    switch (type) {
      case 'all':
        this.evtCallback = e => this.measureAll(target);
        break;
      case 'click':
        this.evtCallback = e => this.measureByClick(target);
        break;
      default:
    }

    window.addEventListener('resize', this.evtCallback, false);
  },

  getContainer() {
    const className = `${this.className}-measure`;
    const rulerMeasure = document.querySelector(`.${className}`);
    return rulerMeasure;
  },

  closeMeasure() {
    const { clickTarget } = this;
    let rulerMeasure = this.getContainer();
    this.unbindResize();
    if (!rulerMeasure) return;
    if (!rulerMeasure.parentNode) return;
    rulerMeasure.parentNode.removeChild(rulerMeasure);
    rulerMeasure = null;
  },

  // 双击执行度量
  measureByClick(target) {
    this.createMeasureContainer();
    const clickEvtHappen = e => {
      this.bindResize('click', e.target);
      this.createMeasureContent(this.getContainer(), e.target);
    };
    target.addEventListener('click', clickEvtHappen, false);
  },

  // 度量目标内的所有子元素
  measureAll(dom) {
    if (!dom) return;
    const child = dom.getElementsByTagName('*');
    const childArr = [];
    for(let i=0; i < child.length; i+=1) {
      childArr.push(child[i]);
    }
    this.createMeasureContainer();
    childArr.map((child) => {
      this.createMeasureContent(this.getContainer(), child);
    });
    this.bindResize('all', dom);
 }
}
