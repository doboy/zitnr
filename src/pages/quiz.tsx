import React from "react";
import Layout from "../components/Layout";
import catalog from "../utils/catalog.json";

type Variant = (typeof catalog)[number];

interface QuizAnswers {
  experience: string;
  playStyle: string;
  budget: string;
  shape: string;
}

const QUESTIONS = [
  {
    key: "experience" as const,
    title: "What's your experience level?",
    icon: "star",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "New to pickleball or just getting started",
        icon: "seedling",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "Play regularly and know the basics well",
        icon: "hand peace",
      },
      {
        value: "advanced",
        label: "Advanced",
        description: "Competitive player looking for an edge",
        icon: "trophy",
      },
    ],
  },
  {
    key: "playStyle" as const,
    title: "What's your play style?",
    icon: "bullseye",
    options: [
      {
        value: "power",
        label: "Power",
        description: "Aggressive drives, smashes, and speed-ups",
        icon: "bolt",
      },
      {
        value: "control",
        label: "Control",
        description: "Soft game, dinks, and precise placement",
        icon: "crosshairs",
      },
      {
        value: "allAround",
        label: "All-Around",
        description: "A balanced mix of power and finesse",
        icon: "balance scale",
      },
    ],
  },
  {
    key: "budget" as const,
    title: "What's your budget?",
    icon: "dollar sign",
    options: [
      {
        value: "$",
        label: "Great Value ($)",
        description: "Under $100 - best bang for your buck",
        icon: "tag",
      },
      {
        value: "$$",
        label: "Mid-Range ($$)",
        description: "$100 - $150 - solid upgrade",
        icon: "credit card",
      },
      {
        value: "$$$",
        label: "Premium ($$$)",
        description: "$150+ - top-of-the-line performance",
        icon: "gem",
      },
    ],
  },
  {
    key: "shape" as const,
    title: "What paddle shape do you prefer?",
    icon: "expand arrows alternate",
    options: [
      {
        value: "elongated",
        label: "Elongated",
        description: "More reach and leverage on drives",
        icon: "arrows alternate vertical",
      },
      {
        value: "standard",
        label: "Standard / Hybrid",
        description: "Balanced shape for versatility",
        icon: "square outline",
      },
      {
        value: "widebody",
        label: "Wide-Body",
        description: "Larger sweet spot and forgiveness",
        icon: "expand",
      },
    ],
  },
];

const SHAPE_KEYWORDS: Record<string, string[]> = {
  elongated: ["Elongated", "Long Handle", "Hurache-X", "Fever"],
  standard: [
    "Hybrid",
    "Challenger",
    "Hyperion",
    "Perseus",
    "Agassi",
    "Graf",
    "Metallic",
    "Vapor",
    "All Court",
    "Alpha",
  ],
  widebody: [
    "Square",
    "Pegasus",
    "Magnus",
    "Scorpeus",
    "Double Vision",
    "Heat Vision",
  ],
};

function getUniquePaddles(): Variant[] {
  const paddles = catalog.filter((item) => item.category === "paddle");
  const seen = new Set<string>();
  const unique: Variant[] = [];
  for (const p of paddles) {
    if (!seen.has(p.name)) {
      seen.add(p.name);
      unique.push(p);
    }
  }
  return unique;
}

function matchesShape(paddle: Variant, shape: string): boolean {
  const keywords = SHAPE_KEYWORDS[shape] || [];
  return keywords.some((kw) => paddle.name.includes(kw));
}

