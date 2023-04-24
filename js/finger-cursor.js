import {Component} from '@wonderlandengine/api';

export class FingerCursor extends Component {
    static TypeName = 'finger-cursor';
    static Properties = {};

    init() {
        this.lastTarget = null;
    }

    start() {
        this.tip = this.object.getComponent('collision');
    }

    update() {
        const overlaps = this.tip.queryOverlaps();

        let overlapFound = null;
        for (let i = 0; i < overlaps.length; ++i) {
            const o = overlaps[i].object;
            const target = o.getComponent('cursor-target');
            if (target) {
                if (!target.equals(this.lastTarget)) {
                    target.onHover(o, this);
                    target.onClick(o, this);
                }
                overlapFound = target;
                break;
            }
        }

        if (!overlapFound) {
            if (this.lastTarget) this.lastTarget.onUnhover(this.lastTarget.object, this);
            this.lastTarget = null;
            return;
        } else {
            this.lastTarget = overlapFound;
        }
    }
}
