import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', gap: '3em', padding: '1em', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{fontSize: '1.5em'}}>
          Click the <span style={{fontStyle: 'italic'}}>map</span> button to see possible wildfires near you.
          </Typography>
          <Typography sx={{fontSize: '1.5em'}}>
          Scroll down to watch our informative video about wildfires.
          </Typography>
          <Typography sx={{fontSize: '1.5em', fontWeight: '600'}}>
          Fighting fire for the future: All together for people and nature!
          </Typography>
          <Card sx={{width: '800px', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center',}}>
            <CardContent>
              <Typography paddingBottom={'0.5em'} textAlign={"center"} variant="h4">Info Video!</Typography>
              <video controls height={400}>
                <source src='/bilgilendirme.mp4' type='video/mp4' />
              </video>
            </CardContent>
          </Card>
          <Typography sx={{fontSize: '1.5em', textAlign: 'center'}}>
          <span style={{fontSize: '2em', fontWeight: 'lighter'}}>About us</span>
          <br/>
          <br/>
          Fire Spotter is a tool that enables local communities to report and monitor fires through innovative use of technology and public data. It allows improvement of existing data distribution, raising awareness within the community, minimizing fire damage, and developing solutions for the conservation of natural resources.
          </Typography>
        </Box>

        <Card>
          <Typography variant="h2" sx={{textAlign: 'center', paddingY: '0.5em'}}>Our awareness brochure!</Typography>
          <Box sx={{width: '100%', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', alignItems: 'center', paddingBottom: '1em'}}>
            <img style={{maxHeight: '500px'}} alt='brosur1' src="/bros1.jpeg" />
            <img style={{maxHeight: '500px'}} alt='brosur2' src="/bros2.jpeg" />
          </Box>
        </Card>
      </main>
    </>
  )
}
