import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import { Box, AppBar, Toolbar, Typography, Button, createTheme } from '@mui/material'
import { useRouter } from 'next/router'
import '@/styles/globals.css'

const theme = createTheme({
  palette: {
      primary: {
          main: '#FF99003D',
      },
      secondary: {
          main: '#FF9900',
          contrastText: '#fff',
      },
      success: {
          main: '#000'
      }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter()
  return (
  <>
    <ThemeProvider theme={theme}>

    <Box sx={{display: "flex", flexFlow: 'column nowrap', gap: '2em', padding: '1em', height: '100vh'}}>
      <AppBar sx={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}} position="static">
        <Toolbar>
          <Typography variant="h4">Fire Spotter</Typography>
        </Toolbar>
        {
        router.pathname === '/' 
        ? 
          <Button 
            onClick={() => router.push('harita')} 
            color="secondary" 
            variant='contained' 
            sx={{fontWeight: 600, paddingX: '3em', fontSize: '1.25em'}}
          >
            Harita
          </Button> 
        : 
          <Button 
            onClick={() => router.push('/')} 
            color="secondary" 
            variant='contained' 
            sx={{fontWeight: 600, paddingX: '3em', fontSize: '1.25em'}}
          >
            Anasayfa
          </Button> 
        }
      </AppBar>
      <Box sx={{height: '100%'}}>
        <Component {...pageProps} />
      </Box>
    </Box>
    </ThemeProvider>
  </>)
}
