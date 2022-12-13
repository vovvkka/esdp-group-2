const express = require('express');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");
const News = require("../models/News");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        let news;

        if (req.query.shop) {
            news = await News.find({published: true}).sort({createdAt: -1});

            if (req.query.limit) {
                news = await News.find({published: true}).sort({createdAt: -1}).limit(req.query.limit);
            }
        } else {
            news = await News.find().sort({createdAt: -1});
        }

        res.send(news);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const news = await News.
        findById(req.params.id);
        if(!news) {
            return res.status(404).send({message: 'News not found!'});
        }
        res.send(news);
    }
    catch {
        res.sendStatus(500);
    }
});
router.post('/',auth,permit('admin'), upload.single('image'), async (req, res) => {
    const {title, description} = req.body;
    const newsData = {
        title,
        description,
        image: null,
    }
    if(req.file) {
        newsData.image = 'uploads/' + req.file.filename;
    }
    try {
        const news = new News(newsData);
        await news.save();
        res.send(news);
    } catch (e) {
        res.status(400).send({errors: e.errors});
    }
});

router.post('/:id/publish',auth,permit('admin'),async(req,res)=>{
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).send({message: 'Album not found!'});
        }

        const updateNews = await News
            .findByIdAndUpdate(req.params.id,  {published: !news.published});

        res.send(updateNews);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/:id',auth,permit('admin'), upload.single('image'), async (req, res) => {
    const {title, description} = req.body;
    const newsData = {
        title,
        description,
    };

    if (req.file) {
        newsData.image = 'uploads/' + req.file.filename;
    }
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            res.status(404).send({message: 'News not found!'});
        }
        const updateNews = await News
            .findByIdAndUpdate(req.params.id, newsData);
        res.send(updateNews);
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/:id',auth,permit('admin'), async (req,res)=>{
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            res.status(404).send({message: 'News not found!'});
        }
        await News.findByIdAndDelete(req.params.id);

        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;