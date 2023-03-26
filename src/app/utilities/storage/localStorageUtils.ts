import {Campaign} from "../../models/campaign/campaign";
import {User} from "../../models/user/user";

export class LocalStorageUtils {

  private static readonly CURRENT_USER_KEY = 'current_user'

  static getUser(): User {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY)!);
  }

  static setUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  static addCampaign(campaign: Campaign): void {
    let user: User = this.getUser();
    user.campaigns.push(campaign);
    this.setUser(user);
  }

  static deleteCampaign(campaign: Campaign): void {
    let user: User = this.getUser();
    const campaignIndex = user.campaigns.indexOf(campaign);
    user.campaigns.splice(campaignIndex, 1);
    this.setUser(user);
  }
}
