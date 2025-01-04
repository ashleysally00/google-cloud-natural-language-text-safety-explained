// Remove imports and use React directly
const { useState, useEffect } = React;

const App = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const examples = [
    {
      text: "shut up",
      isBlocked: true,
      category: "Harassment",
      confidence: 0.8
    },
    {
      text: "please be quiet",
      isBlocked: true,
      category: "Potentially Disruptive",
      confidence: 0.6
    },
    {
      text: "I disagree with your approach",
      isBlocked: false,
      confidence: 0.95,
      message: "Constructive feedback"
    },
    {
      text: "Great job on the presentation!",
      isBlocked: false,
      confidence: 0.98,
      message: "Positive engagement"
    }
  ];

  useEffect(() => {
    // Reset states
    setTypedText("");
    setShowResult(false);
    
    // Start typing animation
    let currentText = "";
    const example = examples[currentExample].text;
    const typingDelay = 100; // milliseconds per character
    
    [...example].forEach((char, index) => {
      setTimeout(() => {
        currentText += char;
        setTypedText(currentText);
        
        // Show result after typing is complete
        if (index === example.length - 1) {
          setTimeout(() => setShowResult(true), 500);
        }
      }, index * typingDelay);
    });
    
    // Set up timer for next example
    const totalTime = (example.length * typingDelay) + 2500;
    const timer = setTimeout(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, totalTime);
    
    return () => clearTimeout(timer);
  }, [currentExample]);

  const example = examples[currentExample];

  return (
    <div style={{
      maxWidth: "500px",
      margin: "20px auto",
      padding: "24px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "16px"
      }}>Text Safety Demo</div>
      
      {/* Input Display with Cursor */}
      <div style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "6px",
        backgroundColor: "#f9fafb",
        marginBottom: "16px"
      }}>
        <div style={{fontSize: "14px", color: "#666"}}>Input:</div>
        <div style={{
          fontFamily: "monospace",
          position: "relative",
          minHeight: "1.2em"
        }}>
          {typedText}
          <span style={{
            display: showResult ? "none" : "inline-block",
            width: "2px",
            height: "1.2em",
            backgroundColor: "#000",
            marginLeft: "1px",
            verticalAlign: "middle",
            animation: "blink 1s step-end infinite"
          }}></span>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <div style={{
          padding: "16px",
          borderRadius: "6px",
          backgroundColor: example.isBlocked 
            ? (example.confidence >= 0.8 ? "#fee2e2" : "#fef3c7")
            : "#f0fdf4",
          border: `1px solid ${
            example.isBlocked 
              ? (example.confidence >= 0.8 ? "#fecaca" : "#fde68a")
              : "#bbf7d0"
          }`,
          transition: "all 0.3s ease"
        }}>
          <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
            <div style={{
              fontWeight: "bold",
              color: example.isBlocked 
                ? (example.confidence >= 0.8 ? "#b91c1c" : "#b45309")
                : "#15803d"
            }}>
              {example.isBlocked ? (
                example.confidence >= 0.8 ? 'Message Blocked' : 'Content Flagged'
              ) : 'Message Approved'}
            </div>
          </div>
          
          <div style={{marginTop: "8px", fontSize: "14px"}}>
            {example.isBlocked ? (
              <>
                <div style={{
                  color: example.confidence >= 0.8 ? "#dc2626" : "#d97706"
                }}>
                  Category: {example.category}
                </div>
                <div style={{
                  color: example.confidence >= 0.8 ? "#dc2626" : "#d97706"
                }}>
                  Confidence: {example.confidence}
                </div>
              </>
            ) : (
              <div style={{color: "#16a34a"}}>{example.message}</div>
            )}
          </div>
        </div>
      )}

      {/* Progress Dots */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "16px"
      }}>
        {examples.map((_, index) => (
          <div 
            key={index}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: currentExample === index ? "#3b82f6" : "#e5e7eb"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
