import Jimp from "jimp";

import { handleFileSelect } from "./handleFileSelect";

export const fileToImage = async (file: File) => {
  const buffer = await handleFileSelect(file);
  const jimage = await Jimp.read(Buffer.from(buffer));
  const mime = jimage.getMIME();
  const newMime = mime === "image/jpeg" ? mime : "image/gif";
  console.log(mime, newMime);
  const resizedBuffer = await jimage
    .quality(70)
    .scaleToFit(256, 128, "")
    .getBufferAsync(newMime);
  return resizedBuffer;
};
