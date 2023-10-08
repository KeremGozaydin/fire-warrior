const csv = require('csvtojson');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const {TwitterApi} = require('twitter-api-v2');
require('dotenv').config();


let client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  clientKey: process.env.TWITTER_CLIENT_KEY,
  clientSecret: process.env.TWITTER_CLIENT_SECRET
})

const getAvailableHours = (hour) => {
  let hours = []
  for (let i = 0; i < 24; i++) {
    if (i >= hour - 4 || i>= hour + 20) hours.push(i)
  }
  return hours
}

const getFires = async () => {
  let data = await fetch('https://firms.modaps.eosdis.nasa.gov/api/country/csv/3407bc83a7304ea462191a718f8cf6fa/VIIRS_SNPP_NRT/TUR/2/')
  .then((resp) => resp.text())
  .then(async (res) => await csv().fromString(res))
  let currentHour = new Date().getUTCHours();
  let baba = data.filter(({acq_time}) => {
    let f_minutes = acq_time.slice(acq_time.length-2);
    let f_hour = acq_time.length == 2 ? 0 : parseInt(acq_time.slice(0,acq_time.length-f_minutes.length))
    let availableHours = getAvailableHours(currentHour)
    if (availableHours.includes(f_hour)) return true
    return false
  })
  return baba
}

let generateTweet = (fires) => {
  if (fires.length == 0) return
  let top3 = fires.sort((a,b) => parseFloat(b.scan)*parseFloat(b.track) - parseFloat(a.scan)*parseFloat(a.track)).slice(0,3)
  top3.map(fire => {
    fire.scan = (parseFloat(fire.scan)*0.375).toFixed(2)
    fire.track = (parseFloat(fire.track)*0.375).toFixed(2)
    fire.latitude = parseFloat(fire.latitude).toFixed(2)
    fire.longitude = parseFloat(fire.longitude).toFixed(2)
  })
  let tweet = 
  `Son 4 saat içinde ${fires.length} yangın tespit edildi!
Son 4 saatteki en büyük 3 yangın:
1. ${top3[0].latitude}N ${top3[0].longitude}E ${top3[0].scan}km x ${top3[0].track}km
https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@${top3[0].longitude},${top3[0].latitude},12.2z
2. ${top3[1].latitude}N ${top3[1].longitude}E ${top3[1].scan}km x ${top3[1].track}km
https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@${top3[1].longitude},${top3[1].latitude},12.2z
3. ${top3[2].latitude}N ${top3[2].longitude}E ${top3[2].scan}km x ${top3[2].track}km
https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@${top3[2].longitude},${top3[2].latitude},12.2z
`
  return tweet
}

exports.tweet = onSchedule('0 */4 * *', async () => {
  let fires = await getFires()
  if (fires.length == 0) return
  let tweet = generateTweet(fires)
  if (!tweet) return
  try {
    await client.v2.tweet(tweet)
    console.log('Tweeted!')
  } catch (error) {
    console.log(error)
  }
})

let fun = async () => {
  let fires = await getFires()
  if (fires.length == 0) return
  let tweet = generateTweet(fires)
  if (!tweet) return
  try {
    await client.v2.tweet(tweet)
    console.log('Tweeted!')
  } catch (error) {
    console.log(error)
  }
}