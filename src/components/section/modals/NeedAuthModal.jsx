import React from 'react';
import './needAuthModal.css';

export const NeedAuthModal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="need-auth-modal" onClick={onClose}>
            <div className="need-auth-modal__container" onClick={e => e.stopPropagation()}>
                <button className="need-auth-modal__close-button" onClick={onClose}>×</button>

                <div className="need-auth-modal__content">
                    <h2 className="need-auth-modal__title">Please Sign In</h2>
                    <p className="need-auth-modal__text">
                        You need to be logged in to view this information and use this feature.
                    </p>
                </div>
            </div>
        </div>
    );
};