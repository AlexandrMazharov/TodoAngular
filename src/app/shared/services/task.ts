export class Task {
  id: number;
  title: string;
  isСompleted: boolean;
  dt: string;

  constructor(t: string, id: number, date: string) {
    this.id = id;
    this.title = t;
    this.isСompleted = false;
    this.dt = date;
  }
}
