import { getCollection } from "astro:content";

const notes = await getCollection("notes");

const WIKILINK_REGEXP = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

const backlinks = new Map<string, Set<string>>();

export function wikilinkForNoteId(id: string) {
  return id.replace(/\.(md|markdown)$/, "");
}

export function resolveNoteForWikilink(wikilink: string) {
  const matchingNotes = notes.filter(
    (note) => wikilinkForNoteId(note.id) === wikilink,
  );

  switch (matchingNotes.length) {
    case 0: {
      console.error("Broken link", wikilink);
      break;
    }
    case 1: {
      break;
    }
    default: {
      console.error("Ambiguous link", wikilink, matchingNotes);
      break;
    }
  }

  return matchingNotes[0];
}

for (const note of notes) {
  const wikilinks = (note.body?.match(WIKILINK_REGEXP) ?? []).map(
    (wikilink) =>
      wikilink.replace(/^\[\[/, "").replace(/]]$/, "").split("|")[0],
  );

  for (const wikilink of wikilinks) {
    const linkedNote = resolveNoteForWikilink(wikilink);
    if (linkedNote) {
      const set = backlinks.get(linkedNote.id) ?? new Set();
      set.add(note.id);
      backlinks.set(linkedNote.id, set);
    }
  }
}

export async function getNoteBacklinks(id: string) {
  return Array.from((backlinks.get(id) ?? new Set()).keys());
}
