import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useLoginModal } from '../context/LoginModalContext';

interface NavbarWrapperProps {
  onSearch: (query: string) => void;
  onHomeClick?: () => void;
  onAdminClick?: () => void;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = (props) => {
  const { openLogin } = useLoginModal();

  useEffect(() => {
    // ดักจับการคลิกปุ่ม "เข้าสู่ระบบ" ใน Navbar
    const handleLoginButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // ตรวจสอบว่าคลิกปุ่มเข้าสู่ระบบหรือไม่
      if (
        target.textContent?.includes('เข้าสู่ระบบ') &&
        target.tagName === 'BUTTON'
      ) {
        e.preventDefault();
        e.stopPropagation();
        openLogin();
      }
    };

    // เพิ่ม event listener
    document.addEventListener('click', handleLoginButtonClick, true);

    return () => {
      document.removeEventListener('click', handleLoginButtonClick, true);
    };
  }, [openLogin]);

  return <Navbar {...props} />;
};

export default NavbarWrapper;