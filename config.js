module.exports = {
    utorrentHost: "localhost",
    utorrentPort: 20080,
    utorrentTokenHtml: "/gui/token.html",
    utorrentList: "/gui/?list=1&token=%s",
    utorrentGetProps: "/gui/?token=%s&action=getprops&hash=%s",
//    flokiHost: "localhost",
    flokiHost: "floki.herokuapp.com",
//    flokiPort: 8081,
    flokiPort: 80,
    flokiTorrentsReportAPI: "/torrents",
    flokiTrackersReportAPI: "/trackers"
};