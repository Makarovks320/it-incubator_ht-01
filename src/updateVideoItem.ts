import {video} from "./index";

export function updateVideoItem (oldV: video, newV: video): video {
    return {
        id: oldV.id,
        title: newV.title || oldV.title,
        author: newV.author || oldV.author,
        canBeDownloaded: newV.canBeDownloaded || oldV.canBeDownloaded,
        minAgeRestriction: newV.minAgeRestriction || oldV.minAgeRestriction,
        createdAt: oldV.createdAt,
        publicationDate: newV.publicationDate || oldV.publicationDate,
        availableResolutions: newV.availableResolutions || oldV.availableResolutions
    };
}
