import { decideType, JUDGE } from '../common';

export default class StateMachine {

  constructor(option) {
    const {
      events,
      name,
      status,
    } = option;

    this.name = name || '';
    this.status = status || [];
    this.flows = {};
    this.events = events || {};
    this.$ERROR = [];
    this.$ERROR_HAPPEN = () => {};
  }

  /*
    [@] decompose
    [$] 流程表达式分解规则
    [P] ([String] express)
  */
  decompose(express) {
    return decideType([
      () => ({
        IS_STR: express,
      }),
    ],
    {
      clear() {
        return express.replace(/[\n\s]{0,}/g, '').split('->');
      },
      exception: () => {
        this.reportErr('[StateMachine.decompose] 参数类型错误');
      },
    });
  }


  /*
    [@] `restate`
    [$] 重置流程状态
    [P] ([String] flowName)
  */
  restate(flowName) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const { stateQueueEctype } = flows[flowName];
        const stateQueue = [];

        stateQueueEctype.map((flow) => {
          const { eventName, queue } = flow;

          stateQueue.push({
            eventName,
            queue: Object.assign([], queue),
          });

          return flow;
        });

        flows[flowName] = {
          ...flows[flowName],
          currentState: null,
          stateQueue,
        };

        return null;
      },
      exception: () => {
        this.reportErr('[StateMachine.restate] 参数类型错误');
      },
    });
  }

  /*
    [@] doFlowAction
    [$] 执行已定义的流程行为
    [P] ([String] flowName)
  */
  doFlowAction(flowName, params) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];
        let currentState = null;

        if (JUDGE.IS_FUN(flow.action)) {
          currentState = flow.action(params);
        } else {
          currentState = this.nextFlowState(flowName);
        }

        return currentState;
      },
      exception: () => {
        this.reportErr(`[StateMachine.doFlowAction] 参数类型错误`);
      },
    });
  }

  /*
    [@] wheelFlowAction
    [$] 执行已定义的流程行为
    [P] ([String] flowName)
  */
  wheelFlowAction(flowName, params) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];
        let currentState = null;

        if (JUDGE.IS_FUN(flow.action)) {
          if (flow.isEnd) {
            this.restate(flowName);
          }

          currentState = flow.action(params);
        } else {
          currentState = this.wheelFlowState(flowName);
        }

        return currentState;
      },
      exception: () => {
        this.reportErr(`[StateMachine.doFlowAction] 参数类型错误`);
      },
    });
  }

  /*
    [@] skipNextAction
    [$] 跳过下一次行为执行，内部状态照常变化
    [P] ([String] flowName)
  */
  skipNextAction(flowName, statusName) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];

        flow.isSkipNext = statusName;
      },
      exception: () => {
        this.reportErr(`[StateMachine.skipNextAction] 参数类型错误`);
      },
    });
  }

  /*
    [@] setFlowAction
    [$] 给已定义的流程定义相关过渡行为。
    [P] ([String] flowName, [Function] action)
  */
  setFlowAction(flowName, action) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
        BY_FUN: action,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];

        flow.action = (params) => {
          const state = this.nextFlowState(flowName);

          if (flow.isSkipNext !== flow.currentState) {
            JUDGE.BE_FUN(action, this)(state, params, flow);
          } else {
            flow.isSkipNext = false;
          }

          return state;
        };
      },
      exception: () => {
        this.reportErr('[StateMachine.setFlowAction] 参数类型错误');
      },
    });
  }

  /*
    [@] defineFlow
    [$] 定义流程，流程用于执行状态机内定义的事件，且每个流程有自己独立的状态
    [P] ([String] flowName, [Function] action)
  */
  defineFlow(name, flow) {
    const { flows, events } = this;

    decideType([
      () => ({
        IS_STR: name,
        IS_STR: flow,
      }),
    ],
    {
      clear: () => {
        const flowEvents = this.decompose(flow);
        const stateQueue = [];
        const stateQueueEctype = [];

        // 格式化流程内容
        flowEvents.map((eventName) => {
          // 正文
          stateQueue.push({
            eventName,
            queue: this.decompose(events[eventName]),
          });
          // 副本
          stateQueueEctype.push({
            eventName,
            queue: this.decompose(events[eventName]),
          });

          return name;
        });

        // 创建一个流程块级数据
        flows[name] = {
          name, // 流程名称
          currentState: '', // 当前停留状态
          currentEvent: '', // 当前停留事件
          stateQueue, // 当前执行状态队列
          stateQueueEctype, // 状态队列的副本，不可变数据
          isSkipNext: false, // 跳过下一次行为执行，内部状态依然发生变化
        };
      },
      exception: () => {
        this.reportErr(`[StateMachine.defineFlow] 参数类型错误`);
      },
    });
  }

  /*
    [@] wheelFLowState
    [$] 如果流程结束，那么下一次执行状态为初始状态。
    [P] ([String] flowName)
  */
  wheelFLowState(flowName) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];

        if (flow.isEnd) this.restate(flowName);

        return this.nextFlowState(flowName);
      },
      exception: () => {
        this.reportErr(`[StateMachine.wheelFLowState] 参数类型错误`);
      },
    });
  }

  /*
    [@] runFlow
    [$] 完整执行整个流程步骤
    [P] ([String] flowName)
  */
  runFlow(flowName) {
    const { flows } = this;
    const statusList = [];

    const loopTransit = () => {
      const flow = flows[flowName];

      statusList.push(this.doFlowAction(flowName));

      if (!flow.isEnd) {
        loopTransit();
      } else {
        this.restate(flowName);
      }
    };

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        loopTransit();

        return statusList;
      },
      exception: () => {
        this.reportErr('[StateMachine.playFlow] 参数类型错误');
      },
    });
  }

  /*
    [@] nextFlowState
    [$] 下一个流程状态
    [P] ([String] flowName)
  */
  nextFlowState(flowName) {
    const { flows } = this;

    return decideType([
      () => ({
        IS_STR: flowName,
      }),
      () => ({
        IS_OBJ: flows[flowName],
      }),
    ],
    {
      clear: () => {
        const flow = flows[flowName];
        const { stateQueue } = flow;

        let currentState = null; // 当前状态
        let currentEvent = null; // 当前流转事件
        let prevEvent = null; // 上次流转事件
        let listenQueue = null; // 用于监听当前执行的事件流程是否结束
        let isEnd = false; // 流程是否结束

        stateQueue.map(({ eventName, queue }, code) => {
          if (currentEvent && listenQueue && listenQueue.length === 0 && currentState === queue[0]) {
            // 两个事件结束、开始状态进行合并，且两个状态必须是相同已被定义的状态
            prevEvent = currentEvent;
            currentEvent = eventName;
            currentState = queue.shift();
            listenQueue = queue;
          } else if (!currentState && queue.length > 0) {
            // 第一次执行状态变化
            currentEvent = eventName;
            currentState =  queue.shift();
            listenQueue = queue;
          }

          if (code === stateQueue.length - 1 && queue.length === 0) {
            // 当前为最后一个事件，且其流程已置空，那么整个复合过渡事件结束。
            prevEvent = !prevEvent ? flow.currentEvent : prevEvent;
            currentEvent = eventName;
            isEnd = true;
          }

          return queue;
        });

        flow.currentState = currentState;
        flow.currentEvent = currentEvent;
        flow.prevEvent = prevEvent;
        flow.isEnd = isEnd;

        return currentState;
      },
      exception: () => {
        this.reportErr(`[StateMachine.nextFlowState] 参数类型错误`);
      },
    });
  }

  // 异常行为， 发生异步操作时
  exception(action) {
    this.$ERROR_HAPPEN = action;
  }

  // 监控器异常汇报格式
  reportErr(msg) {
    const { $ERROR } = this;

    $ERROR.push(`[${this.ERROR_PREV}] ${msg}`);
    this.$ERROR_HAPPEN($ERROR);
  }
}
