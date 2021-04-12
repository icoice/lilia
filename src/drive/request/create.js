import Adapter from 'imagination-adapter';
import Request from './request';

// 设置伪响应格式，对应axios
const setAxiosResponse = fake => (fake === null ? fake : {
  REQ_META: {},
  config: {},
  data: Object.assign({}, fake),
  headers: {},
  request: {},
  status: 200,
  statusText: 'ok',
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

  return new Adapter(new Request(setting));
}
