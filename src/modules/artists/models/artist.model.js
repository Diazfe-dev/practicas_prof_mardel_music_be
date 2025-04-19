export class ArtistModel {
    constructor(data) {
        this.id = data.id;
        this.artistName = data.artistName;
        this.socialMediaURL = data.socialMediaURL;
        this.youtubeURL = data.youtubeURL;
        this.spotifyURL = data.spotifyURL;
        this.artistDescription = data.artistDescription;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}