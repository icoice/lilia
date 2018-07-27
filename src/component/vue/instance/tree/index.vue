<template lang='pug'>
  div.lilia-tree(class='lilia')
    div.tree-container(ref='tree')
</template>

<script>
/**
  [
    {
      id: 1,
      name: 'xxxxx',
      parentId: null,
    },
    {
      id: 2,
      name: 'xxxxx',
      parentId: null,
    },
    {
      id: 3,
      name: 'xxxxx',
      parentId: 2,
    },
    {
      id: 4,
      name: 'xxxxx',
      parentId: 2,
    },
    {
      id: 5,
      name: 'xxxxx',
      parentId: 1,
    },
    {
      id: 6,
      name: 'xxxxx',
      parentId: 4,
    },
    {
      id: 3,
      name: 'xxxxx',
      parentId: 1,
    },
  ]
 **/

export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    hasMulti: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.build();
  },
  activated() {
    this.build();
  },
  updated() {
    this.build();
  },
  data() {
    return {
      ...this.createTree(this.list),
      selectList: this.selected,
      nodeGroup: [],
    }
  },
  watch: {
    list(items) {
      const tree = this.createTree(Object.assign([], items));
      this.root = tree.root;
      this.maps = tree.maps;
      this.build();
    },
    selected(list) {
      this.selectList = list;
      this.build();
    },
  },
  methods: {
    // 获得JSON TREE
    createTree(list) {
      const root = [];
      const maps = {};

      list.map((item) => {
        const newItem = Object.assign({}, item);
        newItem.child = [];
        if (item.parentId === null) root.push(newItem.id);
        maps[newItem.id] = newItem;
      });

      Object.entries(maps).map((kv) => {
        const [nid, item] = kv;
        if (maps[item.parentId] && item.parentId !== nid) maps[item.parentId].child.push(nid);
      });

      return { root, maps };
    },
    build() {
      this.nodeGroup = [];
      const tree = this.createNode(this.root);
      this.insertNode(tree);
    },
    // 插入节点
    insertNode(node) {
      const { tree } = this.$refs;
      tree.innerHTML = '';
      tree.appendChild(node);
    },
    // 选择
    nodeSelect(node, n, item) {
      const sel = Object.assign({}, this.hasMulti ? this.selectList : {});
      if (!sel[item.id]) {
        sel[item.id] = item;
      } else {
        delete sel[item.id];
      }
      this.selectList = sel;
      if (!this.hasMulti) {
        this.nodeGroup.map((nd) => {
          nd.className = nd.className.replace('tree-selected', '');
        });
      }
      n.className = !node ?
        `tree-line tree-root ${!sel[item.id] ? '' : 'tree-selected'}`
        : `tree-line ${!sel[item.id] ? '' : 'tree-selected'}`;
    },
    createTreeLine(node = null, item, list) {
      const { name } = item;
      const sel = this.selectList;
      const n = document.createElement('div');
      const nName = document.createElement('div');
      const mline = document.createElement('span');
      const open = document.createElement('span');
      this.nodeGroup.push(n);
      n.className = !node ?
        `tree-line tree-root ${!sel[item.id] ? '' : 'tree-selected'}`
        : `tree-line ${!sel[item.id] ? '' : 'tree-selected'}`;
      open.className = 'tree-open';
      nName.className = 'tree-btn';
      nName.innerHTML = name;
      mline.innerHTML = '';
      open.innerHTML = '&nbsp;';
      n.appendChild(nName);
      n.appendChild(mline);
      nName.appendChild(open);
      if (item.child && item.child.length > 0) {
        open.className = `tree-open liliafont ${!list || list.style.display === 'block' ? 'icon-arrowup' : 'icon-arrowright'}`;
      }
      n.onclick = (e) => {
        this.nodeSelect(node, n, {
          name: item.name,
          parentId: item.parentId,
          id: item.id,
          child: item.child,
        });
        this.$emit('click', {
          origin: item,
          name: item.name,
          parentId: item.parentId,
          id: item.id,
          child: item.child,
          selectList: this.selectList,
        });
      }
      open.onclick = (e) => {
        const p = n.parentNode;
        e.stopPropagation();
        for (let i = 0; i < p.children.length; i++) {
          const c = p.children[i];
          if (c.className.indexOf('tree-line') < 0) {
            c.style.display = c.style.display === 'block' ? 'none' : 'block';
            if (item.child && item.child.length > 0) {
              open.className = `tree-open liliafont ${c.style.display === 'block' ? 'icon-arrowup' : 'icon-arrowright'}`;
            }
          }
        }
        this.$emit('open', {
          name: item.name,
          parentId: item.parentId,
          id: item.id,
          child: item.child,
        });
      }
      return n;
    },
    // 创建节点
    createNode(list, layer = 0, node = null) {
      const { maps } = this;
      const n = !node ? document.createElement('div') : node;
      layer += 1;
      if (list) {
        list.map((pid) => {
          const r = document.createElement('div');
          const item = maps[pid];
          r.className = 'tree-block';
          r.style.marginLeft = `${layer}rem`;
          r.style.display = !node ? 'block' : 'none';
          r.appendChild(this.createTreeLine(node, item));
          item.selfNode = r;
          if (item && item.child) {
            item.child.map((nid) => {
              const c = document.createElement('div');
              const im = maps[nid];
              c.className = 'tree-block';
              c.style.marginLeft = `${layer + 1}rem`;
              c.appendChild(this.createTreeLine(im.child, im, c));
              r.appendChild(c);
              this.createNode(im.child, layer, c);
            });
          }
          n.appendChild(r);
        });
      }

      return n;
    },
  },
};
</script>
