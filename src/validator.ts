import {video} from './index';

type errorMessage = {
    message: string,
    field: string
};
type errorsList = {
    errorsMessages: errorMessage[]
};

const Resolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

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
        if (video.title.length > 40) {
            result.errorsMessages.push({
                message: 'Max length',
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
        if (video.author.length > 20) {
            result.errorsMessages.push({
                message: 'Max length',
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

    if (video.availableResolutions) {
        video.availableResolutions.forEach(res => {
            if (!Resolution.includes(res)) {
                result.errorsMessages.push({
                    message: 'incorrect value',
                    field: 'availableResolutions'
                })
            }
        })
    }

    if (video.publicationDate) {
        if (video.publicationDate.length !== 24) {
            result.errorsMessages.push({
                message: 'ISO format required',
                field: 'publicationDate'
            })
        }
    }
    return result;
}