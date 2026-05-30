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
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${BG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      fontFamily: "'Jura', sans-serif",
    }}>

      {/* Gameplay label — top left */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '20px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '14px',
        fontFamily: "'Jura', sans-serif",
        letterSpacing: '2px',
      }}>
        Gameplay
      </div>

      {/* Profile + score — top right */}
      <Profile />

      {/* Title + Play button — center left */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '8%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: '4.5vw',
          fontWeight: 'normal',
          margin: 0,
          fontFamily: "'Jura', sans-serif",
        }}>
          7 Days to Survive
        </h1>

        <div
          onClick={() => navigate('/SelectRole')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span style={{ color: '#fff', fontSize: '16px' }}>▶</span>
          <span style={{
            color: '#fff',
            fontFamily: "'Jura', sans-serif",
            fontSize: '18px',
            letterSpacing: '1px',
          }}>
            Play Game
          </span>
        </div>
      </div>

      {/* Bottom left: achievements + leaderboard icons */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        {/* Ending Gallery — grid icon */}
        <button
          onClick={openGallery}
          title="Ending Gallery"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.85 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="white">
            <rect x="2" y="2" width="12" height="12" rx="1.5" />
            <rect x="18" y="2" width="12" height="12" rx="1.5" />
            <rect x="2" y="18" width="12" height="12" rx="1.5" />
            <rect x="18" y="18" width="12" height="12" rx="1.5" />
          </svg>
        </button>

        {/* Leaderboard — bar chart icon */}
        <button
          onClick={() => setShowLeaderboard(true)}
          title="Leaderboard"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.85 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
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
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}>
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
