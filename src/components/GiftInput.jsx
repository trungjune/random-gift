import "./GiftInput.css";

const GiftInput = ({
  recipientName,
  setRecipientName,
  handleSpin,
  isSpinning,
  maleGiftGivers,
  femaleRecipients,
}) => {

  return (
    <>

      <h1 className="randomizer-title">
        <span className="gradient-text">
          ✨ LUXURY GIFT COLLECTION 20/10 ✨
        </span>
        <br />
        <span className="subtitle">
          "Dành tặng những nàng thơ xinh đẹp của SPC"
        </span>
      </h1>

      <div className="input-section">
        <div className="input-group">
          <label htmlFor="recipient">💝 Chọn nàng thơ may mắn:</label>
          <div className="select-wrapper">
            <select
              id="recipient"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="recipient-select"
              disabled={isSpinning}
            >
              <option value="">✨ Chọn một nàng thơ xinh đẹp ✨</option>
              {femaleRecipients.map((name, index) => (
                <option key={index} value={name}>
                  🌹 {name}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1L6 6L11 1"
                  stroke="#4ecdc4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <button
          className={`spin-button ${isSpinning ? "spinning" : ""}`}
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? (
            <>
              <span className="spinner">🎰</span>
              <span>Đang chọn quà...</span>
            </>
          ) : (
            <>
              <span>🎁 BẮT ĐẦU CHỌN QUÀ</span>
              <div className="btn-glow"></div>
            </>
          )}
        </button>
      </div>

      <div className="stats-info">
        <div className="stat-item">
          <span className="stat-number">{maleGiftGivers.length}</span>
          <span className="stat-label">Quý ông tặng quà</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{femaleRecipients.length}</span>
          <span className="stat-label">Nàng thơ may mắn</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100+</span>
          <span className="stat-label">Phần quà cao cấp</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">&lt;1 tỉ</span>
          <span className="stat-label">Tổng giá trị</span>
        </div>
      </div>
    </>
  );
};

export default GiftInput;
