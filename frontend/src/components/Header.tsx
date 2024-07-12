import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { useLogoutUserMutation } from '../store/api/authApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton as _LoadingButton } from '@mui/lab';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #f9d13e;
  color: #236edb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }

    if (isError) {
      if(Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      }
    }
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h6'
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Denis_Dolzhikov_Dev
          </Typography>
          <Box display='flex' sx={{ ml: 'autho' }}>
            {!user && (
              <>
                <LoadingButton
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/register')}
                >
                  SignUp
                </LoadingButton>
                <LoadingButton onClick={() => navigate('/login')}>
                  Login
                </LoadingButton>
              </>
            )}
            {user && (
              <LoadingButton
                sx={{ backgroundColor: '#eee' }}
                onClick={onLogoutHandler}
                loading={isLoading}
              >
                Logout
              </LoadingButton>
            )}
            {user && user?.role === 'admin' && (
              <LoadingButton
                sx={{ backgroundColor: '#eee', ml: 2 }}
                onClick={() => navigate('/admin')}
              >
                Admin
              </LoadingButton>
            )}
            <Box sx={{ ml: 4 }}>
              <Tooltip
                title='Post settings'
                onClick={() => navigate('/profile')}
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />  
                  {/**
                   * 
                   * 
                   * Добавить хелпер получающий url аватара пользователя из бд
                   * 
                   * 
                   */}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;