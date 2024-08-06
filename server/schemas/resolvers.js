// server/resolvers/index.js

const Character = require('../models/Character');
const Story = require('../models/Story');

const resolvers = {
  Query: {
    getCharacter: async (_, { id }) => {
      return await Character.findById(id);
    },
    getStory: async (_, { id }) => {
      return await Story.findById(id).populate('choices');
    },
  },

  Mutation: {
    updateCharacter: async (_, { id, inventory, location }) => {
      return await Character.findByIdAndUpdate(id, { inventory, location }, { new: true });
    },
    createStory: async (_, { title, text }) => {
      const story = new Story({ title, text });
      return await story.save();
    },
    makeChoice: async (_, { storyId, choiceId }) => {
      const story = await Story.findById(storyId).populate('choices');
      const choice = story.choices.find(c => c.id === choiceId);
      
      // Define your logic for outcomes based on choices
      if (choice.outcome) {
        return {
          story: choice.outcome.story,
          success: true
        };
      }
      
      return {
        story: null,
        success: false
      };
    },
  },
};

module.exports = resolvers;
