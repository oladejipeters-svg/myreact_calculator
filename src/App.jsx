import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  // ✅ Always return NUMBER (never string)
  const calculate = useCallback((prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return current === 0 ? NaN : prev / current;
      case "sqrt":
        return current < 0 ? NaN : Math.sqrt(current);
      case "sin":
        return Math.sin((current * Math.PI) / 180);
      case "cos":
        return Math.cos((current * Math.PI) / 180);
      case "tan":
        return Math.tan((current * Math.PI) / 180);
      case "log":
        return current <= 0 ? NaN : Math.log10(current);
      case "ln":
        return current <= 0 ? NaN : Math.log(current);
      case "pow":
        return prev !== null ? Math.pow(prev, current) : current;
      default:
        return current;
    }
  }, []);

  const isInvalid = (value) => !isFinite(value) || isNaN(value);

  // ✅ Number input
  const handleNumberClick = useCallback(
    (num) => {
      setDisplay((prevDisplay) => {
        if (prevDisplay === "Error") return String(num);

        if (newNumber) {
          setNewNumber(false);
          return String(num);
        }

        return prevDisplay === "0" ? String(num) : prevDisplay + num;
      });
    },
    [newNumber],
  );

  // ✅ Operation handler
  const handleOperation = useCallback(
    (op) => {
      setDisplay((prevDisplay) => {
        if (prevDisplay === "Error") return prevDisplay;

        const currentValue = parseFloat(prevDisplay);

        setPreviousValue((prev) => {
          if (prev === null) return currentValue;

          if (operation) {
            const result = calculate(prev, currentValue, operation);

            if (isInvalid(result)) {
              setDisplay("Error");
              return null;
            }

            setDisplay(String(result));
            return result;
          }

          return prev;
        });

        setOperation(op);
        setNewNumber(true);
        return prevDisplay;
      });
    },
    [operation, calculate],
  );

  // ✅ Equals
  const handleEquals = useCallback(() => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === "Error") return prevDisplay;

      if (operation && previousValue !== null) {
        const result = calculate(
          previousValue,
          parseFloat(prevDisplay),
          operation,
        );

        setPreviousValue(null);
        setOperation(null);
        setNewNumber(true);

        if (isInvalid(result)) return "Error";

        return String(result);
      }

      return prevDisplay;
    });
  }, [operation, previousValue, calculate]);

  // ✅ Clear
  const clearCalculator = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  }, []);

  // ✅ Toggle sign
  const toggleSign = useCallback(() => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      if (isNaN(value)) return "0";
      return String(value * -1);
    });
  }, []);

  // ✅ Percentage
  const handlePercentage = useCallback(() => {
    setDisplay((prevDisplay) => {
      const value = parseFloat(prevDisplay);
      if (isNaN(value)) return "0";
      return String(value / 100);
    });
  }, []);

  // ✅ Parenthesis support
  const handleParenthesis = useCallback(() => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === "Error" || prevDisplay === "0" || newNumber) {
        return "(";
      }

      const openCount = (prevDisplay.match(/\(/g) || []).length;
      const closeCount = (prevDisplay.match(/\)/g) || []).length;

      // If more opens than closes, or ends with operator, add open paren
      if (openCount > closeCount || /[+\-*/(]$/.test(prevDisplay)) {
        return prevDisplay + "(";
      }
      // Otherwise, add close paren
      return prevDisplay + ")";
    });
  }, [newNumber]);

  // ✅ Scientific operations
  const handleScientificOp = useCallback(
    (op) => {
      setDisplay((prevDisplay) => {
        if (prevDisplay === "Error") return prevDisplay;

        const value = parseFloat(prevDisplay);
        const result = calculate(null, value, op);

        setNewNumber(true);

        if (isInvalid(result)) return "Error";

        return String(result);
      });
    },
    [calculate],
  );

  // ✅ Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;

      if (key === ".") {
        setDisplay((prev) => {
          if (prev === "Error") return "0.";

          if (newNumber) {
            setNewNumber(false);
            return "0.";
          }

          return prev.includes(".") ? prev : prev + ".";
        });
      } else if (/[0-9]/.test(key)) {
        handleNumberClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperation(key);
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "Backspace") {
        setDisplay((prev) => {
          if (prev === "Error") return "0";
          return prev.length > 1 ? prev.slice(0, -1) : "0";
        });
      } else if (key === "Escape") {
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    handleNumberClick,
    handleOperation,
    handleEquals,
    clearCalculator,
    newNumber,
  ]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              display={display}
              handleNumberClick={handleNumberClick}
              handleOperation={handleOperation}
              handleEquals={handleEquals}
              clearCalculator={clearCalculator}
              toggleSign={toggleSign}
              handlePercentage={handlePercentage}
              handleScientificOp={handleScientificOp}
              handleParenthesis={handleParenthesis}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
