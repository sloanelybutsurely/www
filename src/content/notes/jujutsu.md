---
title: Jujutsu (jj)
draft: true
tags: []
pubDate: 2026-05-04
updatedDate: 2026-05-04
---

jujutsu (jj) is a version control tool built on top of git (there is an
internal backend independent of git but very few people use it).

jj differs from git in a few meaningful ways:

1. a new concept of a "change" is added which may be represented by multiple
   different underlying commits over time
2. git's "working copy" is done away with in favor of automatic snapshotting
3. conflicts are first-class concepts and can be left in a change to be dealt
   with later
