import React, { useEffect, useState } from "react";

const ScrollProgressCircle = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const totalScrollable = scrollHeight - clientHeight;

    const scrolled = (scrollTop / totalScrollable) * 100;
    setProgress(Math.min(scrolled, 100)); // محدود کردن به حداکثر 100
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={styles.container}>
      <svg width="50" height="50">
        {/* دایره پس‌زمینه */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#e0e0e0"
          strokeWidth="4"
          fill="none"
        />
        {/* دایره پیشرفت */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#007bff"
          strokeWidth="4"
          fill="none"
          strokeDasharray="125.6" // محیط کامل دایره: 2 * Math.PI * r
          strokeDashoffset={125.6 - (125.6 * progress) / 100}
          style={{
            transition: "stroke-dashoffset 0.2s ease-out",
          }}
        />
        {/* درصد داخل دایره */}
        <text
          x="25"
          y="28"
          textAnchor="middle"
          fill="#007bff"
          fontWeight="bold"
          className="text-xs"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    padding: "6px",
  },
};

export default ScrollProgressCircle;
