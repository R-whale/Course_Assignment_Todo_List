export default function (time) {
  let date = new Date(time);

  let now = new Date();

  let hours = date.getHours()>=10?date.getHours():('0'+date.getHours());
  let minutes = date.getMinutes()>=10?date.getMinutes():('0'+date.getMinutes());

  if (now.getFullYear() !== date.getFullYear()) {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + (date.getDate() + 1) + '日 ' + hours + ':' + minutes
  } else {
    if (now.getMonth() === date.getMonth() && Math.abs(now.getDate() - date.getDate()) <= 2) {
      let rili = ['今天 ', '昨天 ', '前天 '];
      return rili[Math.abs(now.getDate() - date.getDate())] + hours + ':' + minutes
    } else {
      return (date.getMonth() + 1) + '月' + (date.getDate() + 1) + '日 ' + hours + ':' + minutes
    }
  }
}
