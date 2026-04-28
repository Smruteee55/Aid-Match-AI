import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, ClipboardList, Map, FileText, 
    User, LogOut, CheckCircle, Clock, MapPin, Activity, XCircle
} from 'lucide-react';

const VolunteerDashboard = () => {
    const [myTasks, setMyTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('Overview');
    const navigate = useNavigate();

    const fetchMyTasks = async () => {
        try {
            const res = await API.get('/needs/all');
            // We filter for tasks that are Assigned, In-Progress, or Resolved
            const filtered = res.data.filter(n => 
                n.status === 'assigned' || 
                n.status === 'in-progress' || 
                n.status === 'resolved'
            );
            setMyTasks(filtered);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchMyTasks(); }, []);

    // NEW: Handle accepting a task
    const handleAccept = async (id) => {
        try {
            await API.put(`/needs/accept/${id}`);
            fetchMyTasks();
            alert("Mission Accepted! The NGO has been notified that you are on it.");
        } catch (err) { console.error(err); }
    };

    const handleComplete = async (id) => {
        try {
            await API.put(`/needs/resolve/${id}`);
            fetchMyTasks();
            alert("Mission Accomplished! History updated.");
        } catch (err) { console.error(err); }
    };

    const Overview = () => (
        <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={darkCard}>
                    <p style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>GOOD AFTERNOON</p>
                    <h2 style={{ margin: '5px 0' }}>Demo Volunteer 👋</h2>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>2 skills · Trust High · Demo City</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={darkCard}><h3>2</h3><p style={subText}>Skills Verified</p></div>
                    <div style={darkCard}><h3>85</h3><p style={subText}>Trust Score</p></div>
                    <div style={darkCard}><h3>{myTasks.filter(t => t.status === 'resolved').length}</h3><p style={subText}>Tasks Done</p></div>
                    <div style={{...darkCard, border: '1px solid #10b981'}}><h3>Active</h3><p style={subText}>Status</p></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={actionBtn} onClick={() => setActiveTab('My Tasks')}><ClipboardList size={18}/> <strong>My Tasks</strong></div>
                    <div style={actionBtn} onClick={() => setActiveTab('Live Map')}><Map size={18}/> <strong>Explore Map</strong></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={darkCard}>
                    <p style={headerText}>PROFILE STRENGTH <span style={{ float: 'right', color: '#fbbf24' }}>60%</span></p>
                    <div style={progressBarContainer}><div style={{ ...progressBar, width: '60%' }}></div></div>
                    <ul style={checklistStyle}>
                        <li><CheckCircle size={14} color="#10b981" /> Name saved</li>
                        <li><CheckCircle size={14} color="#10b981" /> Skills added</li>
                        <li style={{ color: '#6b7280' }}><Clock size={14} /> Documentation</li>
                    </ul>
                </div>
                <div style={darkCard}>
                    <p style={headerText}>ACCOUNT DETAILS</p>
                    <div style={detailRow}><span>Status</span> <span style={{ color: '#10b981' }}>Active</span></div>
                    <div style={detailRow}><span>City</span> <span>Thane</span></div>
                    <div style={detailRow}><span>Role</span> <span>Volunteer</span></div>
                </div>
            </div>
        </div>
    );

    const MyTasks = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {myTasks.map(task => (
                <div key={task._id} style={{
                    ...taskCard, 
                    borderLeft: task.status === 'in-progress' ? '5px solid #fbbf24' : 
                               task.status === 'resolved' ? '5px solid #10b981' : '5px solid #38bdf8'
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h4 style={{ margin: 0 }}>{task.title || "Crisis Mission"}</h4>
                            <span style={getStatusBadge(task.status)}>{task.status.replace('-', ' ').toUpperCase()}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>{task.category} · {task.location}</p>
                        <p style={{ fontSize: '13px', marginTop: '10px', color: '#9ca3af' }}>{task.description}</p>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                        {task.status === 'assigned' ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={acceptBtn} onClick={() => handleAccept(task._id)}>
                                    <CheckCircle size={14}/> Accept
                                </button>
                                <button style={declineBtn}><XCircle size={14}/> Decline</button>
                            </div>
                        ) : task.status === 'in-progress' ? (
                            <button style={completeBtn} onClick={() => handleComplete(task._id)}>
                                <CheckCircle size={14}/> Mark Completed
                            </button>
                        ) : (
                            <span style={{ color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <CheckCircle size={16}/> RESOLVED
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ backgroundColor: '#060d0a', minHeight: '100vh', display: 'flex', color: '#f8fafc', fontFamily: 'sans-serif' }}>
            <nav style={sidebarStyle}>
                <div style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                    <div style={{ background: '#10b981', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Activity size={18} color="black"/></div>VolunteerBridge
                </div>
                <div style={navItem(activeTab === 'Overview')} onClick={() => setActiveTab('Overview')}><LayoutDashboard size={18}/> Overview</div>
                <div style={navItem(activeTab === 'My Tasks')} onClick={() => setActiveTab('My Tasks')}><ClipboardList size={18}/> My Tasks</div>
                <div style={navItem(activeTab === 'Live Map')} onClick={() => setActiveTab('Overview')}><Map size={18}/> Live Map</div>
                <div style={{ marginTop: 'auto', padding: '25px', borderTop: '1px solid #1a2e25' }} onClick={() => navigate('/')}>
                    <div style={{ cursor: 'pointer', color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}><LogOut size={18}/> Sign out</div>
                </div>
            </nav>
            <main style={{ flex: 1, padding: '30px' }}>
                <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0, color: '#6b7280' }}>{activeTab} Dashboard</h3>
                    <div style={{ background: '#0d1a14', padding: '5px 15px', borderRadius: '8px', fontSize: '12px' }}>Volunteer</div>
                </header>
                {activeTab === 'Overview' ? <Overview /> : <MyTasks />}
            </main>
        </div>
    );
};

// --- HELPER STYLES ---
const getStatusBadge = (status) => ({
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '4px',
    background: status === 'in-progress' ? '#fbbf2433' : status === 'resolved' ? '#10b98133' : '#38bdf833',
    color: status === 'in-progress' ? '#fbbf24' : status === 'resolved' ? '#10b981' : '#38bdf8',
    fontWeight: 'bold'
});

const sidebarStyle = { width: '250px', background: '#060d0a', borderRight: '1px solid #1a2e25', display: 'flex', flexDirection: 'column' };
const navItem = (isActive) => ({ padding: '15px 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: isActive ? '#10b981' : '#6b7280', transition: '0.2s' });
const darkCard = { background: '#0d1a14', padding: '25px', borderRadius: '16px', border: '1px solid #1a2e25' };
const taskCard = { display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#060d0a', border: '1px solid #1a2e25', borderRadius: '12px', alignItems: 'center' };
const acceptBtn = { background: '#10b981', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' };
const completeBtn = { ...acceptBtn, background: '#fbbf24' };
const declineBtn = { background: '#451a1a', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' };
const subText = { fontSize: '11px', color: '#6b7280', marginTop: '4px' };
const headerText = { fontSize: '11px', color: '#6b7280', marginBottom: '15px', fontWeight: 'bold' };
const detailRow = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', padding: '10px 0', borderBottom: '1px solid #1a2e25' };
const progressBarContainer = { width: '100%', height: '6px', background: '#060d0a', borderRadius: '10px', margin: '15px 0' };
const progressBar = { height: '100%', background: '#10b981', borderRadius: '10px' };
const checklistStyle = { listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' };
const actionBtn = { background: '#0d1a14', padding: '15px', borderRadius: '14px', border: '1px solid #1a2e25', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' };

export default VolunteerDashboard;