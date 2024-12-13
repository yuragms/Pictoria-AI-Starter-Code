'use client';
import React, { useState } from 'react';

const AuthForm = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === 'reset'
            ? 'Reset Password'
            : mode === 'login'
            ? 'Login'
            : 'Sign Up'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === 'reset'
            ? 'Enter your email below to reset your password'
            : mode === 'login'
            ? 'Enter your email below to login to your account'
            : 'Enter your information below to create an account'}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
