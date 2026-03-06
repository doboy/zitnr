import React from "react";
import Layout from "../components/Layout";
import catalog from "../utils/catalog.json";
import { getStoreName } from "../utils/affiliate";

type Variant = (typeof catalog)[number];

interface QuizAnswers {
  frequency: string;
  skillLevel: string;
  improvement: string;
  quality: string;
  gameStyle: string;
  pain: string;
  budget: string;
  shape: string;
}

const QUESTIONS = [
  {
    key: "frequency" as const,
    title: "How often do you play?",
    icon: "calendar check",
    options: [
      {
        value: "casual",
        label: "Casually",
        description: "A few times a month or less",
        icon: "coffee",
      },
      {
        value: "regular",
        label: "Regularly",
        description: "1-3 times per week",
        icon: "sync",
      },
      {
        value: "competitive",
        label: "Frequently",
        description: "4+ times per week or in tournaments",
        icon: "fire",
      },
    ],
  },
  {
    key: "skillLevel" as const,
    title: "What is your skill level?",
    icon: "star",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "Still learning the rules and basic shots",
        icon: "star outline",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "Comfortable with all shots, working on strategy",
        icon: "hand peace",
      },
      {
        value: "advanced",
        label: "Advanced",
        description: "Strong all-around game, tournament-level play",
        icon: "trophy",
      },
    ],
  },
  {
    key: "improvement" as const,
    title: "What aspect of your game do you most want to improve?",
    icon: "chart line",
    options: [
      {
        value: "dinking",
        label: "Dinking",
        description: "Soft game, touch, and drop shots at the kitchen",
        icon: "hand point down",
      },
      {
        value: "driving",
        label: "Driving",
        description: "Powerful groundstrokes and deep shots",
        icon: "bolt",
      },
      {
        value: "fastHands",
        label: "Fast Hands",
        description: "Quick exchanges and volleys at the net",
        icon: "hand rock",
      },
    ],
  },
  {
    key: "quality" as const,
    title: "What paddle quality matters most to you?",
    icon: "sliders horizontal",
    options: [
      {
        value: "spin",
        label: "Spin",
        description: "Maximum spin generation on every shot",
        icon: "spinner",
      },
      {
        value: "power",
        label: "Power",
        description: "Pop and punch for aggressive play",
        icon: "bolt",
      },
      {
        value: "control",
        label: "Control",
        description: "Precision placement and soft touch",
        icon: "crosshairs",
      },
      {
        value: "allAround",
        label: "All-Around",
        description: "A balanced blend of everything",
        icon: "balance scale",
      },
    ],
  },
  {
    key: "gameStyle" as const,
    title: "Is your game more offensive or defensive?",
    icon: "shield alternate",
    options: [
      {
        value: "offensive",
        label: "Offensive",
        description: "I like to attack and put balls away",
        icon: "bolt",
      },
      {
        value: "defensive",
        label: "Defensive",
        description: "I prefer to reset, block, and outlast opponents",
        icon: "shield alternate",
      },
      {
        value: "balanced",
        label: "Balanced",
        description: "I adapt my style based on the situation",
        icon: "balance scale",
      },
    ],
  },
  {
    key: "pain" as const,
    title: "Do you experience any elbow or wrist pain?",
    icon: "heartbeat",
    options: [
      {
        value: "yes",
        label: "Yes",
        description: "I deal with discomfort during or after play",
        icon: "band aid",
      },
      {
        value: "no",
        label: "No",
        description: "No pain or discomfort",
        icon: "check circle",
      },
    ],
  },
  {
    key: "budget" as const,
    title: "What is your budget?",
    icon: "dollar sign",
    options: [
      {
        value: "$",
        label: "Great Value ($)",
        description: "Under $100 — best bang for your buck",
        icon: "tag",
      },
      {
        value: "$$",
        label: "Mid-Range ($$)",
        description: "$100–$200 — solid upgrade",
        icon: "credit card",
      },
      {
        value: "$$$",
        label: "Premium ($$$)",
        description: "$200+ — top-of-the-line performance",
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
        value: "widebody",
        label: "Widebody",
        description: "Larger sweet spot — more forgiveness",
        icon: "expand",
      },
      {
        value: "elongated",
        label: "Elongated",
        description: "More reach & power — extra leverage",
        icon: "arrows alternate vertical",
      },
      {
        value: "standard",
        label: "Balanced",
        description: "Balanced shape — versatile all-around",
        icon: "square outline",
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

  // Skill level
  if (answers.skillLevel === "beginner") {
    if (paddle.size === "16mm") score += 10;
    if (paddle.cost === "$") score += 5;
  } else if (answers.skillLevel === "advanced") {
    if (paddle.cost === "$$$") score += 5;
    if (paddle.size === "14mm") score += 5;
  } else {
    if (paddle.size === "16mm") score += 5;
  }

  // Frequency — frequent players benefit from premium paddles
  if (answers.frequency === "competitive") {
    if (paddle.cost === "$$$") score += 5;
  } else if (answers.frequency === "casual") {
    if (paddle.cost === "$") score += 5;
  }

  // Improvement area
  if (answers.improvement === "dinking") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      score += 12;
    if (paddle.size === "16mm") score += 5;
  } else if (answers.improvement === "driving") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      score += 12;
    if (paddle.size === "14mm") score += 5;
  } else if (answers.improvement === "fastHands") {
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("Vapor") ||
      paddle.name.includes("Agassi")
    )
      score += 12;
    // Widebody paddles help with fast hands
    if (matchesShape(paddle, "widebody")) score += 5;
  }

  // Paddle quality preference
  if (answers.quality === "spin") {
    if (
      paddle.brand === "CRBN" ||
      paddle.name.includes("Aero") ||
      paddle.name.includes("Alpha")
    )
      score += 15;
  } else if (answers.quality === "power") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      score += 15;
    if (paddle.size === "14mm") score += 5;
  } else if (answers.quality === "control") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      score += 15;
    if (paddle.size === "16mm") score += 5;
  } else {
    // all-around
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("All Court") ||
      paddle.name.includes("Fever") ||
      paddle.name.includes("Vapor")
    )
      score += 15;
  }

  // Game style
  if (answers.gameStyle === "offensive") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      score += 8;
    if (paddle.size === "14mm") score += 3;
  } else if (answers.gameStyle === "defensive") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      score += 8;
    if (paddle.size === "16mm") score += 3;
  } else {
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("Vapor") ||
      paddle.name.includes("Fever")
    )
      score += 8;
  }

  // Pain — thicker cores absorb more vibration
  if (answers.pain === "yes") {
    if (paddle.size === "16mm") score += 15;
    // Penalize thin cores for pain sufferers
    if (paddle.size === "14mm") score -= 10;
  }

  // Popularity bonus (normalized)
  score += Math.min(paddle.sales / 100, 10);

  return score;
}

