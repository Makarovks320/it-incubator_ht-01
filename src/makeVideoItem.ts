import {video} from "./index";

export function makeVideoItem (v: video): video {
    const ms = (new Date).getTime();
    const createdDate = new Date(ms);
    const D = new Date(ms);
    const publicatedDate = new Date(D.setDate(D.getDate() + 1));

    return {
        id: new Date().valueOf(),
        title: v.title,
        author: v.author,
        canBeDownloaded: v.canBeDownloaded || false,
        minAgeRestriction: v.minAgeRestriction || null,
        createdAt: v.createdAt || createdDate.toISOString(),
        publicationDate: v.publicationDate || publicatedDate.toISOString(),
        availableResolutions: v.availableResolutions || null
    };
}