function scorePaddle(paddle: Variant, answers: QuizAnswers): number {
  let score = 0;

  // Budget match (strongest signal)
  if (paddle.cost === answers.budget) {
    score += 40;
  } else {
    // Adjacent budget gets partial credit
    const costs = ["$", "$$", "$$$"];
    const diff = Math.abs(
      costs.indexOf(paddle.cost) - costs.indexOf(answers.budget)
    );
    if (diff === 1) score += 10;
  }

  // Shape match
  if (matchesShape(paddle, answers.shape)) {
    score += 30;
  }

  // Experience + play style considerations
  if (answers.experience === "beginner") {
    // Beginners benefit from wider paddles and 16mm (more forgiving)
    if (paddle.size === "16mm") score += 10;
    if (paddle.cost === "$") score += 5;
  } else if (answers.experience === "advanced") {
    // Advanced players may want thinner cores for feel
    if (paddle.size === "14mm" && answers.playStyle === "power") score += 10;
    if (paddle.size === "16mm" && answers.playStyle === "control") score += 10;
    if (paddle.cost === "$$$") score += 5;
  } else {
    // Intermediate - 16mm is versatile
    if (paddle.size === "16mm") score += 5;
  }

  if (answers.playStyle === "power") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      score += 15;
    if (paddle.name.includes("Elongated") || paddle.name.includes("Long Handle"))
      score += 5;
  } else if (answers.playStyle === "control") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      score += 15;
    if (paddle.size === "16mm") score += 5;
  } else {
    // All-around
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("All Court") ||
      paddle.name.includes("Fever") ||
      paddle.name.includes("Vapor")
    )
      score += 15;
  }

  // Popularity bonus (normalized)
  score += Math.min(paddle.sales / 100, 10);

  return score;
}

function getRecommendations(answers: QuizAnswers): Variant[] {
  const paddles = getUniquePaddles();
  const scored = paddles.map((p) => ({ paddle: p, score: scorePaddle(p, answers) }));
  scored.sort((a, b) => b.score - a.score);

  // Return top 3 unique recommendations
  return scored.slice(0, 3).map((s) => s.paddle);
}

function getRecommendationReason(paddle: Variant, answers: QuizAnswers): string {
  const reasons: string[] = [];

  if (paddle.cost === answers.budget) {
    reasons.push("fits your budget");
  }

  if (matchesShape(paddle, answers.shape)) {
    const shapeLabel =
      answers.shape === "elongated"
        ? "elongated"
        : answers.shape === "widebody"
          ? "wide-body"
          : "standard";
    reasons.push(`${shapeLabel} shape`);
  }

  if (answers.playStyle === "power") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      reasons.push("great for power players");
  } else if (answers.playStyle === "control") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      reasons.push("excellent for control");
  } else {
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("All Court") ||
      paddle.name.includes("Fever") ||
      paddle.name.includes("Vapor")
    )
      reasons.push("versatile all-around paddle");
  }

  if (answers.experience === "beginner" && paddle.size === "16mm") {
    reasons.push("forgiving 16mm core");
  } else if (
    answers.experience === "advanced" &&
    paddle.size === "14mm" &&
    answers.playStyle === "power"
  ) {
    reasons.push("responsive 14mm core for advanced power");
  }

  if (paddle.sales > 400) {
    reasons.push("highly popular");
  }

  if (reasons.length === 0) {
    reasons.push("strong overall match for your profile");
  }

  return reasons.slice(0, 3).join(", ");
}

const COST_LABELS: Record<string, string> = {
  "$": "$ - Great Value",
  "$$": "$$ - Mid-range",
  "$$$": "$$$ - Premium",
};

