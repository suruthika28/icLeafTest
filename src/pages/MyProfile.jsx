import { useState } from "react";
import React from "react";
import "../styles/styles.css";
import MainHeader from "../components/MainHeader";
import MainHeader1 from "../components/MainHeader1";
import { Button, Modal, ModalBody } from "react-bootstrap";
const MyProfile = () => {
    const userFirstName = localStorage.getItem("fName");
    const userLastName = localStorage.getItem("lName");
    const mobileNumber = localStorage.getItem('phone');
    const emailAddress = localStorage.getItem('email')

    const [acceptTerms, setAcceptTerms] = useState(true);
    const [deactivateAccount, setDeactivateAccount] = useState(false);
    const [allowPromotions, setAllowPromotions] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);
    };

    const handleDeactivateAccountChange = () => {
        setDeactivateAccount(!deactivateAccount);
    };

    const handleAllowPromotionsChange = () => {
        setAllowPromotions(!allowPromotions);
    };

    const handleEditProfileChange = () => {
        setEditProfile(!editProfile);
    };

    return (
        <div>
            <MainHeader1 />
            <MainHeader />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>My Profile</h2>
                    </div>
                    <div className="profile-details">
                        <div className="profile-row">
                            <div className="profile-column">
                                <label className="profile-label">First Name
                                    <span className="required-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userFirstName}
                                    onChange={() => { }}
                                    disabled
                                    className="profile-input-disabled"
                                />
                            </div>
                            <div className="profile-column">
                                <label className="profile-label">Last Name</label>
                                <span className="required-star">*</span>
                                <input
                                    type="text"
                                    value={userLastName}
                                    onChange={() => { }}
                                    disabled
                                    className="profile-input-disabled"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="profile-row">
                            <div className="profile-column">
                                <label className="profile-label">Mobile Number</label>
                                <span className="required-star">*</span>
                                <input
                                    type="text"
                                    value={mobileNumber}
                                    onChange={() => { }}
                                    disabled
                                    className="profile-input-disabled"
                                />
                            </div>
                            <div className="profile-column">
                                <label className="profile-label">Email Address:</label>
                                <span className="required-star">*</span>
                                <input
                                    type="text"
                                    value={emailAddress}
                                    onChange={() => { }}
                                    disabled
                                    className="profile-input-disabled"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="profile-details">
                        <div className="profile-row-label">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={handleAcceptTermsChange}
                            />
                            <label>
                                I have read and accept
                            </label>
                            &nbsp;
                            <label style={{ color: 'coral' }} onClick={openModal} >Click Here</label>
                        </div>
                        <div className="profile-row-label">
                            <input
                                type="checkbox"
                                checked={deactivateAccount}
                                onChange={handleDeactivateAccountChange}
                            />
                            <label>
                                I want to de-activate my account and remove my data
                            </label>
                        </div>
                        <div className="profile-row-label">
                            <input
                                type="checkbox"
                                checked={allowPromotions}
                                onChange={handleAllowPromotionsChange}
                            />
                            <label>
                                I allow you to process my data for any promotions
                            </label>
                        </div>
                        <div className="profile-row-label">
                            <input
                                type="checkbox"
                                checked={editProfile}
                                onChange={handleEditProfileChange}
                            />
                            <label>
                                I want to edit my profile
                            </label>
                        </div>
                    </div>
                    <div className="profile-update-button-container">
                        <button style={{
                            padding: '10px',
                            background: '#F95502',
                            color: 'white',
                            border: 'none',
                            marginTop: '19px',
                            borderRadius: 5
                        }}>Update Consent</button>
                    </div>
                    <Modal
                        size='md'
                        centered
                        show={modalIsOpen}
                        onHide={closeModal} // Use onHide to close the modal
                    >
                        <Modal.Header closeButton> {/* Add closeButton prop */}
                            <Modal.Title>Consent Policy</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            By clicking on this checkbox,
                            you accept the Terms and Conditions,
                            Privacy Policy and Refund Policy of the platform.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
