<template>
  <div class="vp-tree">
    <!-- 数据列表 -->
    <div class="vp-tree-nodes" :class="{'vp-tree-no-detail': !showDetail}" ref="treeAllView">
      <div class="vp-tree-headers"></div>
      <div class="vp-tree-none" v-if="originList.length === 0">NO ORGANIZTION DATA</div>
      <div class="vp-tree-none" v-if="root.length === 0">NO ROOT DATA</div>
    </div>
    <!-- 数据详细描述 -->
    <div  v-if="showDetail && selected" class="vp-tree-detail">
      <div class="vp-tree-detail-title">
        <span class="psm-icon psm-detail"></span>
        <strong>{{children[selected.id].name}}</strong>
      </div>
      <table>
          <tr class="vp-tree-detail-item" v-for="(detailItem, key) in selected.content">
            <td>
              <strong>{{detailItem.desc}}:</strong>
            </td>
            <td class="animated flipInY" v-if="detailItem.status === 'edit'">
              <vp-input :hasKey="key" :defValue="detailItem.val" @update="onChange"/>
              <span class="psm-icon psm-save" @click.self="onEdit(key)"></span>
            </td>
            <td class="animated flipInX" v-else>
              <span class="vp-tree-detail-key">{{detailItem.val}}</span>
              <span class="psm-icon psm-edit" @click.self="onEdit(key)" v-if="!detailItem.notEdit"></span>
            </td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import vpInput from '../../common/input';

    /**
     * list的数据结构
      [
        {
          id: 'sample-1',
          name: 'xxxxx',
          parentId: 'sample-5',
          children: ['sample-2', 'sample-3', 'sample-4'],
          detail: {
            itemName: {
              desc: '数量',
              val: '20000000000',
            },
            itemOther: {
              desc: 'SAMPLE OTHER KEY',
              val: 'SAMPLE OTHER',
            },
          },
        },
        {
          id: 'sample-2',
          name: '?????',
          parentId: 'sample-1',
          children: ['sample-3', 'sample-4'],
          detail: {
            itemName: {
              desc: 'SAMPLE KEY NAME',
              val: 'SAMPLE NAME',
            },
          },
          },
      ]
  */

  export default {
    components: {
      vpInput,
    },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      isShowDetail: {
        type: Boolean,
        default: true,
      },
      disableEdit: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        showDetail: this.isShowDetail,
        originList: this.list,
        selected: null,
        selectedDom: null,
        inputData: null,
        root: [],
        children: {},
      };
    },
    watch: {
      isShowDetail(is) {
        this.showDetail = is;
      },
      list(data) {
        this.originList = data;
      },
    },
    mounted() {
      const { originList } = this;
      const { treeAllView } = this.$refs;
      let { root, children } = this;
      // 避免热点渲染时重复添加, root是接入的数据筛选没有父级的节点，这些节点为根节点。
      // 数据以归类的方式进行数据查找， id值是索引。
      root = [];
      children = {};
      originList.map((itemDat) => {
        const item = itemDat;
        item.status = 0;  // 0: close, 1: open
        if (item.parentId === null) {
          root.push(item.id);
        }
        children[item.id] = item;
        return item;
      });
      this.root = root;
      this.children = children;
      this.onNextTree(treeAllView, {
        detail: null,
        status: 0,
        children: root,
        openItem: [],
      });
    },
    methods: {
      // 子节点结构
      childDom(itemDat = {}) {
        const folderStatus = itemDat.status ? 'psm-open-folder' : 'psm-folder';
        const folderIsEmpty = itemDat.children.length === 0 ? 'empty-folder' : '';
        return `<div class="vp-tree-folder-header">
            <span class="psm-icon ${folderStatus} ${folderIsEmpty}"></span>
            <span>${itemDat.name}</span>
          </div>
        </div>`;
      },
      // 关闭级联下的所有子节点
      closeFolderChild(item) {
        const { children } = this;
        item.children.map((cid) => {
          const child = children[cid];
          child.status = 0;
          this.closeFolderChild(child);
          return cid;
        });
      },
      // 关闭
      folderClose(Dom, item) {
        const { children } = Dom;
        this.closeFolderChild(item);
        for (let i = 0; i < children.length; i += 1) {
          let child = children[i];
          if (child.className.indexOf('vp-tree-folder-header') < 0) {
            Dom.removeChild(child);
            child = null;
          }
        }
      },
      // 处理详情数据
      processDetailData(item) {
        const { id, detail } = item;
        const { isShowDetail } = this;
        if (detail && isShowDetail) {
          const detailList = Object.entries(detail);
          const detailLink = detail;
          detailList.map((express) => {
            const k = express[0];
            const v = express[1];
            v.status = 'normal';
            detailLink[k] = v;
            return express;
          });
          this.selected = {
            id,
            content: detailLink,
          };
        }
        this.$emit('selected', item);
      },
      // 创建一个层级
      createNewLayer(item) {
        const vueDom = this;
        const { children } = this;
        const rootChild = document.createElement('ul');
        rootChild.className = 'vp-tree-nodes-view animated fadeIn';
        rootChild.style.marginLeft = `${8 / 12}em`;
        item.children.map((cid) => {
          const cItem = children[cid];
          const treeChild = document.createElement('li');
          const treeChildHeader = document.createElement('div');
          treeChild.className = 'vp-tree-nodes-child';
          treeChildHeader.className = 'vp-tree-folder-header';
          treeChildHeader.innerHTML = this.childDom(cItem);
          treeChild.appendChild(treeChildHeader);
          treeChild.onclick = function treeChildSelected(e) {
            const { selectedDom } = vueDom;
            e.stopPropagation();
            if (cItem.children.length > 0) {
              vueDom.onNextTree(treeChild, cItem);
              treeChildHeader.innerHTML = vueDom.childDom(cItem);
            }
            if (selectedDom !== null) {
              const DomClass = selectedDom.className.split(' ');
              const newDomClass = [];
              DomClass.map((name) => {
                if (name !== 'vp-tree-selected') newDomClass.push(name);
                return name;
              });
              selectedDom.className = newDomClass.join(' ');
            }
            const currentDomClassName = this.className.split(' ');
            currentDomClassName.push('vp-tree-selected');
            vueDom.selectedDom = this;
            vueDom.selectedDom.className = currentDomClassName.join(' ');
            vueDom.processDetailData(cItem);
          };
          rootChild.appendChild(treeChild);
          return cid;
        });
        return rootChild;
      },
      // 开启
      folderOpen(Dom, itemDat) {
        Dom.appendChild(this.createNewLayer(itemDat));
      },
      // 展示该节点的子节点
      onNextTree(Dom, itemDat) {
        const item = itemDat;
        const { status } = item;
        item.status = status ? 0 : 1;
        return status === 1 ? this.folderClose(Dom, item) : this.folderOpen(Dom, item);
      },
      // 编辑输入时
      onChange(data) {
        this.inputData = data;
        this.$emit('update', data);
      },
      // 触发 & 取消编辑状态
      onEdit(key) {
        const { selected, inputData } = this;
        const target = selected.content[key];
        // 保存 & 清理输入内容
        if (target.status === 'normal') {
          target.status = 'edit';
        } else {
          target.status = 'normal';
          target.val = typeof inputData === 'object' && inputData !== null && key in inputData ? inputData[key] : target.val;
          this.inputData = target.status === 'normal' ? null : inputData;
        }
        selected.content[key] = target;
        selected.content = Object.assign({}, selected.content);
        if (target.status === 'normal') {
          const treeData = { id: selected.id };
          Object.entries(selected.content).map((kv) => {
            const [k, v] = kv;
            treeData[k] = v.val;
            return kv;
          });
          this.$emit('edit', treeData);
        }
      },
    },
  };
</script>
