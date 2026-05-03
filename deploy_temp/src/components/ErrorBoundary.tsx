import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center bg-red-500/10 border border-red-500/20 rounded-2xl">
          <h2 className="text-red-400 font-bold mb-2">Error de Renderizado Táctico</h2>
          <p className="text-gray-500 text-sm">El módulo 3D no pudo cargarse debido a una restricción de red externa.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
