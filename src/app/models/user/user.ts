import {Campaign} from "../campaign/campaign";

export interface User {

  id: string,
  username: string,
  emailAddress: string,
  campaigns: Campaign[]

}
