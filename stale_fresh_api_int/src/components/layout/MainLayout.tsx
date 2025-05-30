import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo.png'; 
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger 
} from '@/components/ui/drawer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    ...(user
      ? [
          { name: 'Upload', path: '/upload' },
          { name: 'My History', path: '/history' },
          { name: 'Model Info', path: '/model-info' },
        ]
      : [
          { name: 'Model Info', path: '/model-info' },
        ]),
  ];

  // Get first name or username
  const firstName = user?.username?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const initials = firstName[0] + (user?.username?.split(' ')[1]?.[0] || '');

  return (
    <div className="min-h-screen gradient-bg">
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            {/* <span className="inline-block rounded-md bg-purple-500 p-2">
            <img src={Logo} alt="Stale Fruit Detector Logo" className="h-10 w-auto" />
            </span> */}
            <img src={Logo} alt="Stale Fruit Detector Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold gradient-text">Stale Fruit Detector</span>
          </Link>
          
          {isMobile ? (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <nav className="p-4 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "text-gray-600 hover:text-purple-600 transition-colors py-2 text-lg",
                        location.pathname === item.path && "text-purple-600 font-medium"
                      )}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-3 px-2 py-1">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Hi, {firstName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <button 
                        className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 transition-colors"
                        onClick={() => {
                          logout();
                          navigate('/signin');
                          setIsDrawerOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 mt-4">
                      <Link 
                        to="/signin" 
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        className="border border-purple-500 text-purple-600 px-4 py-2 rounded-lg transition-colors hover:bg-purple-50 text-center"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </nav>
              </DrawerContent>
            </Drawer>
          ) : (
            <>
              <nav className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "text-gray-600 hover:text-purple-600 transition-colors py-2",
                      location.pathname === item.path && "text-purple-600 font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Hi, {firstName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-gray-700 hover:bg-gray-200"
                      onClick={() => {
                        logout();
                        navigate('/signin');
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Sign In
                    </Link>
                    <Link to="/signup" className="border border-purple-500 text-purple-600 px-4 py-2 rounded-lg transition-colors hover:bg-purple-50">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Stale Fruit Detector • Ensuring freshness, one fruit at a time</p>
          <p className="text-sm mt-2">Powered by Swin Transformer Technology</p>
        </div>
      </footer>
    </div>
  );
}