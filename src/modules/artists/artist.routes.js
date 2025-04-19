import express from "express";

import connection from '../../database/mysql.db.js';
import { ArtistRepository } from '../../repository/artist/artist.repository.js';
import { ArtistService } from './artist.service.js';
import { ArtistController } from './artist.controller.js';

import { UUIDDto } from '../common/dto/uuid.dto.js';
import { ValidateDto } from '../common/middlewares/index.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { CreateArtistDto } from './dto/create-artist.dto.js';
import { UpdateArtistDto } from './dto/update-artist.dto.js';
import { AuthGuard, RoleGuard } from '../common/middlewares/index.js';
import {
    ROLE_USER_TAG,
    DTO_SOURCE_BODY,
    DTO_SOURCE_PARAMS,
    DTO_SOURCE_QUERY
} from '../../constants/constants.js';

const artistRepository = new ArtistRepository(connection);
const artistService = new ArtistService(artistRepository);
const artistController = new ArtistController(artistService);

const ArtistRouter = express.Router();

ArtistRouter.get(
    "/getAll",
    ValidateDto(PaginationDto, DTO_SOURCE_PARAMS, ['page', 'limit']),
    artistController.getAll
);

ArtistRouter.get(
    "/getById/:id",
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    artistController.getById
);

ArtistRouter.get(
    "/getByName",
    ValidateDto(PaginationDto, DTO_SOURCE_QUERY, ['name']),
    artistController.getByName
);

ArtistRouter.post(
    "/create",
    AuthGuard,
    RoleGuard(ROLE_USER_TAG),
    ValidateDto(CreateArtistDto, DTO_SOURCE_BODY),
    artistController.create
);

ArtistRouter.put(
    "/update",
    AuthGuard,
    RoleGuard(ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    ValidateDto(UpdateArtistDto, DTO_SOURCE_BODY),
    artistController.update
);

ArtistRouter.delete(
    "/delete/:id",
    AuthGuard,
    RoleGuard(ROLE_USER_TAG),
    ValidateDto(UUIDDto, DTO_SOURCE_PARAMS, ["id"]),
    artistController.delete
);

export default ArtistRouter;