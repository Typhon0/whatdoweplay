export class Game {
    appid: number;
    has_community_visible_stats: string;
    img_icon_url: string;
    img_logo_url: string;
    name: string;
    playtime_forever: number;
    playtime_linux_forever: number;
    playtime_mac_forever: number;
    playtime_windows_forever: number;

    constructor(jsonData) {
        this.appid = jsonData.appid;
        this.has_community_visible_stats = jsonData.has_community_visible_stats;
        this.img_icon_url = jsonData.img_icon_url;
        this.img_logo_url = jsonData.img_logo_url;
        this.name = jsonData.name;
        this.playtime_forever = jsonData.playtime_forever;
        this.playtime_linux_forever = jsonData.playtime_linux_forever;
        this.playtime_mac_forever = jsonData.playtime_mac_forever;
        this.playtime_windows_forever = jsonData.playtime_windows_forever;
    }

}