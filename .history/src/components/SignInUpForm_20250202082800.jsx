import React, { useState } from 'react';
import styles from './SignInUpForm.module.css'; // CSS Module
import { auth } from '../firebaseConfig'; // Firebase bağlantısı
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const SignInUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // Qeydiyyat (Sign Up)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  // Giriş (Sign In)
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  // Şifrəni unutduqda reset e-poçt göndərmək
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
      {/* Sign Up Form */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label className={styles.rememberMe}>
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            Remember Me
          </label>
          <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className={styles.ghost} onClick={() => setIsSignUp(false)}>Sign In</button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className={styles.ghost} onClick={() => setIsSignUp(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUpForm;
