<template>
  <div class="vp-multiple-choose">
    <div class="vp-multiple-container" ref="container">
    </div>
  </div>
</template>

<script>
  /* import css */;
  /*
   routeSign数据格式

   [
     {
       id: 'sample-1',
       name: '喵科',
       parentId: null,
       routeSign: ['sample-2', 'sample-3'],
       house: ['node-1', 'node-2', 'node-3', 'node-4'],
       origin: {},
     },
     {
       id: 'sample-2',
       name: '虎纹喵',
       parentId: 'sample-1',
       routeSign: [],
       house: ['node-1', 'node-3'],
       origin: {},
     },
     {
       id: 'sample-3',
       name: '笨喵',
       parentId: 'sample-1',
       routeSign: [],
       house: ['node-1', 'node-2'],
       origin: {},
     },
   ]


   house的数据格式

   [
     {
       id: 'node-1',
       name: '喵垫',
       origin: {},
     },
     {
       id: 'node-2',
       name: '喵掌',
       origin: {},
     },
     {
       id: 'node-3',
       name: '喵爪',
       origin: {},
     },
     {
       id: 'node-4',
       name: '喵耳',
       origin: {},
     },
   ]
   */

  export default {
    props: {
      routeSign: {
        type: Array,
        default: () => [],
      },
      house: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        root: [],
        choose: {},
        nodes: {},
        chooseHouse: this.house,
        chooseRouteSign: this.routeSign,
      };
    },
    mounted() {
      this.searchRoot();
    },
    watch: {
      routeSign(data) {
        this.routeSign = data;
        this.searchRoot();
      },
      house(data) {
        this.house = data;
        this.searchRoot();
      },
    },
    methods: {
      // 找到根并创建路
      searchRoot() {
        const { root } = this;
        const { container } = this.$refs;
        container.innerHTML = '';
        this.routeSign.map((item) => {
          if (item.parentId === null) root.push(item);
          return item;
        });
        this.createNodeLayer(root, container);
      },
      // 路标
      createRouteSign(parentNode, item, chooseID) {
        const { routeSign } = this;
        if (Array.isArray(item.routeSign)) {
          const nextNodeLayer = [];
          item.routeSign.map((id) => {
            routeSign.map((routeItem) => {
              if (routeItem.id === id) nextNodeLayer.push(routeItem);
              return routeItem;
            });
            return id;
          });
          this.createNodeLayer(nextNodeLayer, parentNode, chooseID);
        }
      },
      // 屋
      createHouse(parentNode, item, parentChooseID = null) {
        const { chooseHouse } = this;
        if (Array.isArray(item.house)) {
          const houseContainer = this.buildNode(['vp-multiple-house-container']);
          const houseItems = [];
          item.house.map((houseID) => {
            chooseHouse.map((houseItem) => {
              if (houseItem.id === houseID) houseItems.push(houseItem);
              return houseItem;
            });
            return houseID;
          });
          houseItems.map((houseItem) => {
            const chooseID = (parentChooseID !== null ? [parentChooseID, houseItem.id] : [houseItem.id]).join('/');
            const houseNode = this.buildNode(['vp-multiple-house-node'], houseItem, chooseID);
            houseContainer.appendChild(houseNode);
            return houseItem;
          });
          parentNode.appendChild(houseContainer);
        }
      },
      // 根
      createNodeLayer(root = [], parentNode, parentChooseID = null) {
        root.map((item) => {
          const chooseID = (parentChooseID !== null ? [parentChooseID, item.id] : [item.id]).join('/');
          const node = this.buildNode(['vp-multiple-node'], item, chooseID);
          node.onclick = () => {};
          this.createHouse(node, item, chooseID);
          this.createRouteSign(node, item, chooseID);
          parentNode.appendChild(node);
          return item;
        });
      },
      // 创建节点
      buildNode(className = [], item = null, chooseID = null) {
        const { nodes, choose } = this;
        const node = document.createElement('div');
        node.className = className.join(' ');
        if (item !== null) {
          const nodeContent = document.createElement('div');
          const nodeCheckbox = document.createElement('span');
          const nodeContentTxt = document.createElement('span');
          const allChildChecked = (type, list) => {
            list.map((id) => {
              const childChooseID = [chooseID, id].join('/');
              switch (type) {
                case 'checked': if (!choose[childChooseID]) nodes[childChooseID]();
                  break;
                case 'nochecked': if (choose[childChooseID]) nodes[childChooseID]();
                  break;
                default:
              }
              return item;
            });
          };
          const childIsAllNoChecked = (list = []) => {
            let checkedAmount = 0;
            list.map((id) => {
              const childChooseID = [chooseID, id].join('/');
              if (choose[childChooseID]) checkedAmount += 1;
              return id;
            });
            return checkedAmount > 0;
          };
          // 递归勾选
          const checked = (status) => {
            const ids = chooseID.split('/');
            ids.pop();
            const parentId = ids.join('/');
            if (chooseID !== null && !choose[chooseID] && status !== 'no-checked') { // 未选
              nodeCheckbox.className = ['psm-icon', 'psm-checked'].join(' ');
              choose[chooseID] = item;
              if (nodes[parentId]) nodes[parentId]('checked');
              if (item.house && status !== 'checked') allChildChecked('checked', item.house);
              if (item.routeSign && status !== 'checked') allChildChecked('checked', item.routeSign);
            } else { // 已选
              if (!status) {
                // 最初点击的节点
                if (item.house) allChildChecked('nochecked', item.house);
                if (item.routeSign) allChildChecked('nochecked', item.routeSign);
                nodeCheckbox.className = ['psm-icon', 'psm-no-checked'].join(' ');
                delete choose[chooseID];
                if (nodes[parentId]) nodes[parentId]('no-checked'); // 校验其他关联节点
                return;
              }
              // 非当前节点的勾选校验
              // 检查house, routeSign是否其他已选，已选情况下不反选该父节点
              if (childIsAllNoChecked(item.house)) return;
              if (childIsAllNoChecked(item.routeSign)) return;
              nodeCheckbox.className = ['psm-icon', 'psm-no-checked'].join(' ');
              delete choose[chooseID];
              if (nodes[parentId]) nodes[parentId](status);
            }
          };
          if (chooseID !== null) {
            nodes[chooseID] = checked;
            nodeContent.onclick = () => nodes[chooseID]();
          }
          nodeContent.className = ['vp-multiple-node-content'].join(' ');
          nodeCheckbox.className = ['psm-icon', 'psm-no-checked'].join(' ');
          nodeContentTxt.innerHTML = item.name;
          nodeContent.appendChild(nodeCheckbox);
          nodeContent.appendChild(nodeContentTxt);
          node.appendChild(nodeContent);
        }
        return node;
      },
    },
  };
</script>
