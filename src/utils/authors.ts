/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { normalizeUrl } from '@docusaurus/utils';
import { Author } from '@xpack/docusaurus-plugin-content-blog';
import _ from 'lodash';
// import {normalizeUrl} from './urlUtils';


/** What the authors list page should know about each tag. */
export type AuthorsListItem = Author & {
  /** Number of posts/docs with this author. */
  count: number;
};

/** What the tag's own page should know about the tag. */
export type AuthorModule = AuthorsListItem & {
  /** The authors list page's permalink. */
  allAuthorsPath: string;
  /** Is this author unlisted? (when it only contains unlisted items) */
  unlisted: boolean;
};

export type FrontMatterAuthor = string | Author;

function normalizeFrontMatterAuthor(
  authorsPath: string,
  frontMatterAuthor: FrontMatterAuthor,
): Author {
  function toAuthorObject(authorString: string): Author {
    return {
      label: authorString,
      permalink: _.kebabCase(authorString),
    };
  }

  // TODO maybe make ensure the permalink is valid url path?
  function normalizeAddressPermalink(permalink: string): string {
    // Note: we always apply tagsPath on purpose. For versioned docs, v1/doc.md
    // and v2/doc.md tags with custom permalinks don't lead to the same created
    // page. tagsPath is different for each doc version
    return normalizeUrl([authorsPath, permalink]);
  }

  const author: Author =
    typeof frontMatterAuthor === 'string'
      ? toAuthorObject(frontMatterAuthor)
      : frontMatterAuthor;

  if (author.permalink) {
    return {
        label: author.label,
        permalink: normalizeAddressPermalink(author.permalink),
      };
  } else {
    return {}
  }
}

/**
 * Takes author objects as they are defined in front matter, and normalizes each
 * into a standard author object. The permalink is created by appending the
 * sluggified label to `authorsPath`. Front matter tags already containing
 * permalinks would still have `tagsPath` prepended.
 *
 * The result will always be unique by permalinks. The behavior with colliding
 * permalinks is undetermined.
 */
export function normalizeFrontMatterAuthors(
  /** Base path to append the tag permalinks to. */
  authorsPath: string,
  /** Can be `undefined`, so that we can directly pipe in `frontMatter.tags`. */
  frontMatterAuthors: FrontMatterAuthor[] | undefined = [],
): Author[] {
  const authors = frontMatterAuthors.map((author) =>
    normalizeFrontMatterAuthor(authorsPath, author),
  );

  return _.uniqBy(authors, (author) => author.permalink);
}

type AuthoredItemGroup<Item> = {
  author: Author;
  items: Item[];
};

/**
 * Permits to group docs/blog posts by author (provided by front matter).
 *
 * @returns a map from author permalink to the items and other relevant author data.
 * The record is indexed by permalink, because routes must be unique in the end.
 * Labels may vary on 2 MD files but they are normalized. Docs with
 * label='some label' and label='some-label' should end up in the same page.
 */
export function groupAuthoredItems<Item>(
  items: readonly Item[],
  /**
   * A callback telling me how to get the authors list of the current item. Usually
   * simply getting it from some metadata of the current item.
   */
  getItemAuthors: (item: Item) => readonly Author[],
): {[permalink: string]: AuthoredItemGroup<Item>} {
  const result: {[permalink: string]: AuthoredItemGroup<Item>} = {};

  items.forEach((item) => {
    getItemAuthors(item).forEach((author) => {
      // Init missing address groups
      // TODO: it's not really clear what should be the behavior if 2 addresses have
      // the same permalink but the label is different for each
      // For now, the first address found wins
      if (author.permalink) {
        result[author.permalink] ??= {
            author,
            items: [],
        };

        // Add item to group
        result[author.permalink]!.items.push(item);
      }
    });
  });

  // If user add twice the same tag to a md doc (weird but possible),
  // we don't want the item to appear twice in the list...
  Object.values(result).forEach((group) => {
    group.items = _.uniq(group.items);
  });

  return result;
}

/**
 * Permits to get the "author visibility" (hard to find a better name)
 * IE, is this author listed or unlisted
 * And which items should be listed when this author is browsed
 */
export function getAuthorVisibility<Item>({
  items,
  isUnlisted,
}: {
  items: Item[];
  isUnlisted: (item: Item) => boolean;
}): {
  unlisted: boolean;
  listedItems: Item[];
} {
  const allItemsUnlisted = items.every(isUnlisted);
  // When an author is full of unlisted items, we display all the items
  // when the author is browsed, but we mark the author as unlisted
  if (allItemsUnlisted) {
    return {unlisted: true, listedItems: items};
  }
  // When a author has some listed items, the author remains listed
  // but we filter its unlisted items
  return {
    unlisted: false,
    listedItems: items.filter((item) => !isUnlisted(item)),
  };
}
