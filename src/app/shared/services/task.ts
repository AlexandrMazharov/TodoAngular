export class Task {
  id: number;
  title: string;
  isСompleted: boolean;

  constructor(t: string, id: number) {
    this.id = id;
    this.title = t;
    this.isСompleted = false;
  }
}
