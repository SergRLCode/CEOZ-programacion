import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import jwt_decode from 'jwt-decode';
import { Grid, TextField, Input, InputLabel, IconButton, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import Snackbar from 'components/Snackbar/snackbar';
import { LOGIN } from 'graphql/mutations';

import ColorButton from './login.style';
import { UserData } from './login.interfaces';

import './login.sass';

const Login: React.FC = () => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [states, setStates] = useState<UserData>({
    profesionalID: '',
    password: '',
  });

  const [login, { data }] = useMutation(LOGIN);

  useEffect(() => {
    try {
      jwt_decode(data.login);
      sessionStorage.setItem('token', data.login);
      history.push('/calendarSurgeries');
      window.location.reload();
    } catch (error) {
      if (data) setOpen(true);
    }
  }, [data, history]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();
  const onKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter')
      login({
        variables: {
          ...states,
        },
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStates({
      ...states,
      [e.target.name]: e.target.value,
    });
  };
  const onClick: Function = (action: string) => {
    switch (action) {
      case 'login': {
        login({
          variables: {
            ...states,
          },
        });
        break;
      }
      case 'showPass': {
        setShowPass(!showPass);
        break;
      }
      default:
        break;
    }
  };

  const UsernameInput: JSX.Element = (
    <TextField
      id="user"
      value={states['profesionalID']}
      label="Usuario"
      name="profesionalID"
      onChange={onChange}
    />
  );

  const PasswordInput: JSX.Element = (
    <FormControl>
      <InputLabel htmlFor="password">Contraseña</InputLabel>
      <Input
        id="password"
        type={showPass ? 'text' : 'password'}
        name="password"
        value={states['password']}
        onChange={onChange}
        endAdornment={
          <IconButton onClick={() => onClick('showPass')}>
            {showPass ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
          </IconButton>
        }
      />
    </FormControl>
  );

  const LoginButton: React.FC = () => (
    <ColorButton color="primary" onClick={() => onClick('login')}>
      Iniciar sesión
    </ColorButton>
  );

  return (
    <div className="login">
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <form className="login__login-form" onSubmit={onSubmit} onKeyPress={onKeyPress}>
            <p>Iniciar sesión</p>
            {UsernameInput}
            {PasswordInput}
            <LoginButton />
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} setOpen={setOpen} severity="error" content={data && data['login']} />
    </div>
  );
};

export default Login;
