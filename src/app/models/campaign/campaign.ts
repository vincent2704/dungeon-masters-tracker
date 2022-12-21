export interface Campaign {
  name: string;
  campaignDateTimeStartEpoch: number;
  campaignDateTimeCurrentEpoch: number;
  realDateStartEpoch: number;
  realDateLastPlayedEpoch: number;
  lastLongRestTimeEpoch: number;
}
