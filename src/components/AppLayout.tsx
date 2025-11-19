import React, { ReactNode } from 'react';
import { LoginModalProvider, useLoginModal } from '../context/LoginModalContext';
import { AuthProvider } from '../context/AuthContext';
import NavbarWrapper from './NavbarWrapper';
import Login from './Login';

interface LayoutContentProps {
  children: ReactNode;
  onSearch: (query: string) => void;
  onHomeClick?: () => void;
  onAdminClick?: () => void;
}

// Component ภายในที่ใช้ LoginModal
const LayoutContent: React.FC<LayoutContentProps> = ({ 
  children, 
  onSearch, 
  onHomeClick, 
  onAdminClick 
}) => {
  const { isLoginOpen, closeLogin } = useLoginModal();

  return (
    <>
      <NavbarWrapper 
        onSearch={onSearch}
        onHomeClick={onHomeClick}
        onAdminClick={onAdminClick}
      />
      
      {/* เนื้อหาหลัก */}
      <main className="pt-16">
        {children}
      </main>

      {/* Login Modal - แสดงเฉพาะเมื่อ isLoginOpen = true */}
      {isLoginOpen && <Login onClose={closeLogin} />}
    </>
  );
};

// Layout หลักที่มี Provider ครบ
interface AppLayoutProps {
  children: ReactNode;
  onSearch: (query: string) => void;
  onHomeClick?: () => void;
  onAdminClick?: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return (
    <AuthProvider>
      <LoginModalProvider>
        <LayoutContent {...props} />
      </LoginModalProvider>
    </AuthProvider>
  );
};

export default AppLayout;