export class Image {
  id: number;
  name: string;
  type: string;
  picByte: FormData;


  constructor( name: string, type: string, picByte: any) {
    this.name = name;
    this.type = type;
    this.picByte = picByte;
  }
}