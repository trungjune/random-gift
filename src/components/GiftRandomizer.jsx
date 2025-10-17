import "./GiftRandomizer.css";
import { useGiftRandomizer } from "../hooks/useGiftRandomizer";
import GiftInput from "./GiftInput";
import GiftResult from "./GiftResult";
import LoadingScreen from "./LoadingScreen";
import { useRef, useEffect } from "react";

const GiftRandomizer = () => {
  const {
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
  } = useGiftRandomizer();

  const audioRef = useRef(null);

  // Setup audio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.addEventListener("loadstart", () =>
        console.log("🎵 Audio loading started")
      );
      audio.addEventListener("canplay", () => console.log("🎵 Audio can play"));
      audio.addEventListener("error", (e) =>
        console.error("❌ Audio error:", e)
      );
      audio.load();
      console.log("🎵 Audio element initialized");
    }
  }, []);

  const handleSpinWithMusic = async () => {
    console.log("🎵 Button clicked - attempting to play music...");

    // Phát nhạc khi bắt đầu chọn quà
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.6;

        console.log("🎵 Audio src:", audioRef.current.src);
        console.log("🎵 Audio readyState:", audioRef.current.readyState);

        if (audioRef.current.readyState < 2) {
          console.log("🎵 Waiting for audio to load...");
          await new Promise((resolve) => {
            audioRef.current.addEventListener("canplay", resolve, {
              once: true,
            });
          });
        }

        await audioRef.current.play();
        console.log("🎵 Music playing successfully!");
      } catch (error) {
        console.error("❌ Music failed to play:", error);
      }
    }

    // Gọi hàm handleSpin gốc
    handleSpin();
  };

  const handleResetWithMusicStop = () => {
    // Dừng nhạc khi reset
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log("🎵 Music stopped");
    }
    resetGame();
  };

  return (
    <div className="gift-randomizer">
      {/* Audio element cho nhạc nền */}
      <audio
        ref={audioRef}
        preload="auto"
        src="./assets/audio/videoplayback.mp3"
        crossOrigin="anonymous"
      ></audio>

      <div className="randomizer-container">
        {!showResult && !isLoading && (
          <GiftInput
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            handleSpin={handleSpinWithMusic}
            isSpinning={isSpinning}
            maleGiftGivers={maleGiftGivers}
            femaleRecipients={femaleRecipients}
          />
        )}

        {result && showResult && (
          <GiftResult result={result} resetGame={handleResetWithMusicStop} />
        )}

        <div className="butterflies">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`butterfly butterfly-${i + 1}`}>
              🦋
            </div>
          ))}
        </div>
      </div>

      <LoadingScreen
        isVisible={isLoading}
        recipientName={recipientName}
        onComplete={handleLoadingComplete}
        maleGiftGivers={maleGiftGivers}
      />
    </div>
  );
};

export default GiftRandomizer;
