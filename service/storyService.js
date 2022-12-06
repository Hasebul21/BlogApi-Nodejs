const { ErrObject } = require('../middleWare/errorHandler');
const Story = require('../model/storyModel');

const createStory = async (req) => {
   try {
      const currentStory = req.body;
      const story = await Story.create({
         title: currentStory.title,
         email: currentStory.email,
         description: currentStory.description,
      });
      return story;
   } catch (err) {
      return err;
   }
};

const getAllStory = async (req) => {
   const storys = await Story.findAll();
   return storys;
};

const getSingleStory = async (req) => {
   const storyId = Number(req.params.id);
   const currentStory = await Story.findOne({ where: { id: storyId } });
   if (currentStory != null) return currentStory;
   return ErrObject(
      404,
      'Not Found',
      `User with id ${req.params.id} is not found`
   );
};

const updateStory = async (req) => {
   try {
      const StoryId = Number(req.params.id);
      const existStory = await Story.findOne({ where: { id: StoryId } });
      if (existStory === null)
         throw new Error(`Story with id ${req.params.id} is not found`);
      const currentStory = req.body;
      await Story.update(
         {
            title: currentStory.title,
            email: currentStory.email,
            description: currentStory.description,
         },
         {
            where: {
               id: StoryId,
            },
         }
      );
      const updatedStory = await Story.findOne({ where: { id: StoryId } });
      return updatedStory;
   } catch (err) {
      return err;
   }
};

const deleteSingleStory = async (req) => {
   const storyId = Number(req.params.id);
   const storyExist = await Story.findOne({ where: { id: storyId } });
   if (storyExist) {
      await Story.destroy({ where: { id: storyId } });
      return storyExist;
   }
   return ErrObject(
      404,
      'Not Found',
      `User with id ${req.params.id} is not found`
   );
};

module.exports = {
   createStory,
   getAllStory,
   getSingleStory,
   deleteSingleStory,
   updateStory,
};
