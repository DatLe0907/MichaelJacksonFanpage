import React, { useState } from "react";
import { useGame } from "../context/PointsContext";
import "./Shop.css"; // Đảm bảo có CSS đi kèm

const rarityLevels = [
  { name: "Common", color: "#B0C4DE", chance: 60 },  // 60%
  { name: "Rare", color: "#4682B4", chance: 30 },    // 30%
  { name: "Legendary", color: "#FFD700", chance: 10 }, // 10%
];

const items = {
  sticker: ["sticker1.png", "sticker2.png", "sticker3.png"],
  wallpaper: ["wallpaper1.jpg", "wallpaper2.jpg", "wallpaper3.jpg"],
};

const getRandomItem = (type) => {
  // Xác định độ hiếm theo tỉ lệ %  
  let rand = Math.random() * 100;
  let selectedRarity = rarityLevels.find((r) => (rand -= r.chance) < 0);

  // Chọn ngẫu nhiên 1 ảnh trong danh sách
  let randomImage = items[type][Math.floor(Math.random() * items[type].length)];

  return { image: randomImage, rarity: selectedRarity };
};

const BlindBox = () => {
  const { points, addPoints } = useGame();
  const [boxState, setBoxState] = useState({
    sticker: { flipped: false, reward: null },
    wallpaper: { flipped: false, reward: null },
  });

  const cost = 0;

  const openBox = (type) => {
    if (points < cost) {
      alert("Not enough tokens!");
      return;
    }

    setBoxState((prev) => ({
      ...prev,
      [type]: { flipped: true },
    }));

    setTimeout(() => {
      const reward = getRandomItem(type);
      setBoxState((prev) => ({
        ...prev,
        [type]: { flipped: true, reward },
      }));
      addPoints(-cost);
    }, 500);
  };

  const tryAgain = (type) => {
    setBoxState((prev) => ({
      ...prev,
      [type]: { flipped: false, reward: null },
    }));
  };

  return (
    <div className="blind-box-container">
      {["sticker", "wallpaper"].map((type) => (
        <div key={type} className="blind-box-wrapper">
          <div
            className={`blind-box ${boxState[type].flipped ? "flipped" : ""}`}
            onClick={!boxState[type].flipped ? () => openBox(type) : undefined}
          >
            <div className="blind-box-front">{type === "sticker" ? "Sticker" : "Wallpaper"}</div>
            <div
              className="blind-box-back"
              style={{ backgroundColor: boxState[type].reward?.rarity.color || "#fff" }}
            >
              {boxState[type].reward ? (
                <div>
                  <img
                    src={`/assets/photo/${type}/${boxState[type].reward.image}`}
                    alt=""
                    className="reward-image"
                  />
                  <a href={`/assets/photo/${type}/${boxState[type].reward.image}`} download className="btn">Download</a>
                  <button onClick={() => tryAgain(type)} className="btn">Try Again</button>
                </div>
              ) : (
                <p>?</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlindBox;
