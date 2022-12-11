declare module 'video.js' {
  type ChapterThumbnailPlugin =
    import('../../src/chapter-thumbnail-plugin').default;
  type ChapterThumbnailPickerOptions =
    import('../../src/chapter-thumbnail-plugin').ChapterThumbnailPickerOptions;
  export interface VideoJsPlayer {
    chapterPickerThumbnail: (
      options?: Partial<VideoJsPlayerPluginOptions>
    ) => ChapterThumbnailPlugin;
  }

  export interface VideoJsPlayerPluginOptions {
    examplePlugin?: Partial<ChapterThumbnailPickerOptions>;
  }
}
