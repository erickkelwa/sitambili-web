import React from 'react';
import { ExternalLink, List } from 'lucide-react';

const LeagueTableCTA = () => {
    return (
        <section id="table" style={{
            padding: '4rem 0',
            backgroundColor: '#f4f4f9',
            textAlign: 'center'
        }}>
            <div className="container">
                <h2 style={{ color: 'var(--color-primary-blue)', marginBottom: '1.5rem', fontWeight: 800 }}>
                    Season Standings
                </h2>
                <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#555' }}>
                    Keep up with Sitambili FC's performance in the FKF Nairobi West Regional League. Check out the full league table and statistics.
                </p>

                <a
                    href="https://fkfnairobiwest.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--color-primary-blue)',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    <List size={20} />
                    View League Table
                    <ExternalLink size={16} />
                </a>
            </div>
        </section>
    );
};

export default LeagueTableCTA;
