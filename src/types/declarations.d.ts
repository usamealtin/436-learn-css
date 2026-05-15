// Module declarations for packages without bundled types
declare module 'react-calendar-heatmap';
declare module 'html-to-image';

// ClipboardItem API — not yet in all TypeScript lib versions
declare class ClipboardItem {
  constructor(items: Record<string, Blob>);
}
declare var ClipboardItem: {
  prototype: ClipboardItem;
  new(items: Record<string, Blob>): ClipboardItem;
};
