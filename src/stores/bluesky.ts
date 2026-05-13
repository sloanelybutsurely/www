import { atom, onMount } from "nanostores";
import { computedAsync } from "@nanostores/async";
import { Client } from "@atproto/lex";

import * as app from "@/lexicons/app";
import * as com from "@/lexicons/com";

import { BSKY_API_HOST, BSKY_NOW_HANDLE } from "@/constants";

const client = new Client(BSKY_API_HOST);

export const $actor = atom<
  com.atproto.identity.resolveHandle.$OutputBody["did"] | null
>(null);

onMount($actor, () => {
  const resolveHandle = async () => {
    const { did } = await client.call(com.atproto.identity.resolveHandle, {
      handle: BSKY_NOW_HANDLE,
    });
    $actor.set(did);
  };

  resolveHandle();
  return () => {};
});

export const $profile = computedAsync($actor, async (actor) => {
  if (actor === null) return null;

  return client.call(app.bsky.actor.getProfile, { actor });
});

export const $feed = computedAsync($actor, async (actor) => {
  if (actor === null) return [];

  const { feed } = await client.call(app.bsky.feed.getAuthorFeed, { actor });

  return feed;
});
