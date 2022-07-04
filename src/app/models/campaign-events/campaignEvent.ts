export class CampaignEvent {

  constructor(
    private title: string,  private description: string,
    private campaignDate: Date,   private realWorldDate: Date) {
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getCampaignDateFormatted() {
    return `
    ${this.campaignDate.getDate()},
    ${this.campaignDate.toLocaleString('en-US', {month: 'long'})},
    ${this.campaignDate.getFullYear()},
    ${this.campaignDate.getHours()}:${this.campaignDate.getMinutes()}`;
  }

  getRealWorldDateFormatted() {
    return `
    ${this.realWorldDate.getDate()},
    ${this.realWorldDate.toLocaleString('en-US', {month: 'long'})},
    ${this.realWorldDate.getFullYear()},
    ${this.realWorldDate.getHours()}:${this.realWorldDate.getMinutes()}`
  }
}
