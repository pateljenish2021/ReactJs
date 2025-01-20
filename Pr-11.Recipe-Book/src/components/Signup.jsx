import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, provider, storage, db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleimg from '../assets/images/google.png'
import imag from "../assets/images/login.png" 
import { Spinner } from 'reactstrap';

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fileUploadRef = useRef(null);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!emailIsValid(email)) {
        setLoading(false);
        toast.error('Invalid email format. Please provide a valid email.');
        return;
      }

      if (password.length < 6) {
        setLoading(false);
        toast.error('Password should be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setLoading(false);
        toast.error('Passwords do not match. Please confirm your password.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {}, (error) => {
          setLoading(false);
          toast.error(error.message);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });

          setLoading(false);
          toast.success('Account created');
          navigate('/login');
        });
      } else {
        await updateProfile(user, {
          displayName: username,
        });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email,
          photoURL: null,
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/invalid-email") {
        toast.error('Invalid email format. Please provide a valid email.');
      } else if (error.code === "auth/weak-password") {
        toast.error('Password should be at least 6 characters long.');
      } else if (error.code === "auth/email-already-in-use") {
        toast.error('The provided email is already registered. Please use a different email.');
      } else {
        toast.success('Account created');
        navigate('/login');
      }
    }
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const displayName = user.displayName || username;
      const photoURL = user.photoURL || null;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
        photoURL,
      });

      setLoading(false);
      toast.success('Account created');
      navigate('/home');
    } catch (error) {
      toast.success('Account created');
      navigate('/home');
    }
  };

  return (
    <>
      <section className="sect__bg">
        <Container>
          <Row>
            {loading ? (
              <Col lg='12' className="text-center">
                <Spinner color="primary" /> {/* Spinner during loading */}
              </Col>
            ) : (
              <Row>
                <Col className="dffdddf" lg='6'>
                  <img className="loginimg" src={imag} alt="" />
                </Col>

                <Col lg='6' className="m-auto text-center signup-form">
                  <h3 className="fw-bold fs-2 mb-4">Welcome!</h3>
                  <h6 className="mb-4">SignUp to continue</h6>

                  <Form className="auth__form" onSubmit={signup}>
                    <div className="auth__formo">
                      <button 
                        type="button" 
                        className="buy__button auth__btn google_btn" 
                        onClick={handleGoogleSignup}
                        disabled={loading} // Disable button while loading
                      >
                        <img src={googleimg} alt="" /> Sign Up with Google
                      </button>
                      <p className='OR'>OR</p>
                    </div>

                    <FormGroup className="form__group">
                      <input 
                        type="text" 
                        placeholder="Name" 
                        required 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        disabled={loading} // Disable fields while loading
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input 
                        type="email" 
                        placeholder="E-mail" 
                        required 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        disabled={loading}
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        disabled={loading}
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        disabled={loading}
                      />
                    </FormGroup>

                    <button 
                      type="submit" 
                      className="buy__button auth__btn"
                      disabled={loading} // Disable the button during loading
                    >
                      {loading ? <Spinner size="sm" color="light" /> : "Let's get started"}
                    </button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                  </Form>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Signup;