const QuizPage = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partial<QuizAnswers>>({});
  const [showResults, setShowResults] = React.useState(false);

  const handleAnswer = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const recommendations = showResults
    ? getRecommendations(answers as QuizAnswers)
    : [];

  const question = QUESTIONS[currentStep];
  const progress = showResults
    ? 100
    : ((currentStep) / QUESTIONS.length) * 100;

  return (
    <Layout
      title="Paddle Quiz - Find Your Perfect Paddle"
      description="Take our quiz to find the perfect pickleball paddle for your play style"
      selectedMenuItem="quiz"
      canonicalUrl="https://www.zitnr.com/quiz"
    >
      <div className="ui container">
        <h5
          className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="question circle icon"></i>
          <div className="content">
            Paddle Quiz
            <div className="sub header">
              Find the perfect paddle for your game
            </div>
          </div>
        </h5>

        {/* Progress bar */}
        <div
          className="ui indicating progress"
          style={{ marginBottom: "1.5rem" }}
        >
          <div
            className="bar"
            style={{
              width: `${progress}%`,
              backgroundColor: showResults ? "#21ba45" : "#2185d0",
              transition: "width 0.3s ease",
              minHeight: "4px",
            }}
          />
        </div>

        {!showResults ? (
          <div>
            {/* Question */}
            <div className="ui segment" style={{ textAlign: "center" }}>
              <h3 className="ui header">
                <i className={`${question.icon} icon`}></i>
                {question.title}
              </h3>

              <div
                className="ui stackable three cards"
                style={{ marginTop: "1.5rem" }}
              >
                {question.options.map((option) => {
                  const isSelected =
                    answers[question.key as keyof QuizAnswers] === option.value;
                  return (
                    <div
                      key={option.value}
                      className={`ui card ${isSelected ? "raised" : ""}`}
                      onClick={() => handleAnswer(question.key, option.value)}
                      style={{
                        cursor: "pointer",
                        border: isSelected
                          ? "2px solid #2185d0"
                          : "1px solid #e0e0e0",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div className="content" style={{ textAlign: "center" }}>
                        <i
                          className={`big ${option.icon} icon`}
                          style={{
                            color: isSelected ? "#2185d0" : "#888",
                            marginBottom: "0.5rem",
                            display: "block",
                          }}
                        ></i>
                        <div
                          className="header"
                          style={{ fontSize: "1.1em", marginBottom: "0.5rem" }}
                        >
                          {option.label}
                        </div>
                        <div className="description" style={{ color: "#666" }}>
                          {option.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <button
                  className="ui basic button"
                  onClick={handleBack}
                  style={{ marginTop: "1.5rem" }}
                >
                  <i className="arrow left icon"></i> Back
                </button>
              )}
            </div>

            {/* Step indicator */}
            <div
              style={{
                textAlign: "center",
                color: "#999",
                marginTop: "0.5rem",
              }}
            >
              Question {currentStep + 1} of {QUESTIONS.length}
            </div>
          </div>
        ) : (
          <div>
            {/* Results */}
            <div className="ui segment" style={{ textAlign: "center" }}>
              <h3 className="ui green header">
                <i className="check circle icon"></i>
                Your Paddle Recommendations
              </h3>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>
                Based on your answers, here are our top picks for you
              </p>

              <div className="ui three stackable cards">
                {recommendations.map((paddle, index) => {
                  const allVariants = catalog.filter(
                    (v) => v.name === paddle.name
                  );
                  const reason = getRecommendationReason(
                    paddle,
                    answers as QuizAnswers
                  );

                  return (
                    <div key={paddle.name} className="ui card">
                      <div style={{ position: "relative" }}>
                        {index === 0 && (
                          <div
                            className="ui green ribbon label"
                            style={{ position: "absolute", top: "12px", left: "-14px", zIndex: 1 }}
                          >
                            Best Match
                          </div>
                        )}
                        <a
                          href={paddle.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={paddle.image}
                            alt={paddle.name}
                            style={{
                              objectFit: "contain",
                              height: "220px",
                              width: "100%",
                              padding: "1rem",
                              backgroundColor: "#fff",
                            }}
                          />
                        </a>
                      </div>
                      <div className="content">
                        <a
                          className="header"
                          href={paddle.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "1em" }}
                        >
                          {paddle.name}
                        </a>
                        <div className="meta" style={{ marginTop: "0.25rem" }}>
                          {paddle.brand}
                          {paddle.size ? ` - ${paddle.size}` : ""}
                        </div>
                        <div
                          className="description"
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.9em",
                            color: "#555",
                            textTransform: "capitalize",
                          }}
                        >
                          {reason}
                        </div>
                        {allVariants.length > 1 && (
                          <div
                            style={{
                              marginTop: "0.5rem",
                              fontSize: "0.85em",
                              color: "#888",
                            }}
                          >
                            Available in {allVariants.length} variants
                          </div>
                        )}
                      </div>
                      <div className="extra content">
                        <span style={{ fontWeight: "bold", color: "#1b1c1d" }}>
                          {COST_LABELS[paddle.cost] || paddle.cost}
                        </span>
                      </div>
                      <a
                        className="ui bottom attached button"
                        href={paddle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {paddle.link.includes("https://11six24.com")
                          ? "View on 11six24"
                          : paddle.link.includes("https://joola.com")
                            ? "View on JOOLA"
                            : "View on Amazon"}
                        <i
                          className="external alternate icon"
                          style={{ marginLeft: "0.5em" }}
                        ></i>
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="ui divider" style={{ margin: "2rem 0" }}></div>

              <div>
                <button
                  className="ui primary button"
                  onClick={handleRestart}
                  style={{ marginRight: "0.5rem" }}
                >
                  <i className="redo icon"></i> Retake Quiz
                </button>
                <a className="ui basic button" href="/shop">
                  <i className="shop icon"></i> Browse All Paddles
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;
