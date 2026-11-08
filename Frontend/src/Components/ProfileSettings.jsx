import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Save, Eye, EyeOff, Edit2, X, Check, Shield, Bell, Trash2 } from 'lucide-react';
import Header from '../Components/Header';

const ProfileSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load user data from localStorage
  useEffect(() => {
    const username = localStorage.getItem('username') || 'User';
    const email = localStorage.getItem('email') || '';
    const savedImage = localStorage.getItem('profileImage');
    
    setFormData(prev => ({ 
      ...prev, 
      username,
      email 
    }));
    
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setMessage({ type: "error", text: "Image size should be less than 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        localStorage.setItem('profileImage', imageData);
        setMessage({ type: "success", text: "Profile picture updated successfully!" });
        
        // Update header by reloading
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSaveProfile = async () => {
    if (!formData.username.trim()) {
      setMessage({ type: "error", text: "Username cannot be empty" });
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      setTimeout(() => {
        // Save to localStorage permanently
        localStorage.setItem('username', formData.username);
        if (formData.email) {
          localStorage.setItem('email', formData.email);
        }
        
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        setLoading(false);
        
        // Don't reload, just update the state
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      }, 800);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.oldPassword || !formData.newPassword) {
      setMessage({ type: "error", text: "Please fill in both password fields" });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters" });
      return;
    }

    const passwordCheck = {
      hasUpperCase: /[A-Z]/.test(formData.newPassword),
      hasLowerCase: /[a-z]/.test(formData.newPassword),
      hasNumber: /[0-9]/.test(formData.newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
    };

    if (!passwordCheck.hasUpperCase || !passwordCheck.hasLowerCase || !passwordCheck.hasNumber || !passwordCheck.hasSpecialChar) {
      setMessage({ type: "error", text: "Password must contain uppercase, lowercase, number, and special character" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      setTimeout(() => {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setFormData({ ...formData, oldPassword: "", newPassword: "" });
        setLoading(false);
        
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      }, 800);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" });
      setLoading(false);
    }
  };

  const getInitial = () => {
    if (formData.username && formData.username.length > 0) {
      return formData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold 
bg-gradient-to-r from-emerald-600 to-teal-600 
bg-clip-text text-transparent 
leading-tight -mt-2">
  Settings
</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl backdrop-blur-md border animate-slideDown shadow-lg ${
            message.type === "success" 
              ? "bg-green-50/90 border-green-300 text-green-800"
              : "bg-red-50/90 border-red-300 text-red-800"
          }`}>
            <div className="flex items-center">
              {message.type === "success" ? (
                <Check className="w-5 h-5 mr-3 text-green-600" />
              ) : (
                <X className="w-5 h-5 mr-3 text-red-600" />
              )}
              <span className="font-medium flex-1">{message.text}</span>
              <button 
                onClick={() => setMessage({ type: "", text: "" })}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden sticky top-24">
              
              {/* Profile Preview */}
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-b border-emerald-200/30">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-xl transition-transform group-hover:scale-105">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-4xl font-bold">{getInitial()}</span>
                      )}
                    </div>
                    
                    <label className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-gray-800">{formData.username}</h3>
                  <p className="text-xs text-gray-500 mt-1">{formData.email || 'No email set'}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Account Status */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {/* Account Information Card */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-5 border-b border-emerald-200/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                          <p className="text-sm text-gray-600">Update your account details</p>
                        </div>
                      </div>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-semibold"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            // Restore original values
                            const username = localStorage.getItem('username') || 'User';
                            const email = localStorage.getItem('email') || '';
                            setFormData(prev => ({ ...prev, username, email }));
                          }}
                          className="flex items-center space-x-2 px-5 py-2.5 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-colors text-sm font-semibold"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Username *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter your username"
                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all bg-white/50 font-medium ${
                              !isEditing 
                                ? 'opacity-60 cursor-not-allowed bg-gray-50 border-gray-300' 
                                : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-emerald-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter your email"
                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all bg-white/50 font-medium ${
                              !isEditing 
                                ? 'opacity-60 cursor-not-allowed bg-gray-50 border-gray-300' 
                                : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-emerald-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-8 flex justify-end space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          disabled={loading}
                          className="flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-5 h-5" />
                          <span>{loading ? "Saving..." : "Save Changes"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-5 border-b border-emerald-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Password & Security</h3>
                      <p className="text-sm text-gray-600">Keep your account secure</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Current Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                        <input
                          type={showOldPassword ? "text" : "password"}
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleChange}
                          placeholder="Enter current password"
                          className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-emerald-400 transition-all bg-white/50 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        New Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Enter new password"
                          className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-emerald-400 transition-all bg-white/50 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-xl border-2 border-emerald-200/50">
                    <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Password Requirements
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-6">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        Minimum 8 characters
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        At least one uppercase letter (A-Z)
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        At least one lowercase letter (a-z)
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        At least one number (0-9)
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                        At least one special character (!@#$%^&*)
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleChangePassword}
                      disabled={loading}
                      className="flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Lock className="w-5 h-5" />
                      <span>{loading ? "Changing..." : "Change Password"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-5 border-b border-emerald-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Notifications & Preferences</h3>
                      <p className="text-sm text-gray-600">Customize your experience</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-800">Travel Reminders</h4>
                      <p className="text-sm text-gray-600">Get notified about upcoming trips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-800">Marketing Updates</h4>
                      <p className="text-sm text-gray-600">Receive promotional offers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileSettings;