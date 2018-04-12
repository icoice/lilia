<template>
  <div class="moo moo-tree">
    <div class='tree-container' ref='tree'></div>
  </div>
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
    }
  },
  watch: {
    list(items) {
      this.createTree(items);
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

      return {
        root,
        maps,
      };
    },
    build() {
      const tree = this.createNode(this.root);
      this.insertNode(tree);
    },
    // 插入节点
    insertNode(node) {
      const { tree } = this.$refs;
      tree.innerHTML = '';
      tree.appendChild(node);
    },
    createTreeLine(node = null, item) {
      const { name } = item;
      const n = document.createElement('div');
      n.className = !node ? 'tree-line tree-root' : 'tree-line';
      n.innerHTML = `<span>${name}</span><span class='tree-middle-line'></span>`;
      n.onclick = (e) => {
        const p = n.parentNode;
        e.stopPropagation();
        for (let i = 0; i < p.children.length; i++) {
          const c = p.children[i];
          if (c.className.indexOf('tree-line') < 0) {
            c.style.display = c.style.display === 'block' ? 'none' : 'block';
          }
        }
        this.$emit('click', {
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
              c.appendChild(this.createTreeLine(im.child, im));
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
