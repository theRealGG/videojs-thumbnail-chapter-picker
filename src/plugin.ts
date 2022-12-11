import videojs from 'video.js';
import ChapterMenuButton from './button/chapter-button';

import './style.scss';

const { getPlugin, Player } = videojs;

const Plugin = getPlugin('plugin');

export interface ChapterThumbnailPickerOptions {
  id: string;
}

export default class ChapterThumbnailPlugin extends Plugin {
  private static kind = 'chapters';
  constructor(player: videojs.Player, options?: any) {
    super(player, options);
    player.ready(() => {
      player.on('loadedmetadata', () => {
        const tracks = player.remoteTextTracks();
        const chapterTrack = this.getChapterTrack(tracks);
        if (!chapterTrack) {
          return;
        }

        const a = player.controlBar.children()[11];
        player.controlBar.addChild(
          new ChapterMenuButton(player, { track: chapterTrack }),
          {},
          11
        );
      });
    });
  }

  private getChapterTrack(tracks: TextTrackList): TextTrack | undefined {
    const mappedTracks = Array.from(Array(tracks.length).keys()).map(
      (num) => tracks[num]
    );
    return mappedTracks.find(
      (track) => track.kind === ChapterThumbnailPlugin.kind
    );
  }
}

const plugin = videojs.registerPlugin(
  'chapterPickerThumbnail',
  ChapterThumbnailPlugin
);

console.log('Executed Register plugin');

declare module 'video.js' {
  export interface VideoJsPlayer {
    chapterPickerThumbnail: (
      options?: Partial<VideoJsPlayerPluginOptions>
    ) => ChapterThumbnailPlugin;
  }

  export interface VideoJsPlayerPluginOptions {
    examplePlugin?: Partial<ChapterThumbnailPickerOptions>;
  }
}

videojs('my-video').chapterPickerThumbnail();
//player.chapterPickerThumbnail();
