export interface MediaMetadata {
  url: string;
}

export interface Media {
  "media-metadata"?: MediaMetadata[];
}

export interface Article {
  id: number;
  title: string;
  byline: string;
  published_date: string;
  media?: Media[];
}
