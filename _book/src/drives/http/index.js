import axios from 'axios';
import Adapter from 'imagination-adapter';
import Remote from './remote';

// 设置响应
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

  Adapter.accross('onExecuteBefore', next => next());
  Adapter.accross('onExecuteAfter', next => next());

  setting.access = access.map((api) => {
    const { fake } = api;
    api.fake = fake !== null ? setAxiosResponse(fake): fake;
    return Object.assign({}, api);
  });

  return new Adapter(new Remote(setting));
}
