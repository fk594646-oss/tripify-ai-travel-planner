import React, { useState, useEffect } from 'react';
import { Plane, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DEMO, AUTH_API } from '../config.js';

const AuthPages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Update isLogin based on route change
  useEffect(() => {
    setIsLogin(location.pathname === '/login');
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({});
    setSuccess("");
  }, [location.pathname]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async () => {
    setErrors({});
    setSuccess("");

    // Validation
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., user@example.com)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin) {
      const passwordCheck = validatePassword(formData.password);
      if (!passwordCheck.isValid) {
        newErrors.password = "password_weak";
        newErrors.passwordDetails = passwordCheck;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (DEMO) {
      setErrors({ general: "Accounts are disabled in this online demo (no backend). See the GitHub repo to run the full app." });
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${AUTH_API}/api/auth/login`
        : `${AUTH_API}/api/auth/signup`;

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            username: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        // Store username for profile display
        if (data.username || formData.name) {
          localStorage.setItem("username", data.username || formData.name);
        }
        setSuccess(isLogin ? "Login successful! Redirecting..." : "Signup successful! Redirecting to login...");
        
        setTimeout(() => {
          if (isLogin) {
            navigate('/home');
            window.location.reload(); // Refresh to update header
          } else {
            navigate('/login');
          }
        }, 1500);
      }

    } catch (err) {
      if (isLogin && err.response?.status === 401) {
        setErrors({ password: "Incorrect password. Please try again." });
      } else {
        setErrors({ 
          general: err.response?.data?.message || (isLogin ? "Login failed" : "Signup failed")
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-900/60 to-teal-900/70"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20" style={{ height: '500px' }}>
            
            <div className="relative flex h-full">
              <div 
                className={`absolute top-0 w-[55%] h-full bg-gradient-to-br from-emerald-600/90 via-teal-700/90 to-emerald-800/90 backdrop-blur-sm flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isLogin ? 'left-0' : 'left-[45%]'
                }`}
                style={{
                  clipPath: isLogin 
                    ? 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' 
                    : 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/30 rounded-full"></div>
                
                <div className="relative z-10 text-center px-16 max-w-lg">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-white/30">
                      <Plane className="w-8 h-8 text-white transform -rotate-45" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Tripyfy</h1>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-white mb-3">WELCOME</h2>
                  <h3 className="text-lg text-white/95 font-semibold mb-4">
                    Plan Your Perfect<br />Journey
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed font-medium">
                    Discover the world with AI-powered<br />
                    travel planning. Create personalized<br />
                    itineraries and make every trip<br />
                    unforgettable.
                  </p>
                </div>
              </div>

              <div 
                className={`absolute top-0 w-[55%] h-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isLogin ? 'right-0' : 'right-[45%]'
                }`}
                style={{
                  clipPath: isLogin 
                    ? 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' 
                    : 'polygon(0 0, 100% 0, 90% 100%, 0 100%)'
                }}
              >
                <div className="w-full max-w-sm px-6 py-4">
                  <div className="mb-5 text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                      {isLogin ? 'Login' : 'Sign up'}
                    </h3>
                    <p className="text-gray-600 text-xs font-medium">
                      {isLogin 
                        ? 'Access your travel dashboard and continue planning'
                        : 'Create your account to start planning amazing trips'
                      }
                    </p>
                  </div>

                  {errors.general && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
                      {errors.general}
                    </div>
                  )}

                  {success && (
                    <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg text-green-600 text-xs">
                      {success}
                    </div>
                  )}

                  <div className="space-y-3">
                    {!isLogin && (
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          errors.name ? 'text-red-500' : 'text-emerald-500'
                        }`} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Username"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white/80 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 ${
                            errors.name 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/50'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                        )}
                      </div>
                    )}

                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        errors.email ? 'text-red-500' : 'text-emerald-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white/80 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                            : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/50'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          errors.password ? 'text-red-500' : 'text-emerald-500'
                        }`} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-9 pr-10 py-2.5 text-sm bg-white/80 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 ${
                            errors.password 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                              : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/50'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.password === "password_weak" 
                            ? "Password must have 8+ chars, uppercase, lowercase, number & special char"
                            : errors.password
                          }
                        </p>
                      )}
                    </div>

                    {isLogin && (
                      <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="w-3.5 h-3.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                          <span className="text-gray-600">Remember me</span>
                        </label>
                        <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">
                          Forgot Password?
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign up')}
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <button type="button" className="w-full py-2.5 border-2 border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300 flex items-center justify-center space-x-3">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-700 font-semibold text-sm">{isLogin ? 'Login' : 'Sign up'} with Google</span>
                    </button>
                  </div>

                  <p className="mt-4 text-center text-gray-600 text-xs">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => navigate(isLogin ? '/signup' : '/login')}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;