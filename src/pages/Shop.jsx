import React from 'react';
import { ShoppingBag, Star, ShieldCheck, Truck } from 'lucide-react';

const Shop = () => {
    const handleOrder = (productName) => {
        const phoneNumber = prompt(`You are ordering the ${productName}.\n\nPlease enter your phone number to receive payment instructions via M-Pesa:`);

        if (phoneNumber) {
            alert(`Thank you! Our team will contact you at ${phoneNumber} shortly to complete your order for the ${productName}.`);
        }
    };

    // Placeholder for jerseys to be provided later
    const products = [
        {
            id: 1,
            name: "Sita Mbili FC - Official Home Jersey 2024/25",
            price: "KES 1,500",
            category: "Jerseys",
            image: "/jersey1.jpg",
            tag: "Available Now"
        },
        {
            id: 2,
            name: "Sita Mbili FC - Official Away Jersey 2024/25",
            price: "KES 1,500",
            category: "Jerseys",
            image: "/jersey2.jpg",
            tag: "Available Now"
        }
    ];

    return (
        <div className="shop-page" style={{ padding: '4rem 0', minHeight: '80vh', backgroundColor: '#fdfdfd' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary-blue)', marginBottom: '1rem' }}>
                        FAN SHOP
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Wear your colors with pride. Support Sita Mbili FC by purchasing our official merchandise.
                    </p>
                    <div style={{ height: '4px', width: '80px', backgroundColor: 'var(--color-secondary-yellow)', margin: '1.5rem auto' }}></div>
                </div>

                {/* Features Banner */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem',
                    backgroundColor: '#fff',
                    padding: '2.5rem',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <ShieldCheck size={32} color="var(--color-primary-blue)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: 'var(--color-primary-blue)' }}>Official Gear</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>100% Authentic Merchandise</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Truck size={32} color="var(--color-primary-blue)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: 'var(--color-primary-blue)' }}>Local Delivery</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>Quick pickup & shipping</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Star size={32} color="var(--color-primary-blue)" style={{ marginBottom: '1rem' }} />
                        <h4 style={{ color: 'var(--color-primary-blue)' }}>Premium Quality</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>Built for the pitch & street</p>
                    </div>
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {products.map((product) => (
                        <div key={product.id} className="product-card" style={{
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            position: 'relative',
                            border: '1px solid #eee'
                        }}>
                            <div style={{ position: 'relative', overflow: 'hidden', height: '350px' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    className="product-img"
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'var(--color-secondary-yellow)',
                                    color: 'var(--color-primary-blue)',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '50px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {product.tag}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                                <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0', color: '#333' }}>{product.name}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-blue)' }}>{product.price}</span>
                                    <button
                                        onClick={() => handleOrder(product.name)}
                                        style={{
                                            backgroundColor: 'var(--color-primary-blue)',
                                            color: '#fff',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: 600,
                                            transition: 'all 0.3s ease'
                                        }} className="buy-btn">
                                        <ShoppingBag size={18} /> Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Text */}
                <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-primary-blue)', borderRadius: '20px', color: '#fff' }}>
                    <h2 style={{ color: 'var(--color-secondary-yellow)', marginBottom: '1rem' }}>Coming Very Soon!</h2>
                    <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        We are currently finalizing our 2024/25 kit designs. Sign up for our newsletter to be the first to know when the shop goes live!
                    </p>
                </div>
            </div>

            <style>{`
                .product-card:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }
                .product-card:hover .product-img {
                    transform: scale(1.1);
                }
                .buy-btn:hover {
                    background-color: var(--color-secondary-yellow) !important;
                    color: var(--color-primary-blue) !important;
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Shop;
