export const getRarityColor = (rarity) => {
  switch (rarity) {
    case "common":
      return "#4ecdc4";
    case "rare":
      return "#ff6b6b";
    default:
      return "#4ecdc4";
  }
};

export const getRarityText = (rarity) => {
  switch (rarity) {
    case "common":
      return "Đặc Biệt";
    case "rare":
      return "Cao Cấp";
    default:
      return "Đặc Biệt";
  }
};