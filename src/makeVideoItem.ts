import {video} from "./index";

export function makeVideoItem (v: video): video {
    return {
        id: new Date().valueOf(),
        title: v.title,
        author: v.author,
        canBeDownloaded: v.canBeDownloaded || false,
        minAgeRestriction: v.minAgeRestriction || null,
        createdAt: v.createdAt || (new Date).toISOString(),
        publicationDate: v.publicationDate || (new Date).toISOString(),
        availableResolutions: v.availableResolutions || null
    };
}