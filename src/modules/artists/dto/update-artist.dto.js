export class UpdateArtistDto {
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

        if (this.artistName !== undefined && !this.artistName.trim()) {
            errors.push("Artist name cannot be empty");
        }

        if (this.artistDescription !== undefined && !this.artistDescription.trim()) {
            errors.push("Artist description cannot be empty");
        }

        if (this.socialMediaURL !== undefined && this.socialMediaURL && !this.validateUrl(this.socialMediaURL)) {
            errors.push("Invalid social media URL");
        }

        if (this.youtubeURL !== undefined && this.youtubeURL && !this.validateUrl(this.youtubeURL)) {
            errors.push("Invalid YouTube URL");
        }

        if (this.spotifyURL !== undefined && this.spotifyURL && !this.validateUrl(this.spotifyURL)) {
            errors.push("Invalid Spotify URL");
        }

        return errors;
    }

    validateUrl(url) {
        const urlRegex = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
        return urlRegex.test(url);
    }
}