/// <reference path="../src/plugin-content-blog.d.ts" />
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { TagsListItem, TagModule } from '@docusaurus/utils';
import type { BlogTag, BlogTags } from '@ilg/docusaurus-plugin-content-chronology';
import type { AuthorsListItem, AuthorModule } from './utils/authors';
import type { BlogAuthor, BlogAuthors } from '@ilg/docusaurus-plugin-content-chronology';
export declare function toTagsProp({ blogTags }: {
    blogTags: BlogTags;
}): TagsListItem[];
export declare function toTagProp({ blogTagsListPath, tag, }: {
    blogTagsListPath: string;
    tag: BlogTag;
}): TagModule;
export declare function toAuthorsProp({ blogAuthors }: {
    blogAuthors: BlogAuthors;
}): AuthorsListItem[];
export declare function toAuthorProp({ blogAuthorsListPath, author, }: {
    blogAuthorsListPath: string;
    author: BlogAuthor;
}): AuthorModule;
