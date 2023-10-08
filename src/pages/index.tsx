import { Box, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <main>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', gap: '3em', padding: '1em', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{fontSize: '1.5em'}}>
            Projemizin hem teknik hem de teknik olmayan bilinçlendirme çalışmaları içeren iki farklı tarafı var. Teknik tarafından başlayacak olursak, bu sorunu çözmek adına hem website hem de bu websitenin telefondan kullanımını rahatlaştıracak bir mobil app tasarladık. NASA’nın open source olarak sunduğu ve 6 dakikada bir yenilenen wildfire dataseti sayesinde şimdilik prototip olarak Türkiye’deki orman yangınlarını güncel olarak tweet atabilecek uygulamaya bağlı  bir bot tasarladık. Aynı zamanda kullanıcının konumuna erişimi sağlayarak konumuna yakın olan orman yangınlarını 1 km, 10 km, 100 km veya tüm Türkiyeyi gösterecek şekilde kendi seçerek görebilecek. Teknik olmayan tarafındaki bilinçlendirme çalışmaları ise bu tarz yangınların öncesinde nasıl önleneceğini, yaşandığı durumda da nasıl durdurulabileceğini anlatan bilgilendirici belgesel tarzı videoları websitemize bulundurup hazırladığımız broşürü Instagram hesabımız aracılığıyla paylaşıp kağıt halinin de yayılmasını sağladık.
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
