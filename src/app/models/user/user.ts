import {Campaign} from "../campaign/campaign";

export interface User {

  username: string,
  emailAddress: string,
  campaigns: Campaign[]

}
