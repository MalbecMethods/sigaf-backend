import { v2 as cloudinary } from 'cloudinary';
import { getJson } from "serpapi";
import { envs } from "../environments/environments";


const { SERP_API } = envs;

export class LensService {
  constructor() {
    
  }

  async uploadFile(file: any) {
    try {
      cloudinary.config({
        cloud_name: 'dx7b1bamt',
        api_key: '817153929272851',
        api_secret: 'YGvdKYUJ27VuC3FFDZX97pYc698'
      });
      const fileId = `file_${Math.random()}`;
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: fileId,
      });
      const optimizeUrl = cloudinary.url(fileId, {
        fetch_format: 'auto',
        quality: 'auto',
      });
      console.log("Optimize URL: ", optimizeUrl);
      return optimizeUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getJsonData(url: string) {
    try {
      const jsonData = await getJson({
        engine: "google_lens",
        url: url,
        api_key: SERP_API
      });
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}