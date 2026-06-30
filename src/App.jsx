import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <TaskProvider>
            {/* React Hot Toast Configuration */}
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'dark:bg-slate-900 dark:text-white dark:border-slate-800 border border-slate-100 text-slate-800 text-sm font-medium rounded-xl shadow-lg px-4 py-2.5',
                duration: 3500,
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff'
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff'
                  }
                }
              }}
            />
            {/* Application Views */}
            <AppRoutes />
          </TaskProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
