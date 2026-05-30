import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // ปรับพอร์ตตาม Backend ของกลุ่มคุณ

export interface GameSession {
  id: string;
  role: string;
  day: number;
  supplies: number;
  safety: number;
  population: number;
  morale: number;
}

export const startNewGame = async (role: string): Promise<GameSession> => {
  const response = await axios.post(`${API_BASE_URL}/game/start`, { role });
  return response.data.session;
};