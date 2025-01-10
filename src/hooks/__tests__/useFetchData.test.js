import { render, screen, waitFor } from "@testing-library/react";
import useFetchData from "../useFetchData";

global.fetch = jest.fn();

describe("useFetchData", () => {
  it("should return loading, data, and error states correctly", async () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": "90%", "amt.pledged": "$500,000" },
    ];
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };

    fetch.mockResolvedValue(mockResponse);

    function TestComponent() {
      const { data, loading, error } = useFetchData(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json",
      );
      return (
        <>
          {loading && <div role="status">Loading...</div>}
          {error && <div role="alert">Error: {error.message}</div>}
          {data && <div>{data[0]?.["s.no"]}</div>}
        </>
      );
    }

    render(<TestComponent />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading...");

    await screen.findByText("1");
  });

  it("should handle error correctly", async () => {
    const errorMessage = "Failed to fetch data";
    fetch.mockRejectedValue(new Error(errorMessage));

    function TestComponent() {
      const { data, loading, error } = useFetchData(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json",
      );
      return (
        <>
          {loading && <div role="status">Loading...</div>}
          {error && <div role="alert">Error: {error.message}</div>}
          {data && <div>{data[0]?.["s.no"]}</div>}
        </>
      );
    }

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Error: Failed to fetch",
      ),
    );
  });
});
