import React from 'react'
import styles from './Home.module.css';
import Card from '../../Components/shared/Card/Card';
import Button from '../../Components/shared/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };
    const navigate = useNavigate()
    const startRegister = () => {
        navigate('/authenticate')
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Codershouse!" icon="logo">
                <p className={styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    <Button text="Let's Go" onClick={startRegister}  />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Have an invite text?
                    </span>
                    
                    <Link style={signInLinkStyle} to="/login">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Home