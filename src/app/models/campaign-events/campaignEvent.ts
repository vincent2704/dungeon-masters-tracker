export class CampaignEvent {

  constructor(
    private title: string,  private description: string,
    private campaignDate: Date,   private realTimeDate: Date) {
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

}
