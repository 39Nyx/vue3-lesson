import { activeEffect, trackEffect, triggerEffect } from './effect';

const targetMap = new WeakMap()

export function track(target: any, key: any) {
    if (activeEffect) {
        if (!targetMap.has(target)) {
            targetMap.set(target, new Map())
        }
        const depMap = targetMap.get(target)
        if (!depMap.has(key)) {
            depMap.set(key, new Map())
        }
        const dep = depMap.get(key)
        trackEffect(activeEffect, dep)
    }
}

export function trigger(target: any, key: any, newValue: any, oldValue: any) {
    if (targetMap.has(target)) {
        const depMap = targetMap.get(target)
        if (depMap.has(key)) {
            const dep = depMap.get(key)
            triggerEffect(dep)
        }
    }
}
