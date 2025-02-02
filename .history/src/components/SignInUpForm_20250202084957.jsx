import React, { useState } from 'react';
import styles from './SignInUpForm.module.css'; 
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const SignInUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!strongPasswordRegex.test(password)) {
      setError('Password must have at least 6 characters, including 1 uppercase, 1 lowercase, and 1 number.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      handleAuthError(error);
    }
  };

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
    } catch (error) {
      handleAuthError(error);
    }
  };


  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      handleAuthError(error);
    }
  };

  
  const handleAuthError = (error) => {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/weak-password': 'Your password is too weak.',
      'auth/invalid-email': 'Invalid email format.',
      :'Invalid email or password. Please try again.'
    };
    setError(errorMessages[error.code] || error.message);
  };

  return (
    <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

   
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
         <input type="checkbox" />    Remember Me 
          </label>
          <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

     
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
