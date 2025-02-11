import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  // Hàm mã hóa và giải mã an toàn hơn
  const encrypt = (data) => btoa(data + "_secretKey");
  const decrypt = (data) => {
    try {
      return atob(data).replace("_secretKey", "");
    } catch {
      return "0"; // Nếu lỗi, trả về 0 điểm
    }
  };

  // Load điểm từ localStorage khi mở game
  useEffect(() => {
    const savedPoints = localStorage.getItem("gamePoints");
    if (savedPoints) {
      setPoints(parseInt(decrypt(savedPoints), 10));
    }
  }, []);

  // Cập nhật điểm và lưu vào localStorage
  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem("gamePoints", encrypt(newPoints.toString()));
  };

  return (
    <GameContext.Provider value={{ points, addPoints }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
