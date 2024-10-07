import { PropsWithChildren } from "react";
import Header from "../_components/Header";
import AuthProvider from "../_providers/AuthProvider";
import ModalProvider from "../_providers/ModalProvider";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Header />
        {children}
      </ModalProvider>
    </AuthProvider>
  );
}

export default RootLayout;
