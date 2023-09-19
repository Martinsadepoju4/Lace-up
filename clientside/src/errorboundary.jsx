import React from "react";
import errImage from "./images/errorboundary.jpg";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="loading">
          <img className="loadingImage" src={errImage} alt="error" />
          <h1>Oop! Something went wrong</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
