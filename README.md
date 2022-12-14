# About the Plugin
Get hyper-realistic copyright free custom image assets generated by AI inside Figma.

Powered by Stable Diffusion 🧨

#### Features

**Text to Image**: Generate a high quality picture based on textual description. Use style cues with an accurate description to spin up a new image in a couple of seconds.
**Image/Sketch to Image**: Use a design or sketch or image + text description to generate a high quality image based off of original image. Adjust ```prompt_strength``` to alter the influence of original image on rendered image.
**Explore**: Browse image assets created by other users based on a variety of prompts and combination of styles.

#### How to Run
**Authentication**: Sign up using Figma or Google or create an account in Snappy.
From Quick Actions : Press ```⌘ + /``` to open Quick actions and search for ```snappy``` . Press ```tab``` and enter prompt to quickly generate an image onto your artboard.
**From Plugin UI**: Install the plugin from the menu and choose between methods of generating your custom image.

- For *freestyle generations*, enter prompt and hit generate, wait a couple of seconds for your image to populate the canvas. Customise the parameters for fine-tuning your output image.

- For *inspired generations*, upload/draw a sketch of what your generated image should look like, type in the prompt, adjust your prompt_strength and hit generate. Wait for a couple of seconds for the image to populate your canvas. The value of prompt_strength determines how further your generation will be from the original image.

**Prompt Engineering:**
The quality of your generation depends solely on the quality of your prompt. For best practices, refer to the “Prompt Guide” section of the plugin.

Website - snappy-plugin.com

# Development
## Get started

You'll need to setup both your development environment and add the plugin to Figma in order to get developing your plugin.

### Dev enironment

Clone the project to your local repository and then install dependencies using npm.

### Figma

Add the plugin to Figma for development. Note that this will not publish the plugin and it will only be visible to you.

1. Open Figma
2. Click on your profile icon dropdown in the top right and select `Plugins` from the list
3. Scroll down to the `In development` section and click the plus(+) icon
4. In the `Link existing plugin` section, click the box to choose your `manifest.json` file
5. Locate the `manifest.json` in your newly created project and then select `Open`
6. Now you will be able to use this plugin within a design file 🎉
