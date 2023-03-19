import {Campaign} from "../campaign/campaign";

export interface User {

  username: number,
  emailAddress: string,
  campaigns: Campaign[]

}
