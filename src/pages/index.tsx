import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <main>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', gap: '3em', padding: '1em', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{fontSize: '1.5em'}}>
          Konumunuza yakın orman yangınlarını görüntüleyebilmek için <span style={{fontStyle: 'italic'}}><a href='#link'>Haritaya</a></span> tıklayın.
          </Typography>
          <Typography sx={{fontSize: '1.5em'}}>
          Orman yangınları hakkındaki bilgilendirici videomuzu izlemek için aşağı kaydırın.
          </Typography>
          <Typography sx={{fontSize: '1.5em'}}>
          "Geleceği Korumak İçin Alevlerle Savaş: Doğa ve Toplum İçin Hep Birlikte El Ele"
          </Typography>
          <Card sx={{width: '800px', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center',}}>
            <CardContent>
              <Typography paddingBottom={'0.5em'} textAlign={"center"} variant="h4">Bilgilendirme Videomuz!</Typography>
              <video controls height={400}>
                <source src='/bilgilendirme.mp4' type='video/mp4' />
              </video>
            </CardContent>
          </Card>
        </Box>
      </main>
    </>
  )
}
