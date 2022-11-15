// import express from 'express';
import {Request, Response} from "express";

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    let text = 'Hello World!';
    res.send(text);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});