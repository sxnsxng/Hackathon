const API = "http://localhost:3000/api/endings";

export const unlockEnding = async (userId: string, endingId: string): Promise<void> => {
  const res = await fetch(`${API}/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, endingId }),
  });
  if (!res.ok) throw new Error("Failed to unlock ending");
};

export const getUnlockedEndings = async (userId: string): Promise<string[]> => {
  const res = await fetch(`${API}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch endings");
  return res.json();
};

export const deleteUnlockedEnding = async (userId: string, endingId: string): Promise<void> => {
  const res = await fetch(`${API}/unlock`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, endingId }),
  });
  if (!res.ok) throw new Error("Failed to delete ending");
};
