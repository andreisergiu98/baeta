import { dirname, extname } from '@baeta/util-path';
import fs from 'fs/promises';

export interface FileOptions {
  eslintDisable?: boolean;
  generationNotice?: boolean;
  addHeader?: (name: string, content: string, tag: string) => string;
  transformContent?: (name: string, content: string, tag: string) => string | Promise<string>;
}

export class File {
  persisted = false;

  constructor(
    public filename: string,
    public content: string,
    public tag: string,
    private options?: FileOptions,
  ) {}

  write = async () => {
    if (this.persisted) {
      return;
    }
    this.persisted = true;

    const dir = dirname(this.filename);
    await fs.mkdir(dir, { recursive: true });

    const content = await this.buildContent();

    return fs.writeFile(this.filename, content, 'utf-8');
  };

  unlink = async () => {
    this.persisted = false;
    return fs.unlink(this.filename);
  };

  private async buildContent() {
    const content = this.buildHeader() + this.content;

    if (this.options?.transformContent) {
      return this.options.transformContent(this.filename, content, this.tag);
    }

    return content;
  }

  protected buildHeader() {
    const ext = extname(this.filename);

    const headerItems: string[] = [];

    if (this.options?.generationNotice !== false) {
      headerItems.push(
        `${this.createComment(
          'This file was generated by baeta. Do not edit it directly.',
          ext,
        )}\n`,
      );
    }

    if (this.options?.eslintDisable !== false) {
      headerItems.push(this.createComment('eslint-disable', ext));
    }

    if (this.options?.addHeader) {
      headerItems.push(this.options.addHeader(this.filename, this.content, this.tag));
    }

    return `${headerItems.join('\n')}\n\n`;
  }

  protected createComment(comment: string, extension: string) {
    if (['.gql', '.graphql'].includes(extension)) {
      return `# ${comment}`;
    }

    return `/* ${comment} */`;
  }
}
