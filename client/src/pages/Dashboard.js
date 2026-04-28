import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Terminal, Map, Star, 
    Activity, PlusCircle, Search, MapPin, 
    Clock, CheckCircle, Users, LogOut, FileText
} from 'lucide-react';

const Dashboard = () => {
    const [needs, setNeeds] = useState([]);
    const [activeTab, setActiveTab] = useState('Overview');
    const [formData, setFormData] = useState({ title: '', description: '', location: '' });
    const navigate = useNavigate();

    const fetchNeeds = async () => {
        try {
            const res = await API.get('/needs/all');
            setNeeds(res.data);
        } catch (err) { console.error("Fetch Error:", err); }
    };

    useEffect(() => { 
        fetchNeeds(); 
        // Optional: Polling every 10 seconds to catch real-time volunteer updates
        const interval = setInterval(fetchNeeds, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                title: formData.title || formData.location || "New Crisis Alert"
            };
            await API.post('/needs/add', payload);
            setFormData({ title: '', description: '', location: '' });
            fetchNeeds();
            alert("✅ AI Analysis Complete: Crisis Reported");
        } catch (err) { alert("Submission failed. Check server connection."); }
    };

    const handleResolve = async (id) => {
        if(window.confirm("Mark this crisis as fully resolved?")) {
            try {
                await API.put(`/needs/resolve/${id}`);
                fetchNeeds();
            } catch (err) { console.error(err); }
        }
    };

    const Overview = () => (
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={darkCard}>
                    <p style={{ color: '#818cf8', fontSize: '11px', fontWeight: 'bold' }}>GOOD AFTERNOON</p>
                    <h2 style={{ marginTop: '5px' }}>NGO Admin 👋</h2>
                    <p style={{ color: '#8b949e', fontSize: '14px' }}>Managing AidMatch Foundation · Thane Region</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={darkCard}><h4>AidMatch Foundation</h4><p style={subText}>Organization (registered NGO)</p></div>
                    <div style={darkCard}><h4>Thane City</h4><p style={subText}>Region (coverage area)</p></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={darkCard}><h3>{needs.filter(n => n.status !== 'resolved').length}</h3><p style={subText}>Open Issues</p></div>
                    <div style={darkCard}><h3>45</h3><p style={subText}>Volunteers Active</p></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={actionBtn} onClick={() => setActiveTab('Console')}><Terminal size={20} color="#818cf8" /><strong>Admin Console</strong></div>
                    <div style={actionBtn} onClick={() => setActiveTab('Live Map')}><Map size={20} color="#818cf8" /><strong>Live Map</strong></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={darkCard}>
                    <p style={headerText}>PROFILE STRENGTH <span style={{ float: 'right', color: '#f59e0b' }}>67%</span></p>
                    <div style={progressBarContainer}><div style={{ ...progressBar, width: '67%' }}></div></div>
                    <ul style={checklistStyle}>
                        <li><CheckCircle size={14} color="#10b981" /> NGO name set</li>
                        <li><CheckCircle size={14} color="#10b981" /> City configured</li>
                        <li style={{ color: '#64748b' }}><Clock size={14} /> Created issue</li>
                    </ul>
                </div>
                <div style={darkCard}>
                    <p style={headerText}>ACCOUNT DETAILS</p>
                    <div style={detailRow}><span>NGO</span> <span style={{ color: 'white' }}>AidMatch</span></div>
                    <div style={detailRow}><span>City</span> <span style={{ color: 'white' }}>Thane</span></div>
                    <div style={detailRow}><span>Role</span> <span style={{ color: '#10b981', fontWeight: 'bold' }}>NGO Admin</span></div>
                </div>
            </div>
        </div>
    );

    const Console = () => {
        const stats = { 
            total: needs.length, 
            open: needs.filter(n => n.status === 'pending').length, 
            progress: needs.filter(n => n.status === 'in-progress' || n.status === 'assigned').length, 
            resolved: needs.filter(n => n.status === 'resolved').length 
        };
        
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                    <div style={consoleStatCard}><p style={subText}>Total</p><h2>{stats.total}</h2></div>
                    <div style={{...consoleStatCard, background: 'rgba(129, 140, 248, 0.05)'}}><p style={{color:'#818cf8'}}>Open</p><h2>{stats.open}</h2></div>
                    <div style={consoleStatCard}><p style={{color:'#f59e0b'}}>Active Deployments</p><h2>{stats.progress}</h2></div>
                    <div style={consoleStatCard}><p style={{color:'#10b981'}}>Resolved</p><h2>{stats.resolved}</h2></div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                    <section style={darkCard}>
                        <h4 style={{ color: '#818cf8', marginTop: 0 }}><PlusCircle size={16}/> Report Crisis</h4>
                        <form onSubmit={handleSubmit}>
                            <input 
                                style={darkInput} 
                                placeholder="Location" 
                                value={formData.location} 
                                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                                required 
                            />
                            <textarea 
                                style={{...darkInput, height: '80px', resize: 'none'}} 
                                placeholder="Crisis Description (AI analyzes this)..." 
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                required 
                            />
                            <button type="submit" style={glowBtn}>Submit to AI</button>
                        </form>
                    </section>
                    
                    <section style={tableContainer}>
                        <table style={issueTable}>
                            <thead><tr><th style={thStyle}>ISSUE</th><th style={thStyle}>CATEGORY</th><th style={thStyle}>STATUS</th><th style={thStyle}>ACTIONS</th></tr></thead>
                            <tbody>
                                {needs.map(need => (
                                    <tr key={need._id}>
                                        <td style={tdStyle}><strong>{need.location}</strong></td>
                                        <td style={tdStyle}><span style={badgeStyle}>{need.category}</span></td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                color: need.status === 'resolved' ? '#10b981' : 
                                                       need.status === 'in-progress' ? '#fbbf24' : '#818cf8',
                                                fontWeight: 'bold',
                                                fontSize: '12px'
                                            }}>
                                                {need.status === 'in-progress' ? 'ACCEPTED BY VOL' : need.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{display:'flex', gap:'5px'}}>
                                                {need.status === 'pending' && (
                                                    <button onClick={() => navigate(`/match/${need._id}/${need.location}/${need.category}`)} style={matchBtnSmall}>
                                                        Assign
                                                    </button>
                                                )}
                                                {need.status !== 'resolved' && (
                                                    <button onClick={() => handleResolve(need._id)} style={resolveBtnSmall}>
                                                        Resolve
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: '#0b0e14', minHeight: '100vh', display: 'flex', color: '#f8fafc', fontFamily: 'sans-serif' }}>
            <nav style={sidebarStyle}>
                <div style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                    <div style={{ background: '#818cf8', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Activity size={18} color="white"/></div>AidMatch AI
                </div>
                <div style={navItem(activeTab === 'Overview')} onClick={() => setActiveTab('Overview')}><LayoutDashboard size={18}/> Overview</div>
                <div style={navItem(activeTab === 'Console')} onClick={() => setActiveTab('Console')}><Terminal size={18}/> Console</div>
                <div style={navItem(activeTab === 'Live Map')} onClick={() => setActiveTab('Overview')}><Map size={18}/> Live Map</div>
                <div style={{ marginTop: 'auto', padding: '25px', borderTop: '1px solid #30363d' }} onClick={() => navigate('/')}>
                    <div style={{ cursor: 'pointer', color: '#8b949e', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={18}/> Sign out</div>
                </div>
            </nav>
            <main style={{ flex: 1, padding: '30px' }}>
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0, color: '#8b949e' }}>{activeTab} Dashboard</h3>
                    <div style={{ background: '#161b22', padding: '5px 15px', borderRadius: '8px', fontSize: '12px' }}>NGO Admin</div>
                </header>
                {activeTab === 'Overview' ? <Overview /> : <Console />}
            </main>
        </div>
    );
};

// --- STYLES (Keep existing Midnight Indigo styles) ---
const sidebarStyle = { width: '250px', background: '#0b0e14', borderRight: '1px solid #30363d', display: 'flex', flexDirection: 'column' };
const navItem = (isActive) => ({ padding: '15px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', background: isActive ? 'rgba(129, 140, 248, 0.1)' : 'transparent', color: isActive ? '#818cf8' : '#8b949e', transition: '0.2s' });
const darkCard = { background: '#161b22', padding: '25px', borderRadius: '16px', border: '1px solid #30363d' };
const consoleStatCard = { background: '#161b22', padding: '20px', borderRadius: '12px', border: '1px solid #30363d' };
const darkInput = { width: '100%', background: '#0b0e14', border: '1px solid #30363d', padding: '12px', color: 'white', borderRadius: '10px', marginBottom: '10px', boxSizing: 'border-box' };
const glowBtn = { width: '100%', padding: '12px', background: '#818cf8', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' };
const tableContainer = { background: '#161b22', borderRadius: '16px', border: '1px solid #30363d', overflow: 'hidden' };
const issueTable = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { padding: '15px', fontSize: '11px', color: '#8b949e', borderBottom: '1px solid #30363d', textAlign: 'left' };
const tdStyle = { padding: '15px', fontSize: '13px', borderBottom: '1px solid #0b0e14' };
const matchBtnSmall = { background: '#818cf8', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', cursor: 'pointer' };
const resolveBtnSmall = { background: '#30363d', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', cursor: 'pointer' };
const subText = { fontSize: '11px', color: '#8b949e', marginTop: '4px' };
const headerText = { fontSize: '11px', color: '#8b949e', marginBottom: '15px', fontWeight: 'bold' };
const detailRow = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#8b949e', padding: '10px 0', borderBottom: '1px solid #30363d' };
const progressBarContainer = { width: '100%', height: '6px', background: '#0b0e14', borderRadius: '10px', margin: '15px 0' };
const progressBar = { height: '100%', background: '#818cf8', borderRadius: '10px' };
const checklistStyle = { listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' };
const actionBtn = { background: '#161b22', padding: '15px', borderRadius: '14px', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' };
const badgeStyle = { background: '#0b0e14', color: '#818cf8', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' };

export default Dashboard;