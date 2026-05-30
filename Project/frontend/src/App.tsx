import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BG from './assets/BG.png'
import Profile from './modules/EditandDeleteProfile/profile'
import Logout from './modules/LoginRegistration/logout'
import LeaderBoardPage from './modules/leaderboard/pages/LeaderBoardPage'
import EndingGalleryPage from './modules/endinggallery/pages/EndingGalleryPage'
import { getUnlockedEndings } from './modules/endinggallery/api/endinggalleryapi'

function App() {
  const navigate = useNavigate()
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [unlockedIds, setUnlockedIds] = useState<string[]>([])
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  const openGallery = async () => {
    if (currentUser.id) {
      try {
        const ids = await getUnlockedEndings(String(currentUser.id))
        setUnlockedIds(ids)
      } catch {
        setUnlockedIds([])
      }
    }
    setShowGallery(true)
  }

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center overflow-hidden font-jura"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Gameplay label — top left */}
      <div className="absolute top-4 left-5 text-white/60 text-sm font-jura tracking-[2px]">
        Gameplay
      </div>

      {/* Profile + score — top right */}
      <Profile />

      {/* Title + Play button — center left */}
      <div className="absolute top-1/2 left-[8%] -translate-y-1/2 flex flex-col gap-8">
        <h1 className="font-jura text-white text-[4.5vw] font-normal m-0">
          7 Days to Survive
        </h1>

        <div
          onClick={() => navigate('/SelectRole')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <span className="text-white text-base">▶</span>
          <span className="font-jura text-white text-lg tracking-[1px]">Play Game</span>
        </div>
      </div>

      {/* Bottom left: gallery + leaderboard icons */}
      <div className="absolute bottom-6 left-6 flex gap-5 items-center">
        <button
          onClick={openGallery}
          title="Ending Gallery"
          className="bg-transparent border-none cursor-pointer p-0 opacity-85 hover:opacity-100 transition-opacity"
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="white">
            <rect x="2" y="2" width="12" height="12" rx="1.5" />
            <rect x="18" y="2" width="12" height="12" rx="1.5" />
            <rect x="2" y="18" width="12" height="12" rx="1.5" />
            <rect x="18" y="18" width="12" height="12" rx="1.5" />
          </svg>
        </button>

        <button
          onClick={() => setShowLeaderboard(true)}
          title="Leaderboard"
          className="bg-transparent border-none cursor-pointer p-0 opacity-85 hover:opacity-100 transition-opacity"
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="white">
            <rect x="2" y="20" width="8" height="10" rx="1" />
            <rect x="12" y="12" width="8" height="18" rx="1" />
            <rect x="22" y="4" width="8" height="26" rx="1" />
          </svg>
        </button>
      </div>

      {/* Logout — bottom right */}
      <Logout />

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center z-100 bg-black/60">
          <LeaderBoardPage onClose={() => setShowLeaderboard(false)} />
        </div>
      )}

      {/* Ending Gallery modal */}
      {showGallery && (
        <EndingGalleryPage
          onClose={() => setShowGallery(false)}
          unlockedIds={unlockedIds}
          userId={currentUser.id ? String(currentUser.id) : undefined}
          onDelete={(id) => setUnlockedIds((prev) => prev.filter((x) => x !== id))}
        />
      )}
    </div>
  )
}

export default App
