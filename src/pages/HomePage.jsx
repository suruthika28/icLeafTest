import React from 'react';
import MainHeader1 from '../components/MainHeader1';

function Home() {
    return (
        <div>
            <MainHeader1 /> 
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', width: '80%', maxWidth: '400px' }}>
                    <h2 style={{ fontWeight: 'bold', color: '#C77E23' }}>
                        Welcome to Our Website
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Home;
