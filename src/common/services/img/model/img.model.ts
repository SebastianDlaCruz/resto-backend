interface ImageData {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: number;
  height: number;
  size: number;
  time: number;
  expiration: number;
  image: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  thumb: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  delete_url: string;
}

export interface ImgData {
  data: ImageData;
}