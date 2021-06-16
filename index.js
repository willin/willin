const dayjs = require('dayjs');
require('dayjs/locale/zh-cn');
const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { v0, codewars } = require('./lib');

dayjs().utcOffset(8);

(async () => {
  let md = readFileSync(path.join(__dirname, '.template.md'), { encoding: 'utf8' });
  const v0Result = await v0();
  const { postcount, wordcount, posts } = v0Result;

  let writings = `共计篇 \`${postcount}\` 文章，\`${
    Math.round((wordcount * 100) / 10000) / 100
  }\` 万字。\n\n<details><summary>Latest Posts</summary>\n\n`;
  for (let i = 0; i < posts.length && i < 10; i += 1) {
    const { title, slug, category: [category = ''] = [], date } = posts[i];
    writings += `- [${title}](https://v0.chat/p/${slug}/) | ${category} | ${dayjs(date).format('YYYY 年 MM 月 DD 日')}\n`;
  }

  writings += '\n\n</details>';

  md = md.replace('<!-- WRITINGS -->', writings);

  const cwResult = await codewars();
  const { score, position, level, total } = cwResult;

  let rankup = `@jsv0 | ***${level}*** (${score})\n\n`;
  rankup += `Leaderboard Position: ***${position}***, Total Completed Kata: ***${total}***`;
  md = md.replace('<!-- CODEWARS -->', rankup);

  md = md.replace('<!-- UPDATED_TIME -->', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  writeFileSync(path.join(__dirname, 'README.md'), md, { encoding: 'utf8' });
})();
