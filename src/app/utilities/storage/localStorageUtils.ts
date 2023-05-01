import {Campaign} from "../../models/campaign/campaign";
import {User} from "../../models/user/user";
import { PlayerCharacter } from "../../models/actors/playerCharacter";

export class LocalStorageUtils {

  private static readonly CURRENT_USER_KEY = 'current_user'
  private static readonly CAMPAIGN_STORAGE_KEY = 'current_campaign'
  private static readonly PLAYER_CHARACTERS_KEY = 'player_characters'

  static getUser(): User {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY)!);
  }

  static getCampaign(): Campaign {
    return JSON.parse(localStorage.getItem(this.CAMPAIGN_STORAGE_KEY)!);
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

  static setPlayerCharacters(playerCharacters: PlayerCharacter[]) {
    localStorage.setItem(this.PLAYER_CHARACTERS_KEY, JSON.stringify(playerCharacters));
  }

  static getPlayerCharacters() {
    return JSON.parse(localStorage.getItem(this.PLAYER_CHARACTERS_KEY)!);
  }
}
