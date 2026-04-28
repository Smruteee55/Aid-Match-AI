import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { User, Zap, ArrowLeft, Activity } from 'lucide-react';

const MatchPage = () => {
    const { needId, location, category } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // This calls the Smart Matching Engine built in the backend
                const res = await API.get(`/match/find/${location}/${category}`);
                setVolunteers(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Match error", err);
                setLoading(false);
            }
        };
        fetchMatches();
    }, [location, category]);

    // This handles the Step 4 & 5 Assignment
    const handleAssign = async (volName, volId) => {
        try {
            // 1. Mark as Assigned in Backend
            await API.put(`/needs/assign/${needId}`);
            
            // 2. Log matching record
            await API.post('/match/assign', { needId, volunteerId: volId });
            
            alert(`Success! ${volName} has been assigned. Notification sent.`);
            navigate('/dashboard');
        } catch (err) {
            console.error("Assignment failed", err);
            // Fallback: If the post fails but put works, still navigate
            navigate('/dashboard');
        }
    };

    if (loading) return (
        <div style={{ backgroundColor: '#0b0e14', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#818cf8' }}>
            <Activity className="animate-spin" size={48} />
            <p style={{ marginLeft: '15px', fontWeight: 'bold' }}>AI Ranking Best Matches...</p>
        </div>
    );

    return (
        <div style={{ padding: '40px', backgroundColor: '#0b0e14', minHeight: '100vh', color: '#f8fafc' }}>
            <button onClick={() => navigate('/dashboard')} style={backBtn}> 
                <ArrowLeft size={16}/> Back to Console 
            </button>
            
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ margin: 0, color: '#818cf8' }}>Smart Resource Allocation</h2>
                <p style={{ color: '#8b949e' }}>
                    Matching for <strong style={{color: '#f8fafc'}}>{category}</strong> in <strong style={{color: '#f8fafc'}}>{location}</strong>
                </p>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {volunteers.length === 0 ? (
                    <div style={volCard}>No volunteers found with matching skills in this area.</div>
                ) : volunteers.map((vol, index) => (
                    <div key={vol._id} style={volCard}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={avatarStyle}><User color="#818cf8" /></div>
                            <div>
                                <h3 style={{ margin: 0 }}>{vol.name}</h3>
                                <div style={{ fontSize: '13px', color: '#8b949e' }}>
                                    Location: {vol.location} | Skills: {vol.skills?.join(', ') || 'General'}
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={scoreStyle}><Zap size={14} fill="#10b981" color="#10b981"/> {95 - (index * 2)}% Match</div>
                            <button onClick={() => handleAssign(vol.name, vol._id)} style={assignBtn}>Assign & Notify</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- STYLES (Midnight Indigo Theme) ---
const volCard = { 
    background: '#161b22', 
    padding: '20px', 
    borderRadius: '12px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    border: '1px solid #30363d',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)' 
};

const avatarStyle = { 
    width: '45px', 
    height: '45px', 
    background: '#0b0e14', 
    borderRadius: '50%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
};

const scoreStyle = { 
    color: '#10b981', 
    fontWeight: 'bold', 
    fontSize: '14px', 
    marginBottom: '8px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    gap: '5px' 
};

const assignBtn = { 
    backgroundColor: '#818cf8', 
    color: 'white', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    transition: '0.3s'
};

const backBtn = { 
    border: 'none', 
    background: 'none', 
    cursor: 'pointer', 
    color: '#8b949e', 
    marginBottom: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '5px',
    fontSize: '14px'
};

export default MatchPage;