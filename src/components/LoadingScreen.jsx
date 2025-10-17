import { useState, useEffect, useRef } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({
  isVisible,
  recipientName,
  onComplete,
  maleGiftGivers = [],
}) => {
  const [currentName, setCurrentName] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRefs = useRef([]);
  const intervalRefs = useRef([]);
  const isCompletedRef = useRef(false);
  const startTimeRef = useRef(null);
  const isRunningRef = useRef(false);
  const progressRef = useRef(0);
  const hasStartedRef = useRef(false); // Track if animation has started

  useEffect(() => {
    if (!isVisible) {
      // Only cleanup if we're actually hiding
      if (hasStartedRef.current) {
        isCompletedRef.current = true;
        isRunningRef.current = false;
        hasStartedRef.current = false;
        timeoutRefs.current.forEach(clearTimeout);
        intervalRefs.current.forEach(clearInterval);
        timeoutRefs.current = [];
        intervalRefs.current = [];
      }
      return;
    }

    // Prevent multiple runs - CRITICAL FIX
    if (isRunningRef.current || hasStartedRef.current) {
      console.log("⚠️ Already running, skipping...");
      return;
    }

    isRunningRef.current = true;
    hasStartedRef.current = true;

    // Reset states only once at the very beginning
    setShowFireworks(false);
    setProgress(0);
    progressRef.current = 0;
    isCompletedRef.current = false;

    // Clear any existing timeouts/intervals
    timeoutRefs.current.forEach(clearTimeout);
    intervalRefs.current.forEach(clearInterval);
    timeoutRefs.current = [];
    intervalRefs.current = [];

    console.log("🎰 Starting 10-second loading sequence...");

    // Shuffle and select names for rotation
    const shuffled = [...maleGiftGivers].sort(() => 0.5 - Math.random());
    const finalWinner = shuffled[0]; // Winner is decided immediately

    console.log("🎰 Final winner (pre-selected):", finalWinner);

    startTimeRef.current = Date.now();
    let currentSpeed = 200; // Start fast (200ms)

    // Smooth progress bar update - synchronized with real time
    const progressInterval = setInterval(() => {
      if (isCompletedRef.current || !startTimeRef.current) {
        clearInterval(progressInterval);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;
      const progressPercent = Math.min((elapsed / 10000) * 100, 100); // 10 seconds = 10000ms

      // Only update if progress increases (strict prevention of resets)
      if (progressPercent > progressRef.current) {
        progressRef.current = progressPercent;
        setProgress(progressPercent);
      }

      // Stop progress when reaching 100%
      if (progressPercent >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(progressInterval);
      }
    }, 50); // Update every 50ms for smoother animation
    intervalRefs.current.push(progressInterval);

    // Name rotation with decreasing speed - RANDOM mỗi lần
    const rotateNames = () => {
      if (isCompletedRef.current || !startTimeRef.current) return;

      // Random một tên bất kỳ từ danh sách (không theo thứ tự)
      const randomIndex = Math.floor(Math.random() * shuffled.length);
      setCurrentName(shuffled[randomIndex]);

      // Check elapsed time based on real time, not rotation count
      const elapsed = Date.now() - startTimeRef.current;

      if (elapsed < 10000) {
        // Less than 10 seconds
        // Gradually slow down based on elapsed time
        const timeProgress = elapsed / 10000; // 0 to 1
        currentSpeed = 200 + timeProgress * 600; // 200ms -> 800ms

        const timeout = setTimeout(rotateNames, currentSpeed);
        timeoutRefs.current.push(timeout);
      } else {
        // 10 seconds elapsed - show final winner and start fireworks
        setCurrentName(finalWinner);

        // Ensure progress is 100% and stop all progress updates
        progressRef.current = 100;
        setProgress(100);

        // Clear progress interval to prevent further updates
        intervalRefs.current.forEach(clearInterval);
        intervalRefs.current = [];

        // Start fireworks immediately
        const fireworkTimeout = setTimeout(() => {
          if (!isCompletedRef.current) {
            console.log("🎆 Starting 2-second fireworks!");
            setShowFireworks(true);

            // Complete after 2 seconds of fireworks
            const completeTimeout = setTimeout(() => {
              if (!isCompletedRef.current) {
                console.log("✅ Loading complete! Winner:", finalWinner);
                isCompletedRef.current = true;
                isRunningRef.current = false;
                onComplete(finalWinner);
              }
            }, 2000);
            timeoutRefs.current.push(completeTimeout);
          }
        }, 200); // Shorter delay for smoother transition
        timeoutRefs.current.push(fireworkTimeout);
      }
    };

    // Start the rotation
    rotateNames();

    // Failsafe: Force completion after 12 seconds maximum
    const failsafeTimeout = setTimeout(() => {
      if (!isCompletedRef.current) {
        console.log("⚠️ Failsafe triggered - forcing completion");
        isCompletedRef.current = true;
        isRunningRef.current = false;

        // Clear all intervals and timeouts
        timeoutRefs.current.forEach(clearTimeout);
        intervalRefs.current.forEach(clearInterval);
        timeoutRefs.current = [];
        intervalRefs.current = [];

        // Ensure final state
        progressRef.current = 100;
        setProgress(100);
        setCurrentName(finalWinner);
        setShowFireworks(true);

        // Complete immediately
        setTimeout(() => onComplete(finalWinner), 500);
      }
    }, 12000); // 12 seconds failsafe
    timeoutRefs.current.push(failsafeTimeout);

    return () => {
      // Cleanup only when component unmounts or isVisible becomes false
      console.log("🧹 Cleaning up loading screen...");

      // Clear all timeouts and intervals
      timeoutRefs.current.forEach(clearTimeout);
      intervalRefs.current.forEach(clearInterval);
      timeoutRefs.current = [];
      intervalRefs.current = [];
    };
  }, [isVisible]); // CRITICAL: Only depend on isVisible to prevent re-runs

  if (!isVisible) return null;

  return (
    <div className="loading-screen-overlay">
      <div className="loading-screen-modal">
        <h2 className="loading-title">
          🎁 Hãy chọn người may mắn để tặng quà cho 🎁
        </h2>

        <div className="recipient-name">{recipientName}</div>

        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {progress < 100 ? `${Math.floor(progress)}%` : "🎉 Hoàn thành!"}
          </div>
        </div>

        <div className="suspense-indicator">
          <div className="heartbeat">💓</div>
          <div className="music-equalizer">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        <div
          className={`loading-text-container ${
            showFireworks ? "fireworks-active" : ""
          }`}
        >
          <span className="loading-text">{currentName}</span>
          {!showFireworks && <span className="loading-cursor">|</span>}
        </div>

        {!showFireworks && (
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}

        {/* Hiệu ứng pháo hoa */}
        {showFireworks && (
          <div className="fireworks-container">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}>
                🎆
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
