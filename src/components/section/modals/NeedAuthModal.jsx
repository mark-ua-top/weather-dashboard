import React from 'react';
import './needAuthModal.css';

export const NeedAuthModal = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Need Sign In / Sign Up to see</h2>
            </div>
        </div>
    );
};