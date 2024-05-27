import { Mark, mergeAttributes } from '@tiptap/core';

const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return {
      defaultSize: '16px',
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      size: {
        default: this.options.defaultSize,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {};
          }
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'font-size',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark('fontSize', { size });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark('fontSize');
        },
    };
  },
});

export default FontSize;
