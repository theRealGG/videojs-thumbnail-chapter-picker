import videojs from 'video.js';
import ChapterMenu from '../menu/chapter-menu';

const { getComponent, registerComponent } = videojs;

const Button = getComponent('Button');

export default class ChapterMenuButton extends Button {
  private showMenu = false;
  private menu: ChapterMenu;
  constructor(player: videojs.Player, options: any = {}) {
    const track: TextTrack = options.track;
    super(player, options);
    this.menu = new ChapterMenu(player, { track: track });
    this.menu.hide();
    this.player().addChild(this.menu, {}, 7);
  }

  override handleClick(event: videojs.EventTarget.Event): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.menu.show();
    } else {
      this.menu.hide();
    }
  }

  override handleKeyPress(event: videojs.EventTarget.Event): void {
    this.handleClick(event);
  }

  override buildCSSClass() {
    return `vjs-chapters-button vjs-chapter-thumbnail-button ${super.buildCSSClass()}`;
  }
}

registerComponent('ChapterThumbnailButton', ChapterMenuButton);
