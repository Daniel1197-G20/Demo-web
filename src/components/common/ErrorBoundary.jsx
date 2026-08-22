import React, { Component } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tory’s Treats Application Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-base flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-cream-border shadow-tory-lg flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-tory-600 flex items-center justify-center mb-4">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-charcoal-900 font-display mb-2">
              Oops! Something went sideways in the kitchen.
            </h1>

            <p className="text-sm text-charcoal-500 mb-6">
              We encountered an unexpected glitch while preparing your treats. Please try refreshing or return to our homepage.
            </p>

            <Button
              variant="primary"
              onClick={this.handleReset}
              icon={RotateCcw}
              className="w-full justify-center"
            >
              Return to Bakery
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
