export default class TodoItem {
  constructor({ content, date, id }) {
    this.content = content;

      this.date = date || new Date().getTime();
      this.id = id || this.date + ('' + parseInt(Math.random() * 10000));
  }
}