import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const LoginPage = () => {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      // Handled in Context
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Column: Visual SaaS Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-blue-600 to-indigo-700 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">SustainaTask</span>
        </div>

        {/* visual mockups */}
        <div className="relative z-10 my-auto flex flex-col gap-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 text-left"
          >
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
              Manage your team's tasks with extreme ease.
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Track projects, monitor status changes, and organize workflows using a production-ready dashboard designed for performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Interactive Preview</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-350 border border-emerald-500/20">Active</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="flex-1">
                  <div className="h-3 bg-white/20 rounded-md w-3/4 mb-1" />
                  <div className="h-2.5 bg-white/10 rounded-md w-1/2" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <div className="h-3 bg-white/20 rounded-md w-2/3 mb-1" />
                  <div className="h-2.5 bg-white/10 rounded-md w-1/3" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-blue-200 font-medium">
              <span>Task Completion Stats</span>
              <span className="text-white font-bold">85% completed</span>
            </div>
          </motion.div>
        </div>

        {/* Security Badge */}
        <div className="text-xs text-blue-200/60 relative z-10 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Secured client validation enabled</span>
        </div>
      </div>

      {/* Right Column: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col gap-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Please enter your details below to log in.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="you@sustainabyte.ai"
                error={errors.email}
                disabled={isSubmitting}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                error={errors.password}
                disabled={isSubmitting}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={isSubmitting}
            >
              Sign In <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
