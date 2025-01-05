import { activeEffect } from './effect';

export function track(target: any, key: any) {
    if (activeEffect) {
        console.log('Tracking', key, 'on', target)
    }
}
