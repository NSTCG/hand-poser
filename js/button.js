import {Component, Type} from '@wonderlandengine/api';

import {HowlerAudioSource} from '@wonderlandengine/components';

export class Button extends Component {
    static TypeName = 'button';
    static Properties = {
        hoverMaterial: {type: Type.Material},
    };
    static Dependencies = [HowlerAudioSource];

    start() {
        this.mesh = this.object.getComponent('mesh');
        this.defaultMaterial = this.mesh.material;

        this.target = this.object.getComponent('cursor-target');
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));

        this.soundClick = this.object.addComponent('howler-audio-source', {
            src: 'sfx/click.wav',
            spatial: true,
        });
        this.soundUnClick = this.object.addComponent('howler-audio-source', {
            src: 'sfx/unclick.wav',
            spatial: true,
        });
    }

    onHover() {
        this.mesh.material = this.hoverMaterial;
        this.soundClick.play();
    }

    onUnHover() {
        this.mesh.material = this.defaultMaterial;
        this.soundUnClick.play();
    }
}
