export class Note {

  constructor(private title: string, private body: string) {
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

}
