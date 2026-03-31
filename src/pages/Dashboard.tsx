import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc'
      }}>
        <div style={{ fontSize: '18px', color: '#718096' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a202c'
          }}>BigCat</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/profile')}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                color: '#667eea',
                border: '1px solid #667eea',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              Profile
            </button>
            <button
              onClick={handleSignOut}
              style={{
                padding: '8px 16px',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '16px'
          }}>
            Welcome, {profile?.full_name || 'User'}!
          </h2>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '32px'
          }}>
            You're successfully logged into your BigCat dashboard. This is a protected route that only authenticated users can access.
          </p>

          <div style={{
            background: '#edf2f7',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '16px'
            }}>Account Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ color: '#718096', fontSize: '14px' }}>Email: </span>
                <span style={{ color: '#2d3748', fontSize: '14px', fontWeight: '600' }}>
                  {user?.email}
                </span>
              </div>
              <div>
                <span style={{ color: '#718096', fontSize: '14px' }}>Name: </span>
                <span style={{ color: '#2d3748', fontSize: '14px', fontWeight: '600' }}>
                  {profile?.full_name || 'Not set'}
                </span>
              </div>
              <div>
                <span style={{ color: '#718096', fontSize: '14px' }}>User ID: </span>
                <span style={{ color: '#2d3748', fontSize: '14px', fontWeight: '600', fontFamily: 'monospace' }}>
                  {user?.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
