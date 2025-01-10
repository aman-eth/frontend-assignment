import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

jest.mock("../hooks/useFetchData", () => jest.fn());

describe("App", () => {
  it("displays loading state while fetching data", () => {
    require("../hooks/useFetchData").mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("displays error message when data fetching fails", async () => {
    require("../hooks/useFetchData").mockReturnValue({
      data: [],
      loading: false,
      error: { message: "Failed to fetch" },
    });

    render(<App />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error: Failed to fetch",
    );
  });

  it("displays table data when fetching is successful", async () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": "90%", "amt.pledged": "$500,000" },
      { "s.no": 2, "percentage.funded": "85%", "amt.pledged": "$400,000" },
    ];

    require("../hooks/useFetchData").mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("handles pagination", async () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": "90%", "amt.pledged": "$500,000" },
      { "s.no": 2, "percentage.funded": "85%", "amt.pledged": "$400,000" },
      { "s.no": 3, "percentage.funded": "70%", "amt.pledged": "$200,000" },
      { "s.no": 4, "percentage.funded": "65%", "amt.pledged": "$150,000" },
      { "s.no": 5, "percentage.funded": "80%", "amt.pledged": "$300,000" },
      { "s.no": 6, "percentage.funded": "75%", "amt.pledged": "$250,000" },
    ];

    require("../hooks/useFetchData").mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });
    expect(screen.getByText("90%")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("6")).toBeInTheDocument();
    });
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
