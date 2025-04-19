export class CreateArtistDto {
    constructor(data) {
        Object.assign(this, data);
        this.artistName = data.artistName;
        this.socialMediaURL = data.socialMediaURL;
        this.youtubeURL = data.youtubeURL;
        this.spotifyURL = data.spotifyURL;
        this.artistDescription = data.artistDescription;
    }

    validate() {
        const errors = [];
        if (!this.artistName) errors.push("Artist name is required");
        if (!this.artistDescription) errors.push("Artist description is required");

        if (this.socialMediaURL && !this.validateUrl(this.socialMediaURL)) errors.push("Invalid social media URL");
        if (this.youtubeURL && !this.validateUrl(this.youtubeURL)) errors.push("Invalid youtube URL");
        if (this.spotifyURL && !this.validateUrl(this.spotifyURL)) errors.push("Invalid spotify URL");

        return errors;
    }

    validateUrl(url) {
        const urlRegex = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
        return urlRegex.test(url);
    }
}