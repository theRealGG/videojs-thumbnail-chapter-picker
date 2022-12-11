import videojs from 'video.js';
import ChapterMenuButton from '../button/chapter-button';
import ChapterMenuItem from './menu-item';

const { getComponent, registerComponent } = videojs;

const Menu = getComponent('Menu');

export default class ChapterMenu extends Menu {
  constructor(player: videojs.Player, options: any = {}) {
    console.log('Inside here');
    console.log(options);
    const chapterTrack = options['track'];
    super(player, options);
    this.addClass('vjs-chapter-picker-thumbnail-menu');
    this.addChapters(chapterTrack);
  }

  override buildCSSClass(): string {
    return `vjs-chapter-picker-thumbnail-menu`;
  }

  private addChapters(track: TextTrack) {
    console.log(track);
    const cues = track.cues;
    if (cues === null) {
      return [];
    }

    for (let i = 0; i < cues.length; i++) {
      console.log(cues[i]);
      const item = new ChapterMenuItem(this.player(), { cue: cues[i] });
      this.addChild(item);
    }
  }
}
