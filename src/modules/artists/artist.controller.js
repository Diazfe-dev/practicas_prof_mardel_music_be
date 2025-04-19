import { errorResponse, successResponse } from "../../utils/index.js";

export class ArtistController {
    constructor(artistService) {
        this.artistService = artistService;
    }

    getAll = async (req, res) => {
        try {
            const validated = req.validated;
            const artists = await this.artistService.getAll(validated);
            if (!artists) return errorResponse(req, res, 'Artists not found', 404);
            return successResponse(req, res, artists, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };

    getById = async (req, res) => {
        try {
            const validated = req.validated;
            const artist = await this.artistService.getById(validated);
            if (!artist) return errorResponse(req, res, 'Artist not found', 404);
            return successResponse(req, res, artist, 200);
        } catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };

    getByName = async (req, res) => {
        try {
            const validated = req.validated;
            const artists = await this.artistService.getByName(validated);
            if (!artists) return errorResponse(req, res, 'Artists not found', 404);
            return successResponse(req, res, artists, 200);
        } catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };

    create = async (req, res) => {
        try {
            const validated = req.validated;
            const artistExists = await this.artistService.getByName(validated.artistName);
            if (artistExists) return errorResponse(req, res, 'Artist already exists', 409);

            const artist = await this.artistService.create(validated);
            if (!artist) return errorResponse(req, res, 'Artist not found', 404);

            return successResponse(req, res, artist, 200);
        } catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };

    update = async (req, res) => {
        try {
            const validated = req.validated;
            const artistExists = await this.artistService.getById(validated.id);
            if (!artistExists) return errorResponse(req, res, 'Artist not found', 404);

            const artist = await this.artistService.update(validated);
            if (!artist) return errorResponse(req, res, 'Failed updating artist', 400);

            return successResponse(req, res, artist, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };

    delete = async (req, res) => {
        try {
            const validated = req.validated;
            const artist = await this.artistService.delete(validated.id);
            if (!artist) return errorResponse(req, res, 'Failed deleting artist', 400);

            return successResponse(req, res, artist, 200);
        }
        catch (error) {
            console.log(error);
            return errorResponse(req, res, error.message, 500);
        }
    };
}