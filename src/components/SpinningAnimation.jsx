import { useState, useEffect } from "react";
import "./SpinningAnimation.css";

const SpinningAnimation = ({ gifts, maleGiftGivers, selectedRecipient }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [slotMachine, setSlotMachine] = useState({
    slot1: { chars: [], currentIndex: 0, isSpinning: true },
    slot2: { chars: [], currentIndex: 0, isSpinning: true },
    slot3: { chars: [], currentIndex: 0, isSpinning: true }
  });
  const [finalName, setFinalName] = useState("");
  const [showingNames, setShowingNames] = useState([]);

  // Tạo danh sách ký tự cho slot machine
  const createCharList = () => {
    const allChars = [];
    maleGiftGivers.forEach(name => {
      name.split('').forEach(char => {
        if (!allChars.includes(char)) {
          allChars.push(char);
        }
      });
    });
    return [...allChars, ...allChars, ...allChars]; // Lặp lại để tạo hiệu ứng
  };

  useEffect(() => {
    const charList = createCharList();
    
    // Phase 1: Giới thiệu (3s)
    const phase1Timer = setTimeout(() => {
      setCurrentPhase(2);
      
      // Khởi tạo slot machine
      setSlotMachine({
        slot1: { chars: charList, currentIndex: 0, isSpinning: true },
        slot2: { chars: charList, currentIndex: 0, isSpinning: true },
        slot3: { chars: charList, currentIndex: 0, isSpinning: true }
      });
    }, 3000);

    // Phase 2: Slot Machine Effect (15s)
    const phase2Timer = setTimeout(() => {
      let nameIndex = 0;
      const nameInterval = setInterval(() => {
        if (nameIndex < maleGiftGivers.length * 6) { // Lặp 6 lần
          const actualIndex = nameIndex % maleGiftGivers.length;
          const currentName = maleGiftGivers[actualIndex];
          
          // Cập nhật danh sách tên hiển thị
          setShowingNames(prev => {
            const newNames = [...prev, currentName];
            return newNames.slice(-8); // Giữ 8 tên gần nhất
          });
          
          // Hiệu ứng slot machine cho từng ký tự
          const nameChars = currentName.split('');
          setTimeout(() => {
            setSlotMachine(prev => ({
              slot1: { ...prev.slot1, currentIndex: Math.floor(Math.random() * charList.length) },
              slot2: { ...prev.slot2, currentIndex: Math.floor(Math.random() * charList.length) },
              slot3: { ...prev.slot3, currentIndex: Math.floor(Math.random() * charList.length) }
            }));
          }, 100);
          
          nameIndex++;
        } else {
          clearInterval(nameInterval);
          setCurrentPhase(3);
        }
      }, 1200); // Mỗi 1.2s đổi tên - chậm để hồi hộp tối đa
    }, 3000);

    // Phase 3: Final Selection (20s)
    const phase3Timer = setTimeout(() => {
      // Chọn người cuối cùng và hiển thị từng ký tự
      const finalIndex = Math.floor(Math.random() * maleGiftGivers.length);
      const selectedName = maleGiftGivers[finalIndex];
      setFinalName(selectedName);
      
      // Dừng slot machine từng cái một
      setTimeout(() => {
        setSlotMachine(prev => ({ ...prev, slot1: { ...prev.slot1, isSpinning: false } }));
      }, 2000);
      
      setTimeout(() => {
        setSlotMachine(prev => ({ ...prev, slot2: { ...prev.slot2, isSpinning: false } }));
      }, 4000);
      
      setTimeout(() => {
        setSlotMachine(prev => ({ ...prev, slot3: { ...prev.slot3, isSpinning: false } }));
        setCurrentPhase(4);
      }, 6000);
      
    }, 18000);

    // Phase 4: Kết thúc (sau 24s)
    const phase4Timer = setTimeout(() => {
      setCurrentPhase(5);
    }, 24000);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
    };
  }, [maleGiftGivers]);

  return (
    <div className="slot-machine-loading">
      <div className="slot-container">
        
        {/* Phase 1: Giới thiệu */}
        {currentPhase === 1 && (
          <div className="intro-phase">
            <div className="casino-title">
              🎰 CASINO CHỌN QUÀ 20/10 🎰
            </div>
            <div className="casino-subtitle">
              Đang khởi động máy đánh bạc tình yêu...
            </div>
            <div className="casino-lights">
              <span className="light"></span>
              <span className="light"></span>
              <span className="light"></span>
              <span className="light"></span>
              <span className="light"></span>
            </div>
          </div>
        )}

        {/* Phase 2: Slot Machine Names */}
        {currentPhase === 2 && (
          <div className="slot-phase">
            <div className="selection-title">
              🎯 ĐANG QUAY SỐ MAY MẮN CHO
            </div>
            <div className="recipient-highlight">
              💖 {selectedRecipient} 💖
            </div>
            
            <div className="name-history">
              <div className="history-title">📋 Danh sách đã quay:</div>
              <div className="history-list">
                {showingNames.map((name, index) => (
                  <div 
                    key={index} 
                    className="history-name"
                    style={{ 
                      opacity: 0.4 + (index * 0.08),
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="slot-indicator">
              🎲 Đang quay... Hãy chờ kết quả! 🎲
            </div>
          </div>
        )}

        {/* Phase 3: Slot Machine Character Selection */}
        {currentPhase === 3 && (
          <div className="slot-machine-phase">
            <div className="slot-title">
              🎰 SLOT MACHINE ĐANG CHỌN NGƯỜI MAY MẮN 🎰
            </div>
            
            <div className="slot-machine-container">
              <div className="slot-machine-frame">
                <div className="slot-reel">
                  <div className={`slot-char ${slotMachine.slot1.isSpinning ? 'spinning' : 'stopped'}`}>
                    {slotMachine.slot1.chars[slotMachine.slot1.currentIndex] || '?'}
                  </div>
                </div>
                <div className="slot-reel">
                  <div className={`slot-char ${slotMachine.slot2.isSpinning ? 'spinning' : 'stopped'}`}>
                    {slotMachine.slot2.chars[slotMachine.slot2.currentIndex] || '?'}
                  </div>
                </div>
                <div className="slot-reel">
                  <div className={`slot-char ${slotMachine.slot3.isSpinning ? 'spinning' : 'stopped'}`}>
                    {slotMachine.slot3.chars[slotMachine.slot3.currentIndex] || '?'}
                  </div>
                </div>
              </div>
              
              <div className="slot-machine-lights">
                <div className="light-strip">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="casino-bulb" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="slot-status">
              🔥 ĐANG QUAY... JACKPOT SẮP RA! 🔥
            </div>
          </div>
        )}

        {/* Phase 4: Final Result */}
        {currentPhase === 4 && (
          <div className="final-result-phase">
            <div className="jackpot-title">
              🎊 JACKPOT! 🎊
            </div>
            <div className="winner-announcement">
              NGƯỜI MAY MẮN LÀ:
            </div>
            <div className="final-winner">
              {finalName}
            </div>
            <div className="celebration">
              🎉 CHÚC MỪNG! 🎉
            </div>
          </div>
        )}

        {/* Phase 5: Complete */}
        {currentPhase === 5 && (
          <div className="complete-phase">
            <div className="success-icon">🏆</div>
            <div className="success-text">
              Đã tìm ra người chiến thắng!
            </div>
          </div>
        )}

        {/* Casino Background Effects */}
        <div className="casino-particles">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="casino-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              {['💰', '🎰', '🎲', '⭐', '💎', '🔥'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        {/* Neon Border Effect */}
        <div className="neon-border"></div>
      </div>
    </div>
  );
};

export default SpinningAnimation;