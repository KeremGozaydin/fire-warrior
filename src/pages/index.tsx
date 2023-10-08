import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', gap: '3em', padding: '1em', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{fontSize: '1.5em'}}>
          Konumunuza yakın orman yangınlarını görüntüleyebilmek için <span style={{fontStyle: 'italic'}}>Haritaya</span> tıklayın.
          </Typography>
          <Typography sx={{fontSize: '1.5em'}}>
          Orman yangınları hakkındaki bilgilendirici videomuzu izlemek için aşağı kaydırın.
          </Typography>
          <Typography sx={{fontSize: '1.5em', fontWeight: '600'}}>
          Geleceği Korumak İçin Alevlerle Savaş: Doğa ve Toplum İçin Hep Birlikte El Ele!
          </Typography>
          <Card sx={{width: '800px', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center',}}>
            <CardContent>
              <Typography paddingBottom={'0.5em'} textAlign={"center"} variant="h4">Bilgilendirme Videomuz!</Typography>
              <video controls height={400}>
                <source src='/bilgilendirme.mp4' type='video/mp4' />
              </video>
            </CardContent>
          </Card>
          <Typography sx={{fontSize: '1.5em', textAlign: 'center'}}>
          <span style={{fontSize: '2em', fontWeight: 'lighter'}}>Hakkımızda</span>
          <br/>
          <br/>
          Fire Spotter, teknolojinin ve kamuya açık verilerin yenilikçi kullanımı yoluyla yerel toplulukların yangınları raporlaması ve izlemesini sağlayan, mevcut veri dağıtımının iyileştirilmesine olanak tanıyıp aynı zamanda toplumu da bilinçlendirerek yangın hasarlarının minimuma indirilmesini ve doğal kaynakların korunmasına yönelik çözümler geliştirmeyi amaçlayan bir araçtır.
          </Typography>
        </Box>

        <Card>
          <Typography variant="h2" sx={{textAlign: 'center', paddingY: '0.5em'}}>Bilinçlendirme Broşürümüz!</Typography>
          <Box sx={{width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', paddingBottom: '1em'}}>
            <img style={{maxHeight: '500px'}} alt='brosur1' src="/bros1.jpeg" />
            <img style={{maxHeight: '500px'}} alt='brosur2' src="/bros2.jpeg" />
          </Box>
        </Card>
      </main>
    </>
  )
}
