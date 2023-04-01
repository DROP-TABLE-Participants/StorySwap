import fetch from "node-fetch";
import fs from "node:fs";
import FileService from "./FileService";

const engineId = "stable-diffusion-768-v2-1";
const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
const apiKey = process.env.STABILITY_API_KEY;

export default class ImageService {
  static async generateFirstImage(prompt: string) {
    console.log(prompt);
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `I have the following story: '${prompt}'. Try to generate an image of this story.`,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: "NONE",
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 100,
          seed: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    else {
        console.log("Response is ok")
    }

    interface GenerationResponse {
      artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
      }>;
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    responseJSON.artifacts.forEach((image) => {
      FileService.uploadImage(Buffer.from(image.base64, "base64"));
    });
  }

  static async generateSecondImages(prevPrompt: string, prompt: string) {
    console.log(prompt);
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `I have the following previous part of a story: '${prevPrompt}'. Now I have added this part: '${prompt}'. Try to generate an image of the last part of the story.`,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: "NONE",
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 100,
          seed: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    else {
        console.log("Response is ok")
    }

    interface GenerationResponse {
      artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
      }>;
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    responseJSON.artifacts.forEach((image) => {
      FileService.uploadImage(Buffer.from(image.base64, "base64"));
    });
  }
}
