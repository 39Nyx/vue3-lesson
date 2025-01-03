import { isObject } from '@vue/shared';
import { mutableHandlers, ReactiveFlags } from './mutableHandlers';

// 记录所有被代理过的对象, 可以复用
const targetMap = new WeakMap();

function createReactiveObject(target: any) {
    // 如果不是对象, 则直接返回
    if (!isObject(target)) {
        return target;
    }
    // 如果已经是响应式对象, 则直接返回
    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target;
    }
    // 如果有缓存, 则直接返回缓存
    if (targetMap.has(target)) {
        return targetMap.get(target);
    }
    const proxy = new Proxy(target, mutableHandlers);
    targetMap.set(target, proxy);
    return proxy;
}

export function reactive(target: any) {
    return createReactiveObject(target);
}
