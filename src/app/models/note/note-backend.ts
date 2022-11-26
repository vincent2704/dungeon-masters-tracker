import { v4 as uuid } from 'uuid';

export interface NoteBackend {
  campaignId: typeof uuid;
  title: string;
  body: string;
}
