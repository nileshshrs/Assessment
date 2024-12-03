import { render, screen, fireEvent } from "@testing-library/react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { act } from "react-dom/test-utils";

// Sample component to test localStorage behavior
const TestComponent = () => {
  const [state, setState] = useLocalStorageState("test-key", { count: 0 });
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>Increment</button>
    </div>
  );
};

describe("useLocalStorageState Hook", () => {
  // Mock localStorage before each test
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage = localStorageMock;
  });

  test("should store state in localStorage and retrieve it correctly", () => {
    render(<TestComponent />);

    const incrementButton = screen.getByText("Increment");

    // Simulate the button click to update state
    act(() => {
      fireEvent.click(incrementButton);
    });

    // Check if state is updated in the component
    expect(screen.getByText("1")).toBeInTheDocument();

    // Check if localStorage.setItem was called with the correct arguments
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "test-key",
      '{"count":1}'
    );

    // Optionally, mock the return value of localStorage.getItem
    localStorage.getItem.mockReturnValue('{"count":1}');
    expect(localStorage.getItem).toHaveBeenCalledWith("test-key");
  });
});
