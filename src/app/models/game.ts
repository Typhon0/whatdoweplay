export class Game {
    appid: number;
    hasCommunityVisibleStats: string;
    imgIconUrl: string;
    imgLogoUrl: string;
    name: string;
    playtimeForever: number;
    playtimeLinuxForever: number;
    playtimeMacForever: number;
    playtimeWindowsForever: number;

    constructor(jsonData) {
        this.appid = jsonData.appid;
        this.hasCommunityVisibleStats = jsonData.has_community_visible_stats;
        this.imgIconUrl = jsonData.img_icon_url;
        this.imgLogoUrl = jsonData.img_logo_url;
        this.name = jsonData.name;
        this.playtimeForever = jsonData.playtime_forever;
        this.playtimeLinuxForever = jsonData.playtime_linux_forever;
        this.playtimeMacForever = jsonData.playtime_mac_forever;
        this.playtimeWindowsForever = jsonData.playtime_windows_forever;
    }

}
