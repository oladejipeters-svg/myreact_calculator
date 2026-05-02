import React from "react";

function Dashboard({
  display,
  handleNumberClick,
  handleOperation,
  handleEquals,
  clearCalculator,
  toggleSign,
  handlePercentage,
  handleScientificOp,
  handleParenthesis,
  showScientific,
  setShowScientific,
}) {
  const buttons = [
    {
      label: "AC",
      onClick: clearCalculator,
      className: "col-span-2 bg-red-600 hover:bg-red-700",
    },
    {
      label: "+/-",
      onClick: toggleSign,
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "%",
      onClick: handlePercentage,
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "÷",
      onClick: () => handleOperation("/"),
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "7",
      onClick: () => handleNumberClick("7"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "8",
      onClick: () => handleNumberClick("8"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "9",
      onClick: () => handleNumberClick("9"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "×",
      onClick: () => handleOperation("*"),
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "4",
      onClick: () => handleNumberClick("4"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "5",
      onClick: () => handleNumberClick("5"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "6",
      onClick: () => handleNumberClick("6"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "−",
      onClick: () => handleOperation("-"),
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "1",
      onClick: () => handleNumberClick("1"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "2",
      onClick: () => handleNumberClick("2"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "3",
      onClick: () => handleNumberClick("3"),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "+",
      onClick: () => handleOperation("+"),
      className: "bg-amber-700 hover:bg-amber-800",
    },
    {
      label: "0",
      onClick: () => handleNumberClick("0"),
      className: "col-span-2 bg-amber-600 hover:bg-amber-700",
    },
    {
      label: ".",
      onClick: () => handleNumberClick("."),
      className: "bg-amber-600 hover:bg-amber-700",
    },
    {
      label: "=",
      onClick: handleEquals,
      className: "bg-green-600 hover:bg-green-700",
    },
  ];

  const scientificButtons = [
    { label: "√", onClick: () => handleScientificOp("sqrt") },
    { label: "sin", onClick: () => handleScientificOp("sin") },
    { label: "cos", onClick: () => handleScientificOp("cos") },
    { label: "tan", onClick: () => handleScientificOp("tan") },
    { label: "log", onClick: () => handleScientificOp("log") },
    { label: "ln", onClick: () => handleScientificOp("ln") },
    { label: "( )", onClick: handleParenthesis },
    { label: "x^y", onClick: () => handleOperation("pow") },
  ];

  const formatDisplay = (value) => {
    if (value === "" || value === "Error") return value;

    // Check if it's a simple number (no operators)
    const match = value.match(/^(-?)(\d+)(\.\d*)?$/);
    if (match) {
      const [, sign, integerPart, decimalPart = ""] = match;
      const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${sign}${groupedInteger}${decimalPart}`;
    }

    // If it contains operators, format each number separately
    if (/[+\-×÷]/.test(value)) {
      return value.replace(/\d+\.?\d*/g, (num) => {
        const parts = num.match(/^(-?)(\d+)(\.\d*)?$/);
        if (parts) {
          const [, sign, integerPart, decimalPart = ""] = parts;
          const groupedInteger = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ",",
          );
          return `${sign}${groupedInteger}${decimalPart}`;
        }
        return num;
      });
    }

    return value;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-amber-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Calculator Container */}
        <div className="bg-linear-to-br from-amber-900 to-amber-800 rounded-2xl shadow-2xl p-8 border-4 border-yellow-600">
          {/* Display */}
          <div className="bg-linear-to-r from-amber-950 to-yellow-900 rounded-lg p-6 mb-6 shadow-inner border-2 border-yellow-700">
            <p className="calculator-display text-right font-bold text-yellow-300 wrap-break-word drop-shadow-lg font-mono">
              {formatDisplay(display)}
            </p>
          </div>

          {/* Scientific Toggle Button */}
          <div className="mb-4">
            <button
              onClick={() => setShowScientific(!showScientific)}
              className="w-full bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md text-base"
            >
              {showScientific ? "Hide Scientific" : "Show Scientific"}
            </button>
          </div>

          {/* Scientific Functions */}
          {showScientific && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6 bg-amber-800 p-4 rounded-lg border border-yellow-600">
              {scientificButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.onClick}
                  className="w-full bg-linear-to-b from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-amber-900 font-bold py-2 px-3 rounded transition-all transform hover:scale-105 shadow-md text-sm"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`${btn.className} text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-xl active:scale-95`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Info Footer */}
          <div className="mt-6 text-center text-yellow-100 text-sm">
            <p>
              💡 Use keyboard: Numbers, +, −, ×, ÷, Enter (=), Backspace
              (delete), Esc (clear)
            </p>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            ✨ Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-amber-800">
            <div>
              <h3 className="font-bold text-amber-900 mb-2">
                Basic Operations
              </h3>
              <p className="text-sm">
                Addition, Subtraction, Multiplication, Division
              </p>
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">
                Scientific Functions
              </h3>
              <p className="text-sm">
                Trigonometry (sin, cos, tan), Logarithms, Square Root
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
