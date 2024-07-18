import { useRouter } from 'next/navigation';
import { useEffect, useState  } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true);
        } else {
          router.replace('/login');
        }
      }, [router]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