function getRecommendations(answers: QuizAnswers): Variant[] {
  const paddles = getUniquePaddles();
  const scored = paddles.map((p) => ({
    paddle: p,
    score: scorePaddle(p, answers),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((s) => s.paddle);
}

function getRecommendationReason(
  paddle: Variant,
  answers: QuizAnswers
): string {
  const reasons: string[] = [];

  if (paddle.cost === answers.budget) {
    reasons.push("fits your budget");
  }

  if (matchesShape(paddle, answers.shape)) {
    const shapeLabel =
      answers.shape === "elongated"
        ? "elongated"
        : answers.shape === "widebody"
          ? "widebody"
          : "standard";
    reasons.push(`${shapeLabel} shape you prefer`);
  }

  if (answers.quality === "spin") {
    if (
      paddle.brand === "CRBN" ||
      paddle.name.includes("Aero") ||
      paddle.name.includes("Alpha")
    )
      reasons.push("excellent spin generation");
  } else if (answers.quality === "power") {
    if (
      paddle.name.includes("Power") ||
      paddle.name.includes("Hyperion") ||
      paddle.name.includes("Challenger")
    )
      reasons.push("great for power");
  } else if (answers.quality === "control") {
    if (
      paddle.name.includes("All Court") ||
      paddle.name.includes("Perseus") ||
      paddle.name.includes("Graf") ||
      paddle.name.includes("Square")
    )
      reasons.push("excellent control");
  } else {
    if (
      paddle.name.includes("Hybrid") ||
      paddle.name.includes("Vapor") ||
      paddle.name.includes("Fever") ||
      paddle.name.includes("All Court")
    )
      reasons.push("versatile all-around paddle");
  }

  if (answers.pain === "yes" && paddle.size === "16mm") {
    reasons.push("16mm core absorbs vibration — easier on joints");
  }

  if (answers.improvement === "dinking" && paddle.size === "16mm") {
    reasons.push("16mm core for soft touch");
  } else if (answers.improvement === "driving" && paddle.size === "14mm") {
    reasons.push("14mm core for explosive drives");
  } else if (
    answers.improvement === "fastHands" &&
    matchesShape(paddle, "widebody")
  ) {
    reasons.push("wide face for quick net exchanges");
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
  $: "$ - Great Value",
  $$: "$$ - Mid-range ($100-200)",
  $$$: "$$$ - Premium ($200+)",
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
    : (currentStep / QUESTIONS.length) * 100;

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
                className={`ui stackable ${question.options.length <= 3 ? "three" : "four"} cards`}
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
                          style={{
                            fontSize: "1.1em",
                            marginBottom: "0.5rem",
                          }}
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
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "-14px",
                              zIndex: 1,
                            }}
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
                        {getStoreName(paddle.link)}
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
