const express = require('express');
const Story = require('../model/storyModel');
const { errorMiddleware } = require('../middleWare/errorHandler');
const StoryService = require('../service/storyService');

const storyRouter = express.Router();

storyRouter.post('/', async (req, res, next) => {
   const currentStory = await StoryService.createStory(req);
   if (currentStory instanceof Story === false) next(currentStory);
   else res.status(201).send(currentStory);
});

storyRouter.get('/', async (req, res, next) => {
   const storys = await StoryService.getAllStory(req);
   res.status(200).send(storys);
});

storyRouter.get('/:id', async (req, res, next) => {
   const currentStory = await StoryService.getSingleStory(req);
   if (currentStory instanceof Story === false) next(currentStory);
   else res.status(200).send(currentStory);
});

storyRouter.put('/:id', async (req, res, next) => {
   const currentStory = await StoryService.updateStory(req);
   if (currentStory instanceof Story === false) next(currentStory);
   else res.staus(204).send(currentStory);
});

storyRouter.delete('/:id', async (req, res, next) => {
   const currentStory = await StoryService.deleteSingleStory(req);
   if (currentStory instanceof Story === false) next(currentStory);
   else res.staus(204).send(currentStory);
});

module.exports = storyRouter;
