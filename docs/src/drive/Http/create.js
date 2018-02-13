import axios from 'axios';
import Adapter from 'imagination-adapter';
import Http from './http';

// 设置伪响应格式，对应axios
const setAxiosResponse = (fake) => ({
  config: {},
  status: 200,
  statusText: 'ok',
  data: Object.assign({}, fake),
  headers: {},
  request: {},
  HOW: {}, // 非axiox
});

export default function (setting) {
  const { access } = setting;
  Adapter.accross('onExecuteBefore', next => next());
  Adapter.accross('onExecuteAfter', next => next());
  setting.access = access.map((api) => {
    const { fake } = api;
    api.fake = fake !== null ? setAxiosResponse(fake): fake;
    return Object.assign({}, api);
  });
  return new Adapter(new Http(setting));
}
