type Module = DefineComponent

interface Alert {
  message: string;
  timestamp?: number;
}

declare namespace WPS {
  interface LiteralInput {
    identifier: string;
    data: string;
  }

  interface ComplexInput {
    identifier: string;
    data: string;
  }
}
