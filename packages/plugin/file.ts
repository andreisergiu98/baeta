import fs from "fs/promises";
import { dirname } from "path";

export class File {
  persisted = false;

  constructor(
    public filename: string,
    public content: string,
    public tag: string
  ) {}

  write = async () => {
    if (this.persisted) {
      return;
    }
    this.persisted = true;

    const dir = dirname(this.filename);
    await fs.mkdir(dir, { recursive: true });
    return fs.writeFile(this.filename, this.content, "utf-8");
  };

  unlink = async () => {
    this.persisted = false;
    return fs.unlink(this.filename);
  };
}
