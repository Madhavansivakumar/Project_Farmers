import React, { useState, useEffect } from 'react';

const EditProfile = ({ profile, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        location: '',
        businessInfo: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                mobileNumber: profile.mobileNumber || '',
                location: profile.location || '',
                businessInfo: profile.businessInfo || '',
            });
        }
    }, [profile]);

    const { name, mobileNumber, location, businessInfo } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px' }}>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
            />
            <input
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={onChange}
                required
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
            />
            <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
            />
            {profile.role === 'Entrepreneur' && (
                <textarea
                    placeholder="Business Info"
                    name="businessInfo"
                    value={businessInfo}
                    onChange={onChange}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                />
            )}
            <button 
                type="submit" 
                style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
                Save
            </button>
        </form>
    );
};

export default EditProfile;
