import path from "node:path";
import { getCollection } from "astro:content";

const notes = await getCollection("notes");

const WIKILINK_REGEXP = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

const noteIds = notes.map((note) => note.id);

const backlinks = new Map<string, Set<string>>();

export function wikilinkForNoteId(id: string) {
  return path.basename(id, ".md");
}

export function resolveNoteForWikilink(wikilink: string) {
  const matchingNotes = notes.filter(
    (note) => wikilinkForNoteId(note.id) === wikilink,
  );

  switch (matchingNotes.length) {
    case 0: {
      console.error("Broken link", wikilink);
      throw new Error("Broken link");
    }
    case 1: {
      return matchingNotes[0];
    }
    default: {
      console.error("Ambiguous link", wikilink, matchingNotes);
      throw new Error("Ambiguous link");
    }
  }
}

for (const note of notes) {
  const wikilinks = (note.body?.match(WIKILINK_REGEXP) ?? []).map((wikilink) =>
    wikilink.replace(/^[[/, "").replace(/]]$/, ""),
  );

  for (const wikilink of wikilinks) {
    const linkedNote = resolveNoteForWikilink(wikilink);
    const set = backlinks.get(linkedNote.id) ?? new Set();
    set.add(note.id);
    backlinks.set(linkedNote.id, set);
  }
}

console.log({ backlinks });

export async function getNoteBacklinks(id: string) {
  return (backlinks.get(id) ?? new Set()).keys();
}
