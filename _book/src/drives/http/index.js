import axios from 'axios';
import Adapter from 'imagination-adapter';
import Http from './Http';

// 设置伪响应格式，对应axios
const setAxiosResponse = (fake) => ({
  config: {},
  status: 200,
  statusText: 'ok',
  data: Object.assign({}, api.fake),
  headers: {},
  request: {},
  HOW: {}, // 非axiox
});

export default function (setting) {
  const { access } = setting;
  // adapter 全局执行前
  Adapter.accross('onExecuteBefore', next => next());
  // adapter 全局执行完成后
  Adapter.accross('onExecuteAfter', next => next());
  // 创建API的映射关系
  setting.access = access.map((api) => {
    const { fake } = api;
    api.fake = fake !== null ? setAxiosResponse(fake): fake;
    return Object.assign({}, api);
  });
  return new Adapter(new Http(setting));
}
