export class Note {

  constructor(private title: string, private body: string) {
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getBody(): string {
    return this.body;
  }

  public setBody(body: string) {
    this.body = body;
  }

}
