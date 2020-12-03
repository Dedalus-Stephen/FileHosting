const { Router } = require('express');
const start = require('../util/compressor/encode')

const Image = require('../models/Image');
const Text = require('../models/Text');

const router = Router();

router.post('/compress',
    async (req, res) => {
        try {
            const { data, userId, id, type, name } = req.body;
            const { compressed, tree } = start(data);
            const size = Math.round(compressed.length / 8);

            if (type === 'text') {
                await new Text({
                    text: compressed,
                    userId,
                    textId: id,
                    tree,
                    name
                }).save();
            } else {
                await new Image({
                    image: compressed,
                    userId,
                    imageId: id,
                    tree,
                    name
                }).save();
            }

            res.status(200).json({ message: "Compressed!", size });
        } catch (e) {
            console.log(e.message, "e.message/compress");
            res.status(500).json({ message: "Couldn't compress. There is probably a problem with mongo" });
        }
    })

router.post('/getCompressed',
    async (req, res) => {
        try {
            const { id, type } = req.body;
            console.log(req.body);

            if (type === 'image') {
                const image = await Image.findOne({ imageId: id });
                res.status(200).json({ bin: image.image, tree: image.tree });
            } else {
                const text = await Text.findOne({ textId: id });
                res.status(200).json({ bin: text.text, tree: text.tree });
            }
        } catch (e) {
            console.log(e.message, "e.message/getCompressed");
            res.status(500).json({ message: "Couldn't fetch the data. There is probably a problem with mongo" });
        }
    })

router.post('/getAll',
    async (req, res) => {
        try {
            const { userId } = req.body;

            const imagesQuery = await Image.find({ userId });
            const textsQuery = await Text.find({ userId });

            const images = imagesQuery.map(item => { return { name: item.name, id: item.imageId, type: 'image' } });
            const texts = textsQuery.map(item => { return { name: item.name, id: item.textId, type: 'text' } });

            res.status(200).json({ items: [...images, ...texts] });

        } catch (e) {
            console.log(e.message, "e.message/getAll");
            res.status(500).json({ message: "Couldn't fetch all. There is probably a problem with mongo" });
        }
    })

router.post('/delete',
    async (req, res) => {
        try {
            const { id, type } = req.body;
            console.log(type)
            if(type === 'image') {
                await Image.deleteOne({imageId: id});
            } else {
                console.log("here delete")
                await Text.deleteOne({textId: id});
            }

            res.status(200).json({ message: "Successfuly deleted selected item" });
        } catch (e) {
            console.log(e.message, "e.message/getAll");
            res.status(500).json({ message: "Couldn't fetch all. There is probably a problem with mongo" });
        }
    })

module.exports = router;