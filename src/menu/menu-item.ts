import videojs from 'video.js';
import ChapterMenuButton from '../button/chapter-button';

const { getComponent, registerComponent } = videojs;

const MenuItem = getComponent('MenuItem');

export default class ChapterMenuItem extends MenuItem {
  private template = document.createElement('div');
  constructor(player: videojs.Player, options: any = {}) {
    const cue = options['cue'];
    super(player, options);
    console.log(options['cue']);
    this.template = this.parseCue(cue);
    console.log(this.template);
    this.addClass('vjs-chapter-picker-thumbnail-menu-item');
  }

  override buildCSSClass(): string {
    return `vjs-chapter-picker-thumbnail-menu-item ${super.buildCSSClass()}`;
  }

  override createEl(type: string, props?: any, attrs?: any): HTMLLIElement {
    const el = super.createEl(
      'li',
      Object.assign(
        {
          className: 'vjs-menu-item vjs-chapter-thumbnails-menu-item',
          innerHTML: '', // does this need to be localized?
          tabIndex: -1,
        },
        props
      ),
      attrs
    );

    console.log(this.template);
    el.insertBefore(
      this.parseCue(this.options({})['cue'] as VTTCue) as Node,
      el.firstChild
    );
    return el;
  }

  private parseCue(cue: VTTCue) {
    console.log(cue);
    const element = document.createElement('div');

    const props = JSON.parse(cue.text);

    if (props['title'] !== undefined) {
      const title = document.createElement('div');
      title.classList.add('chapter-thumbnail-item-title');
      title.innerText = props['title'];
      element.appendChild(title);
    }
    if (props['image'] !== undefined) {
      const img = document.createElement('img');
      img.src = props['image'];
      element.appendChild(img);
    }
    return element;
  }
}
