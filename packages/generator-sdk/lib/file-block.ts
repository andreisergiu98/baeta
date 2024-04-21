import { readFile, stat } from 'node:fs/promises';
import { File, FileOptions } from './file';

export class FileBlock extends File {
  constructor(
    filename: string,
    content: string,
    protected start: string,
    protected end: string,
    tag: string,
    options?: FileOptions,
  ) {
    super(filename, content, tag, {
      addEslintDisableHeader: options?.addEslintDisableHeader ?? false,
      addGenerationNoticeHeader: options?.addGenerationNoticeHeader ?? false,
      transformContent: async (name, content, tag) => {
        const existingContent = await this.getExistingContent();
        const transformed = this.replaceBlock(existingContent, content);

        if (options?.transformContent) {
          return options.transformContent(name, transformed, tag);
        }

        return transformed;
      },
    });
  }

  protected async getExistingContent() {
    const exists = await stat(this.filename)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      return '';
    }

    return readFile(this.filename, 'utf-8');
  }

  protected replaceBlock(existingContent: string, incoming: string) {
    const block = `${this.start}\n${incoming}\n${this.end}`;
    return (
      this.getStartSlice(existingContent) +
      this.buildPadding(existingContent) +
      block +
      this.getEndSlice(existingContent)
    );
  }

  protected stripBlock(existingContent: string) {
    return this.getStartSlice(existingContent) + this.getEndSlice(existingContent);
  }

  protected getStartSlice(existingContent: string) {
    const startMarkerIndex = existingContent.indexOf(this.start);

    if (startMarkerIndex === -1) {
      return existingContent;
    }

    return existingContent.slice(0, startMarkerIndex);
  }

  protected getEndSlice(existingContent: string) {
    const endMarkerIndex = existingContent.indexOf(this.end);

    if (endMarkerIndex === -1) {
      return '';
    }

    return existingContent.slice(endMarkerIndex + this.end.length);
  }

  protected buildPadding(existingContent: string) {
    const existingStripped = this.stripBlock(existingContent);

    if (existingStripped === '') {
      return '';
    }

    if (existingStripped.endsWith('\n\n')) {
      return '';
    }

    if (existingStripped.endsWith('\n')) {
      return '\n';
    }

    return '\n\n';
  }
}
