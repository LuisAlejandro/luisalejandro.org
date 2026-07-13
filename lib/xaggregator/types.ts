export type TweetFetchError =
  "invalidUrl" | "notFound" | "tombstone" | "upstream";

export type TweetData = {
  link: string;
  text: string;
  images: string[];
};

export type FetchTweetResult =
  | { ok: true; data: TweetData }
  | { ok: false; error: TweetFetchError; message?: string };

export type XaggregatorResultItem = {
  inputUrl: string;
  ok: boolean;
  link?: string;
  text?: string;
  images?: string[];
  error?: string;
};
