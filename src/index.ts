import express, {Request, Response} from "express";
import {validateVideo} from "./validator";
import {makeVideoItem} from "./makeVideoItem";
import {updateVideoItem} from "./updateVideoItem";

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();
app.use(jsonParser);

// types
enum Resolution {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

export type video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: Resolution[] | null
};

// db
const db: { videos: video[] } = {
    videos: [
        {
            id: 0,
            title: "string",
            author: "string",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2022-11-15T13:08:40.365Z",
            publicationDate: "2022-11-15T13:08:40.365Z",
            availableResolutions: [Resolution.P144]
        },
        {
            id: 1,
            title: "rrrrr",
            author: "eeeeee"
        },
        {
            id: 2,
            title: "gg",
            author: "oooooloooo"
        }
    ]
};

// routes
app.get('/', (req: Request, res: Response) => {
    let text = 'Hello World!';
    res.send(text);
});
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(db.videos);
});
app.get('/videos/:id', (req: Request, res: Response) => {
    const video = db.videos.find(v => v.id === +req.params.id);
    if (video) {
        res.status(200).send(video);
    } else {
        res.send(404);
    }
});
app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.send(204);
});
app.post('/videos', (req: Request, res: Response) => {
    const newVideo: video = makeVideoItem(req.body);
    const validationResult = validateVideo(newVideo);
    if (validationResult.errorsMessages.length > 0) {
        res.status(400).send(validationResult);
        return;
    }
    db.videos.push(newVideo);
    res.status(201).send(newVideo);
});
app.put('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    let index = 0; //чтобы интерпретатор не жаловался, все равно id переопределится, если видео существует
    let video = db.videos.find((v, i) => {
        if (v.id === id) {
            index = i;// порядковый номер найденного видео
            return true;
        }
    });
    if (!video) {
        res.send(404).send(video);
        return;
    }
    const newVideo = makeVideoItem(req.body, video.id);
    const validationResult = validateVideo(newVideo);
    if (validationResult.errorsMessages.length > 0) {
        res.status(400).send(validationResult);
        return;
    }
    db.videos[index] = updateVideoItem(db.videos[index], newVideo);
    res.send(204);
});
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = db.videos.find(v => v.id === id);
    if (!video) {
        res.send(404).send(video);
        return;
    }
    db.videos = db.videos.filter(v => v.id !== id);
    res.send(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
