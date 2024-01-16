/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type {TagsListItem, TagModule} from '@docusaurus/utils';
import type {BlogTag, BlogTags} from '@ilg/docusaurus-plugin-content-chronology';

import type {AuthorsListItem, AuthorModule} from './utils/authors';
import type {BlogAuthor, BlogAuthors} from '@ilg/docusaurus-plugin-content-chronology';

import logger from '@docusaurus/logger';

export function toTagsProp({blogTags}: {blogTags: BlogTags}): TagsListItem[] {
  return Object.values(blogTags)
    .filter((tag) => !tag.unlisted)
    .map((tag) => ({
      label: tag.label,
      permalink: tag.permalink,
      count: tag.items.length,
    }));
}

export function toTagProp({
  blogTagsListPath,
  tag,
}: {
  blogTagsListPath: string;
  tag: BlogTag;
}): TagModule {
  return {
    label: tag.label,
    permalink: tag.permalink,
    allTagsPath: blogTagsListPath,
    count: tag.items.length,
    unlisted: tag.unlisted,
  };
}

export function toAuthorsProp({blogAuthors}: {blogAuthors: BlogAuthors}): AuthorsListItem[] {
  // Object.keys(blogAuthors).forEach((key) => {
  //   logger.info('blogAuthor:')
  //   logger.info(blogAuthors[key])
  // })

  return Object.values(blogAuthors)
    .filter((author) => !author.unlisted)
    .filter((author) => author.name) // Filter out unnamed authors
    .map((author) => ({
      label: author.name,
      permalink: author.permalink,
      count: author.items.length,
    }));
}

export function toAuthorProp({
  blogAuthorsListPath,
  author,
}: {
  blogAuthorsListPath: string;
  author: BlogAuthor;
}): AuthorModule {
  return {
    label: author.name,
    permalink: author.permalink,
    allAuthorsPath: blogAuthorsListPath,
    count: author.items.length,
    unlisted: author.unlisted,
  };
}
