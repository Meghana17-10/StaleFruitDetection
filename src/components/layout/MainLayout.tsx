import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer';

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

  return (
    <div className="min-h-screen gradient-bg">
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block rounded-md bg-purple-500 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 6.5c1.4-1 2.5-.4 3.4.6.9 1 1.5 2.5.5 3.9-.9 1.4-5.2 6.2-9.7 9.8-4.8 4-8.3 1.8-10.6-.4C-.6 18.2.1 15.3 2 13l3.5-4.4c1.9-2.1 5.7-5 9.8-2.6 1 .6 1.1 1.2 1.5 1.8" />
                <path d="M15 6.5 16 7" />
              </svg>
            </span>
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
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 transition-colors mt-4"
                      onClick={() => {
                        logout();
                        navigate('/signin');
                        setIsDrawerOpen(false);
                      }}
                    >
                      Logout
                    </button>
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

              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <>
                    {user?.name && (
                      <span className="text-sm text-gray-700 mr-2">
                        Hi, {user.name.split(' ')[0]}
                      </span>
                    )}
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 transition-colors"
                      onClick={() => {
                        logout();
                        navigate('/signin');
                      }}
                    >
                      Logout
                    </button>
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
          <p className="text-sm mt-2">Powered by Vision Transformer (ViT) Technology</p>
        </div>
      </footer>
    </div>
  );
}
