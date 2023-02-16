import DB_Provider from "../model/provider.js";
import Track from "../model/schema/track.js";
import { CRUDController } from "./CRUD.controller.js";

class TrackController extends CRUDController {
  constructor() {
    super(Track, "tracks");
  }

  async get(req, res) {
    const tracks = await super.get(req, res, "raw");
    const cleanTracks = DB_Provider.normalizeAll(tracks);

    return res.json(cleanTracks);
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const tracks = [];
    for (const track of req.body) {
      const data = { body: track };
      const createdTrack = await super.create(data, res, "raw");
      const cleanTrack = DB_Provider.normalize(createdTrack);
      tracks.push(cleanTrack);
    }

    return res.json(tracks);
  }

  async update(req, res) {
    for (const track of req.body) {
      const data = { body: track };
      await super.update(data, res, "raw");
    }

    return res.json(null);
  }
}

export default new TrackController();
