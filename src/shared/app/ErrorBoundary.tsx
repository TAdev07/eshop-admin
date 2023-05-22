import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h4>Bạn cần tải lại trang để cập nhật phiên bản mới nhất.</h4>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
