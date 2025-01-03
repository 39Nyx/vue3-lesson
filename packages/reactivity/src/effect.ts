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

    constructor(fn: Function, scheduler?: Function) {
        this.fn = fn;
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
