import "./GiftResult.css";
import { getRarityColor, getRarityText } from "../utils/giftUtils";

const GiftResult = ({ result, resetGame }) => {
  return (
    <div className="result-section">
      <div className="result-card">
        <div className="result-header">
          <h2>🎉 KẾT QUẢ CHỌN QUÀ 🎉</h2>
        </div>

        <div className="gift-display">
          <div
            className="gift-icon"
            style={{ color: getRarityColor(result.gift.rarity) }}
          >
            {result.gift.emoji}
          </div>
          <div className="gift-info">
            <h3 className="gift-name">{result.gift.name}</h3>
            <span
              className="gift-rarity"
              style={{ color: getRarityColor(result.gift.rarity) }}
            >
              ⭐ {getRarityText(result.gift.rarity)}
            </span>
          </div>
        </div>

        <div className="participants">
          <div className="participant-row">
            <span className="participant-info">
              <span className="label">💝 Người tặng:</span>
              <span className="name">{result.giver}</span>
            </span>
            <div className="love-arrow">💕➡️💕</div>
            <span className="participant-info">
              <span className="label">🎁 Người nhận:</span>
              <span className="name">{result.recipient}</span>
            </span>
          </div>
        </div>

        <div className="wish-section">
          <h4>💌 Lời chúc ngọt ngào:</h4>
          <p className="wish-text">"{result.wish}"</p>
          <p className="signature">
            - Từ {result.giver} gửi đến {result.recipient} 💕
          </p>
        </div>

        <button className="new-spin-button" onClick={resetGame}>
          🎁 Chọn quà tiếp
        </button>
      </div>
    </div>
  );
};

export default GiftResult;