// 从网页上抓取数据: 获取网页的html内容, 分析html内容, 提取数据, 保存数据到数据库中
const requset = require("../api/request");
const cheerio = require("cheerio");

// 获取书籍详情页链接
async function getBooksDetail() {
  const html = await requset.get("https://book.douban.com/latest");
  const $ = cheerio.load(html);
  const target = $("a.fleft", ".media__body");
  const links = target.map((_, el) => el.attribs.href).get();
  return links;
}

// 解析每个书籍详情页
async function parseBookDetail(link) {
  const html = await requset.get(link);
  const $ = cheerio.load(html);
  const cover = $("a.nbg", "#mainpic").attr("href");
  const title = $("h1 span").text();
  const author = $("span a", "#info").eq(0).text();
  const pubdate = $("#info>span.pl")
    .get()
    .find((el) => el.childNodes.find((node) => node.data.includes("出版年")))
    .nextSibling.data.trim();
  return {
    bookName: title,
    imgUrl: cover,
    author,
    publishDate: pubdate,
  };
}
// parseBookDetail('https://book.douban.com/subject/36919430/')
const fetchBooks = async () => {
  const links = await getBooksDetail();
  const books = Promise.all(links.map((link) => parseBookDetail(link)));
  return books;
};

const saveToDb = async () => {
  const books = await fetchBooks();
  console.log(books);
};
saveToDb();
