import {Campaign} from "../campaign/campaign";

export interface User {

  id: number,
  username: number,
  emailAddress: string,
  campaigns: Campaign[]

}
