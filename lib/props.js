"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAuthorProp = exports.toAuthorsProp = exports.toTagProp = exports.toTagsProp = void 0;
function toTagsProp({ blogTags }) {
    return Object.values(blogTags)
        .filter((tag) => !tag.unlisted)
        .map((tag) => ({
        label: tag.label,
        permalink: tag.permalink,
        count: tag.items.length,
    }));
}
exports.toTagsProp = toTagsProp;
function toTagProp({ blogTagsListPath, tag, }) {
    return {
        label: tag.label,
        permalink: tag.permalink,
        allTagsPath: blogTagsListPath,
        count: tag.items.length,
        unlisted: tag.unlisted,
    };
}
exports.toTagProp = toTagProp;
function toAuthorsProp({ blogAuthors }) {
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
exports.toAuthorsProp = toAuthorsProp;
function toAuthorProp({ blogAuthorsListPath, author, }) {
    return {
        label: author.name,
        permalink: author.permalink,
        allAuthorsPath: blogAuthorsListPath,
        count: author.items.length,
        unlisted: author.unlisted,
    };
}
exports.toAuthorProp = toAuthorProp;
