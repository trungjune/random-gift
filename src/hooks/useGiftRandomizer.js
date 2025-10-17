import { useState } from "react";
import { maleGiftGivers, femaleRecipients, gifts } from "../data/giftData";
import { wishTemplates } from "../data/wishTemplates";

export const useGiftRandomizer = () => {
  const [recipientName, setRecipientName] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Lưu trữ lịch sử để tránh trùng lặp
  const [usedWishes, setUsedWishes] = useState([]);
  const [usedGivers, setUsedGivers] = useState([]);

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Lấy lời chúc không trùng trong 10 lần gần nhất
  const getUniqueWish = (giverName, recipientName) => {
    // Lọc ra những lời chúc chưa dùng trong 10 lần gần nhất
    const availableWishes = [];
    for (let i = 0; i < wishTemplates.length; i++) {
      if (!usedWishes.includes(i)) {
        availableWishes.push({ index: i, wish: wishTemplates[i] });
      }
    }

    // Nếu đã dùng hết hoặc còn quá ít, reset lại nhưng giữ lại lời chúc vừa dùng
    if (availableWishes.length <= 1) {
      const lastUsed = usedWishes[usedWishes.length - 1];
      setUsedWishes(lastUsed !== undefined ? [lastUsed] : []);
      
      // Lọc lại, loại trừ lời chúc vừa dùng
      const resetWishes = [];
      for (let i = 0; i < wishTemplates.length; i++) {
        if (i !== lastUsed) {
          resetWishes.push({ index: i, wish: wishTemplates[i] });
        }
      }
      
      if (resetWishes.length > 0) {
        const selected = getRandomItem(resetWishes);
        setUsedWishes([lastUsed, selected.index].filter(x => x !== undefined));
        return selected.wish
          .replace(/{giver}/g, giverName)
          .replace(/{recipient}/g, recipientName);
      }
    }

    const selected = getRandomItem(availableWishes);

    // Cập nhật danh sách đã dùng, giữ tối đa 10 lần gần nhất
    setUsedWishes((prev) => {
      const newUsed = [...prev, selected.index];
      // Giữ 10 lần gần nhất, hoặc ít hơn nếu tổng số lời chúc < 10
      const keepCount = Math.min(10, wishTemplates.length - 1);
      return newUsed.slice(-keepCount);
    });

    return selected.wish
      .replace(/{giver}/g, giverName)
      .replace(/{recipient}/g, recipientName);
  };

  // Lấy người tặng không trùng trong 10 lần gần nhất và không trùng người nhận
  const getUniqueGiver = (recipientName) => {
    let availableGivers = maleGiftGivers.filter(
      (giver) => giver !== recipientName && !usedGivers.includes(giver)
    );

    // Nếu không còn ai khả dụng, reset danh sách đã dùng
    if (availableGivers.length === 0) {
      setUsedGivers([]);
      availableGivers = maleGiftGivers.filter(
        (giver) => giver !== recipientName
      );
    }

    const selectedGiver = getRandomItem(availableGivers);

    // Cập nhật danh sách đã dùng, chỉ giữ 10 lần gần nhất
    setUsedGivers((prev) => {
      const newUsed = [...prev, selectedGiver];
      return newUsed.slice(-10);
    });

    return selectedGiver;
  };

  const handleSpin = () => {
    if (!recipientName.trim()) {
      alert("Vui lòng nhập tên người nhận quà! 💕");
      return;
    }

    const inputName = recipientName.trim();

    // Chỉ cho phép nam tặng nữ - kiểm tra tên có trong danh sách 8 nữ không
    const isInFemaleList = femaleRecipients.includes(inputName);

    if (!isInFemaleList) {
      alert(
        `Chỉ có thể chọn quà cho 8 chị em phụ nữ trong danh sách:\n${femaleRecipients.join(
          ", "
        )} 💕`
      );
      return;
    }

    // Bắt đầu với màn hình loading
    setIsLoading(true);
    setShowResult(false);
    setResult(null);
  };

  const handleLoadingComplete = (selectedGiver = null) => {
    setIsLoading(false);
    // Bỏ màn spinning, chuyển thẳng sang kết quả
    
    const selectedGift = getRandomItem(gifts);
    // Sử dụng người tặng quà từ LoadingScreen, nếu không có thì dùng logic cũ
    const finalGiver = selectedGiver || getUniqueGiver(recipientName);
    const selectedWish = getUniqueWish(finalGiver, recipientName);

    // Cập nhật danh sách đã dùng với người tặng quà được chọn
    if (selectedGiver) {
      setUsedGivers((prev) => {
        const newUsed = [...prev, selectedGiver];
        return newUsed.slice(-10);
      });
    }

    const newResult = {
      gift: selectedGift,
      wish: selectedWish,
      giver: finalGiver,
      recipient: recipientName,
    };

    setResult(newResult);
    // Hiển thị kết quả ngay sau một chút delay nhỏ
    setTimeout(() => setShowResult(true), 300);
  };

  const resetGame = () => {
    setResult(null);
    setShowResult(false);
    setIsLoading(false);
    setIsSpinning(false);
    setRecipientName("");
  };

  return {
    recipientName,
    setRecipientName,
    isSpinning,
    isLoading,
    result,
    showResult,
    handleSpin,
    handleLoadingComplete,
    resetGame,
    maleGiftGivers,
    femaleRecipients,
    gifts,
  };
};