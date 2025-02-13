const importAll = (r) => {
    let images = {};
    r.keys().forEach((fileName) => {
      const key = fileName.replace("./", "").replace(/\.[^/.]+$/, ""); // Xóa ./ và phần mở rộng
      images[key] = r(fileName);
    });
    return images;
  };
  
  // Import toàn bộ ảnh trong thư mục sticker
  const stickerImgs = importAll(require.context("./", false, /\.(png|jpe?g|svg)$/));
  
  export default stickerImgs;
  