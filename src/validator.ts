import {video} from './index';

type errorMessage = {
    message: string,
    field: string
};
type errorsList = {
    errorsMessages: errorMessage[]
};

export function validateVideo(video: video): errorsList {
    const result: errorsList = {errorsMessages: []};
    if (typeof video.title !== 'string') {
        result.errorsMessages.push({
            message: 'incorrect type',
            field: 'title'
        })
    } else {
        if (!video.title.trim()) {
            result.errorsMessages.push({
                message: 'field is empty',
                field: 'title'
            })
        }
    }

    if (typeof video.author !== 'string') {
        result.errorsMessages.push({
            message: 'incorrect type',
            field: 'author'
        })
    } else {
        if (!video.author.trim()) {
            result.errorsMessages.push({
                message: 'field is empty',
                field: 'author'
            })
        }
    }

    if (typeof video.canBeDownloaded !== 'boolean') {
        result.errorsMessages.push({
            message: 'incorrect type',
            field: 'canBeDownloaded'
        })
    }

    if (video.minAgeRestriction) {
        if (typeof video.minAgeRestriction !== 'number') {
            result.errorsMessages.push({
                message: 'incorrect type',
                field: 'minAgeRestriction'
            })
        } else {
            if (video.minAgeRestriction < 1 || video.minAgeRestriction > 18) {
                result.errorsMessages.push({
                    message: 'value should be between 1 and 18',
                    field: 'minAgeRestriction'
                })
            }
        }
    }

    return result;
}