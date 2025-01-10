import { renderHook, act } from "@testing-library/react";
import usePagination from "../usePagination";

describe("usePagination", () => {
  const mockData = [
    { "s.no": 1, "percentage.funded": "90%", "amt.pledged": "$500,000" },
    { "s.no": 2, "percentage.funded": "85%", "amt.pledged": "$400,000" },
    { "s.no": 3, "percentage.funded": "70%", "amt.pledged": "$200,000" },
    { "s.no": 4, "percentage.funded": "65%", "amt.pledged": "$150,000" },
    { "s.no": 5, "percentage.funded": "80%", "amt.pledged": "$300,000" },
    { "s.no": 6, "percentage.funded": "75%", "amt.pledged": "$250,000" },
  ];

  it("should paginate the data correctly", () => {
    const { result } = renderHook(() => usePagination(mockData, 5));

    expect(result.current.currentData).toEqual([
      { "s.no": 1, "percentage.funded": "90%", "amt.pledged": "$500,000" },
      { "s.no": 2, "percentage.funded": "85%", "amt.pledged": "$400,000" },
      { "s.no": 3, "percentage.funded": "70%", "amt.pledged": "$200,000" },
      { "s.no": 4, "percentage.funded": "65%", "amt.pledged": "$150,000" },
      { "s.no": 5, "percentage.funded": "80%", "amt.pledged": "$300,000" },
    ]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual([
      { "s.no": 6, "percentage.funded": "75%", "amt.pledged": "$250,000" },
    ]);
  });
});
