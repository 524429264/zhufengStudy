const path = '/user/:uid/:name';
const reg = /\/user\/([^/]+)\/([^/]+)/;
const url = '/user/592/xmg';
console.log(reg.exec(url));
console.log(url.match(reg));