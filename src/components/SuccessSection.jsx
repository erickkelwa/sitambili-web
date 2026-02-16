import React from 'react';
import { Trophy, Star, Target, Users } from 'lucide-react';
const SuccessSection = () => {
    const milestones = [
        { year: '2015', title: 'Established', desc: 'Starting out with friendly matches in Kibera Lindi.' },
        { year: '2019', title: 'Interbase Debut', desc: 'Finished 7th in our first competitive season.' },
        { year: '2020', title: 'Rising Up', desc: 'Climbed to 2nd place in the Interbase League.' },
        { year: '2024', title: 'Champions', desc: 'Crowned champions of the FKF Nairobi West County League.' },
        { year: '2024', title: 'Promotion', desc: 'Promoted to the Regional League, marking a new chapter.' },
    ];

    return (
        <section id="success" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-blue)', marginBottom: '1rem' }}>
                        OUR JOURNEY
                    </h2>
                    <div style={{ height: '4px', width: '80px', backgroundColor: '#FFD700', margin: '0 auto' }}></div>
                </div>

                {/* Overview & Image Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
                    <div className="animate-fade-in">
                        <img
                            src="/sucsess.jpg"
                            alt="Sita Mbili FC Team Success"
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                        />
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary-blue)', marginBottom: '1.5rem', fontWeight: 700 }}>
                            More Than Just A Club
                        </h3>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                            Sita Mbili FC was established in 2015 with a mission to nurture football talent within the Kibera Lindi community.
                            Starting out with friendly matches and local tournaments, the club gradually built its foundation before entering competitive football through the Interbase League.
                        </p>

                        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-secondary-yellow)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-blue)' }}>
                                <Target size={20} /> Vision & Goals
                            </h4>
                            <p style={{ fontSize: '1rem', color: '#666', fontStyle: 'italic' }}>
                                "Committed to uplifting youth in Kibera by using football as a tool for empowerment, skill development, and social transformation. We strive to steer young people away from crime and drugs, offering a pathway to a better future."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Milestones Timeline */}
                <div style={{ marginBottom: '5rem' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--color-primary-blue)', marginBottom: '3rem' }}>Key Milestones</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {milestones.map((milestone, index) => (
                            <div key={index} style={{
                                backgroundColor: '#fff',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                borderTop: `4px solid ${index % 2 === 0 ? 'var(--color-primary-blue)' : 'var(--color-secondary-yellow)'}`
                            }}>
                                <h4 style={{ fontSize: '1.5rem', color: '#FFD700', fontWeight: 800, marginBottom: '0.5rem' }}>{milestone.year}</h4>
                                <h5 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#333' }}>{milestone.title}</h5>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>{milestone.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 82 Tournament Highlight (Preserved from previous request) */}
                <div style={{
                    backgroundColor: 'var(--color-primary-blue)',
                    color: '#fff',
                    borderRadius: '16px',
                    padding: '3rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Trophy size={48} color="#FFD700" />
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#FFD700' }}>CHAMPIONS OF 82</h3>
                        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 1.5rem', opacity: 0.9 }}>
                            One of our proudest moments was emerging as the winners of the <strong>82 Sport Tournament</strong>.
                            This victory stands as a testament to our skill, teamwork, and the unwavering spirit of our players.
                        </p>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            borderRadius: '50px',
                            color: '#FFD700',
                            fontWeight: 600
                        }}>
                            Historic Victory
                        </span>
                    </div>
                </div>

                {/* Inline CSS for responsive grid */}
                <style>{`
                    @media (max-width: 900px) {
                        #success .grid-cols-2 {
                            grid-template-columns: 1fr !important;
                        }
                        #success img {
                            margin-bottom: 2rem;
                        }
                    }
                `}</style>

            </div>
        </section>
    );
};

export default SuccessSection;
