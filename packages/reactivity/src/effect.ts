export function effect(fn: Function, options?: any) {
    const _effect = new ReactiveEffect(fn, () => {
        _effect.run();
    });
    _effect.run();
}

export let activeEffect: ReactiveEffect | undefined;

class ReactiveEffect {
    private readonly fn: Function;
    public active: boolean = true;
    _trackedId: number = 0;
    deps: Map<ReactiveEffect, number>[] = [];
    depsLength: number = 0;
    scheduler: Function | undefined;

    constructor(fn: Function, scheduler?: Function) {
        this.fn = fn;
        this.scheduler = scheduler;
    }

    run() {
        if (!this.active) {
            return this.fn();
        }
        let lastEffect: ReactiveEffect | undefined = activeEffect;
        try {
            activeEffect = this;
            this.fn();
        } finally {
            activeEffect = lastEffect;
        }
    }
}

export function trackEffect(effect: ReactiveEffect, dep: Map<ReactiveEffect, number>) {
    dep.set(effect, effect._trackedId);
    effect.deps[effect.depsLength] = dep;
    effect.depsLength++;
}

export function triggerEffect(dep: Map<ReactiveEffect, number>) {
    for (const effect of dep.keys()) {
        debugger
        if (effect.scheduler) {
            effect.scheduler();
        }
    }
}
