export class Image {
  id: number;
  name: string;
  type: string;
  picByte: FormData;


  constructor(id: number, name: string, type: string, picByte: any) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.picByte = picByte;
  }
}
